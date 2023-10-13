/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";

export const CartProduct = ({ producto, setCarritoDeCompras }) => {
  const [contador, setContador] = useState(producto.quantity);

  const aumentar = () => {
    setCarritoDeCompras((productos) => {
      const productoArray = productos.map((product) => {
        if (producto.id === product.id) {
          return {
            ...product,
            quantity: contador + 1,
          };
        } else {
          return product;
        }
      });
      return productoArray;
    });
    setContador(contador + 1);
  };

  const disminuir = () => {
    setCarritoDeCompras((productos) => {
      const productoArray = productos.map((product) => {
        if (producto.id === product.id) {
          return {
            ...product,
            quantity: contador - 1,
          };
        } else {
          return product;
        }
      });
      return productoArray;
    });
    setContador(contador - 1);
  };

  return (
    <>
      <li>
        <h3>{producto.price}</h3>
        <p>{producto.title}</p>
        <button onClick={disminuir}>-1</button>
        <p>{contador}</p>
        <button onClick={aumentar}>+1</button>
        <p>Precio Total Producto{producto.price * producto.quantity}</p>
      </li>
    </>
  );
};
