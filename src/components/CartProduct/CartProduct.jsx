/* eslint-disable react/prop-types */

import { useState } from "react";

export const CartProduct = ({ producto, setCarritoDeCompras }) => {
  const [contador, setContador] = useState(producto ? producto.quantity : 0);

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
      <tr>
        <td>{producto.title}</td>
        <td>
          <button onClick={disminuir}>-1</button>
          <span>{contador}</span>
          <button onClick={aumentar}>+1</button>
        </td>
        <td>{producto.price}</td>
        <td>{producto.price * producto.quantity}</td>
      </tr>
    </>
  );
};
