import React from "react";
import { intl } from "./utils/formatCurrency";

function Cart({ cart, checkout }) {
  const total = cart.reduce((acc, item) => {
    return acc + item.pizza.sizes[item.pizzaSize];
  }, 0);
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="type">{item.pizza.name} - </span>
            <span className="size">{item.pizzaSize} - </span>
            <span className="size">{item.price} </span>
          </li>
        ))}
      </ul>
      <p> Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;
