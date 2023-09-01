/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import axiosInstance from "../../../config/axios";
import { UserContext } from "../../../context/user/userContext";
import { Table } from "react-bootstrap";

const initialForm = {
  idUser: "",
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

export const Products = () => {
  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [, dispatch] = useContext(UserContext); // Obtener el contexto del usuario para manejar el estado global de autenticación

  // Declarar un estado adicional para el elemento seleccionado
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Declarar un estado adicional para el elemento seleccionado
  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [refresh, setRefresh] = useState(null);

  // Leer la lista de Categorias al cargar la página
  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((response) => {
        if (response.data && Array.isArray(response.data.detail)) {
          setCategory(response.data.detail);
        } else {
          console.error("Respuesta inesperada de la API:", response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Categorías:", error);
        setIsLoading(false);
      });
  }, []);

  // Leer la lista de products al cargar la página
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
  }, [refresh]);

  // Función para crear una nueva categoría
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Actualiza formData.category con el valor seleccionado
    formData.category = selectedCategory;

    try {
      // Realizar la solicitud POST para crear una categoría
      const { data } = await axiosInstance.post(
        "/products",
        formData,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }
      );

      // Agregar el nuevo producto a la lista

      setFormData(initialForm);
      setIsLoading(false);
      setRefresh(data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar el producto:", error);
    }
  };

  // Función para actualizar un product
  const handleUpdateProduct = async (productId) => {
    try {
      console.log(productId);
      // Realizar la solicitud PUT para actualizar una categoría
      const { data } = await axiosInstance.put(
        `/products/${productId}`,
        formData, // Enviar formData en el cuerpo de la solicitud
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }
      );

      //   // Actualizar la lista de productos
      //   setProduct((prevProduct) =>
      //     prevProduct.map((product) =>
      //       product._id === data._id ? data : product
      //     )
      //   );

      console.log(data);
      console.log(data._id);
      // Limpiar el formulario
      setFormData(initialForm);
      //   Restablece selectedCategory
      setSelectedCategory("");
      // Restablecer el valor de isLoading (si es necesario)
      setIsLoading(false);
      // Puedes omitir esta línea si no necesitas refrescar la página
      setRefresh(data);
    } catch (error) {
      // Manejar errores aquí
      setIsLoading(false);
      console.error("Error al actualizar la categoría:", error);
    }
  };

  // Función para manejar el botón "Editar"
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    // Establece selectedCategory con la categoría del producto seleccionado
    setSelectedCategory(product.category);

    // Llenar el formulario con los datos del elemento seleccionado
    setFormData({
      idUser: product.idUser,
      img: product.img,
      sku: product.sku,
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      stock: product.stock,
      price: product.price,
      variants: product.variants,
    });
  };

  // Funcion para eliminar registro
  const handleDeleteCategory = async (productId) => {
    try {
      // Realizar la solicitud DELETE para eliminar una categoría
      await axiosInstance.delete(`/products/${productId}`, {
        headers: { authorization: `Token ${token}` },
      });

      // Eliminar la categoría de la lista
      setProduct((prevProduct) =>
        prevProduct.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // Manejar cambios en el formulario

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="mt-4">
        <h2>Información de la Tienda</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>img</th>
              <th>SKU</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Categoria</th>
              <th>Sub Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {product?.map((product) => (
              <tr key={product._id}>
                <td>{product.img}</td>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.subcategory}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>

                <td>
                  <button onClick={() => handleEditClick(product)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCategory(product._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <hr />
        <h2>Actualizar Productos</h2>
        <Form>
          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* // Lista para mostrar lo que obtiene del GET de categorias */}
          <Form.Group>
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {category?.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Sub Categoría</Form.Label>
            <Form.Control
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="Number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="Number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Button onClick={handleCreateProduct}>Crear</Button>
          <Button onClick={() => handleUpdateProduct(selectedProduct._id)}>
            Actualizar
          </Button>
        </Form>

        <hr />
      </div>
    </>
  );
};
