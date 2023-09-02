// import { useParams } from "react-router-dom";

// export const CategoriesPage = () => {
//   const { category } = useParams();
//   return (
//     <>
//       <h1>Categorias</h1>

//       {category}
//     </>
//   );
// };

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import axiosInstance from "../config/axios";
import { UserContext } from "../context/user/userContext";
import { useParams } from "react-router-dom";
const initialForm = {
  img: "",
  sku: "",
  name: "",
  description: "",
  category: "",
  subcategory: "",
  stock: "",
  price: "",
  variants: "",
};

export const CategoriesPage = () => {
  const { category } = useParams();

  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        if (response.data && Array.isArray(response.data.detail)) {
          setProduct(response.data.detail);
        } else {
          console.error("Respuesta inesperada de la API:", response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Productos:", error);
        setIsLoading(false);
      });
  }, []);

  // Filtrar los productos por la categoría "Inciensos"
  const inciensosProducts = product.filter(
    (item) => item.category === category
  );

  return (
    <>
      {category}
      <div className="mt-4">
        <h2>{category}</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>img</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inciensosProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.img}</td>

                <td>{product.name}</td>
                <td>{product.description}</td>

                <td>{product.price}</td>
                <td>
                  <button>Agregar al carro</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
