/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CartProduct } from "../components/CartProduct/CartProduct";
import axios from "axios";

const initialCart = [
  { title: "Producto1", price: 100, quantity: 1, id: 1 },
  { title: "Producto2", price: 200, quantity: 2, id: 2 },
  { title: "Producto3", price: 150, quantity: 1, id: 3 },
];

export const CartPage = () => {
  //   const [initialCarrito] = useContext(carritoContext);

  const [carritoDeCompras, setCarritoDeCompras] = useState(initialCart);

  const [precioTotal, setPrecioTotal] = useState(0);

  const comprar = async () => {
    const paymentUrl = "http://localhost:8080/payment/create-payment";
    const { data } = await axios.post(paymentUrl);
    // console.log(data);
    // console.log(data.detail.response);
    // console.log(data.detail.response.init_point);
    window.location.href = data.detail.response.init_point;
  };

  const submit = useEffect(() => {
    setPrecioTotal(0);

    carritoDeCompras.forEach((producto) => {
      const precioASumar = producto.price * producto.quantity;

      setPrecioTotal((precio) => precio + precioASumar);
    });
  }, [carritoDeCompras]);

  return (
    <>
      <h1>Mi carrito de compras</h1>

      <ul>
        {carritoDeCompras.map((producto) => (
          <CartProduct
            key={producto.id}
            producto={producto}
            setCarritoDeCompras={setCarritoDeCompras}
          />
        ))}
      </ul>

      <h2>Precio Total: {precioTotal}</h2>
      <button onClick={comprar}>Comprar</button>
    </>
  );
};
