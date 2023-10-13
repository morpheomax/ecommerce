/* eslint-disable no-unused-vars */

// import { useEffect, useState, useContext } from "react";
// import { CartContext } from "../context/cart/cartContext";
// import { CartProduct } from "../components/CartProduct/CartProduct";
// import axios from "axios";

// const initialCart = [
//   { title: "Producto1", price: 100, quantity: 1, id: 1 },
//   { title: "Producto2", price: 200, quantity: 2, id: 2 },
//   { title: "Producto3", price: 150, quantity: 1, id: 3 },
// ];

// export const CartPage = () => {
//   const { state, dispatch } = useContext(CartContext);
//   //Los datos debo enviarlos con un dispatch y aca los recupero con:
//   //   const [initialCart,] = useContext(carritoContext);

//   const [carritoDeCompras, setCarritoDeCompras] = useState(initialCart);

//   const [precioTotal, setPrecioTotal] = useState(0);

//   const comprar = async () => {
//     // const paymentUrl = "https://backendproyecto5.onrender.com/payment/create-payment";
//     const paymentUrl = "http://localhost:8080/payment/create-payment";
//     const { data } = await axios.post(paymentUrl);
//     // console.log(data);
//     // console.log(data.detail.response);
//     // console.log(data.detail.response.init_point);
//     window.location.href = data.detail.response.init_point;
//   };

//   const submit = useEffect(() => {
//     setPrecioTotal(0);

//     carritoDeCompras.forEach((producto) => {
//       const precioASumar = producto.price * producto.quantity;

//       setPrecioTotal((precio) => precio + precioASumar);
//     });
//   }, [carritoDeCompras]);

//   return (
//     <>
//       <h1>Mi carrito de compras</h1>

//       <ul>
//         {/* {carritoDeCompras.map((producto) => (
//           <CartProduct
//             key={producto.id}
//             producto={producto}
//             setCarritoDeCompras={setCarritoDeCompras}
//           />
//         ))} */}

//         {state.cart.map((producto) => (
//           <CartProduct
//             key={producto.id}
//             producto={producto}
//             setCarritoDeCompras={setCarritoDeCompras}
//           />
//         ))}
//       </ul>

//       <h2>Precio Total: {precioTotal}</h2>
//       <button onClick={comprar}>Continuar compra</button>
//     </>
//   );
// };

import React, { useContext } from "react";
import { CartContext } from "../context/cart/cartContext";
import { CartProduct } from "../components/CartProduct/CartProduct";
import axios from "axios";

export const CartPage = () => {
  const { state } = useContext(CartContext);

  // Función para realizar el proceso de pago
  const comprar = async () => {
    // URL para crear el pago
    const paymentUrl =
      "https://backendproyecto5.onrender.com/payment/create-payment";
    // const paymentUrl = "http://localhost:8080/payment/create-payment";

    try {
      // Realiza una solicitud POST para crear el pago
      const response = await axios.post(paymentUrl);

      // Redirige al usuario a la página de pago
      window.location.href = response.data.detail.response.init_point;
    } catch (error) {
      console.error("Error al crear el pago:", error);
    }
  };

  // Función para actualizar el carrito de compras
  const actualizarCarrito = (productos) => {
    // Implementa la lógica para actualizar el carrito aquí
    // Puedes usar esta función para comunicarte con tu contexto o componente padre
    // por ejemplo, podrías hacer dispatch de una acción en el contexto
    // o comunicarte con tu backend para actualizar el carrito en la base de datos.
    console.log("Carrito actualizado:", productos);
  };

  // Calcula el precio total sumando el precio de cada producto en el carrito
  const totalPrice = state.cart
    .filter((product) => product !== null)
    .reduce((total, product) => {
      if (
        product &&
        typeof product.price === "number" &&
        typeof product.quantity === "number"
      ) {
        return total + product.price * product.quantity;
      }
      return total;
    }, 0);

  return (
    <div className="container">
      <h1>Carrito de Compras</h1>
      {state.cart.length === 0 ? (
        <p>Carrito de compras Vacío</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {state.cart
                .filter((product) => product !== null)
                .map((product, index) => (
                  <CartProduct
                    key={index}
                    producto={product}
                    setCarritoDeCompras={actualizarCarrito}
                  />
                ))}
            </tbody>
          </table>
          <div className="text-end">
            <p>Total: {totalPrice}</p>
            <button className="btn btn-primary" onClick={comprar}>
              Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
