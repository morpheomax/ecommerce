/* eslint-disable react/prop-types */ //Bloquea a esLint para que no detecte error en children

// HOC = Higher order component
import { CartContext } from "./cartContext";
import { useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartProvider = ({ children }) => {
  // Estado inicial del carrito
  const initialState = {
    cart: [], // Asegúrate de que el estado inicial contenga la propiedad "cart"
  };

  // Inicializar el reductor con el estado inicial
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
