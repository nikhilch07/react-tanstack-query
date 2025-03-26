import { use } from "react";
import { Link } from "@tanstack/react-router";
import { CartContext } from "./context/cartContext";

export default function Header() {
  const [cart] = use(CartContext);
  return (
    <nav data-testid="cart-number" >
      <Link to="/">
        <h1 className="logo">Padre Gino's Pizza</h1>
        </Link>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
