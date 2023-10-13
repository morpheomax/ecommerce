import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart/cartContext";

export const CartIcon = () => {
  const { cart } = useContext(CartContext);

  if (!cart) {
    return null; // Si cart es undefined, no renderizamos nada
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (cartItemCount === 0) {
    return null; // Si no hay elementos en el carrito, no renderizamos nada
  }

  return (
    <Link to="/cart">
      <i className="bi bi-cart3"></i>{" "}
      {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
    </Link>
  );
};
