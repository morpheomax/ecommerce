import { useState, useEffect, useContext } from "react";
import { Breadcrumb } from "react-bootstrap"; // Importa Breadcrumb
import axiosInstance from "../config/axios";
import { UserContext } from "../context/user/userContext";
import { useParams } from "react-router-dom";

export const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((response) => {
        if (response.data && response.data.product) {
          setProduct(response.data.product);
          setTotal(response.data.product.price * quantity);
        } else {
          console.error("Producto no encontrado");
        }
      })
      .catch((error) => {
        console.error("Error al obtener detalles del producto:", error);
      });
  }, [id, quantity]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          product,
          quantity,
        },
      });
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity > product.stock ? product.stock : newQuantity);
      setTotal(product.price * newQuantity);
    }
  };

  return (
    <div className="container mt-5">
      {product ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img
              src={product.img[0]}
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
              <Breadcrumb.Item href={`/categorias/${product.category}`}>
                {product.category}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
            </Breadcrumb>

            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p className="fs-5">
              Precio:{" "}
              {product.price.toLocaleString("es-ES", {
                style: "currency",
                currency: "CLP",
              })}
            </p>
            <p style={{ fontSize: "14px" }}>
              Stock Disponible: {product.stock}
            </p>
            <div className="form-group">
              <label htmlFor="quantity">Cantidad:</label>

              <div className="input-group p-3">
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setQuantity((prevQuantity) =>
                        prevQuantity > 1 ? prevQuantity - 1 : 1
                      )
                    }
                  >
                    -
                  </button>
                </span>
                <input
                  type="number"
                  id="quantity"
                  className="form-control w-25"
                  value={quantity}
                  min="1"
                  max={product.stock}
                  onChange={handleQuantityChange}
                />
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setQuantity((prevQuantity) =>
                        prevQuantity < product.stock
                          ? prevQuantity + 1
                          : prevQuantity
                      )
                    }
                  >
                    +
                  </button>
                </span>
              </div>
            </div>
            <p className="mt-2">Total: {total}</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};
