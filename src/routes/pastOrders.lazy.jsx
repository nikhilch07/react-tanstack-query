import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import { intl } from "../utils/formatCurrency";
import ErrorBoundary from "../ErrorBoundary";

const ErrorBoundaryForpastOrder = (props) => {
    return (
      <ErrorBoundary>
        <PastOrdersRoute { ...props} />
      </ErrorBoundary>
    )
  };

export const Route = createLazyFileRoute("/pastOrders")({
  component: ErrorBoundaryForpastOrder,
});

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState(null);

  useEffect(() => {
    console.log("focusedOrder", focusedOrder);
    console.log("page", page);
  }, [focusedOrder, page]);

  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 24 * 60 * 60 * 1000,
  });

  const { isLoading: isLoadingPastOrder, data: pastOrder } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    // enabled: !!focusedOrder,
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2> Loading...</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <th> ID</th>
            <th> Date</th>
            <th> Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={page.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrder.orderItems.map((item) => (
                  <tr key={`${item.pizzaTypeId}_${item.size}`}>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>{intl.format(item.price)}</td>
                    <td>{intl.format(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={() => setFocusedOrder()}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
