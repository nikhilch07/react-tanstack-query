import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <div className="index-brand">
        <h1>Padre Gino's Pizza</h1>
        <p>
          Pizza is a dish of Italian origin consisting of a usually round
        </p>
      </div>
      <ul>
        <li>
          <Link to="/order">Order</Link>
        </li>
        <li>
          <Link to="/pastOrders">Past Orders</Link>
        </li>
        <li>
          <Link to="/contacts">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}
