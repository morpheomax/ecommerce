/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import axiosInstance from "../../../config/axios";
import { UserContext } from "../../../context/user/userContext";
import { Table } from "react-bootstrap";

const initialForm = {
  idUser: "",
  sku: "",
  name: "",
  description: "",
  category: "",
  subcategory: "",
  stock: "",
  variants: "",
  img: "",
};

export const Products = () => {
  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [, dispatch] = useContext(UserContext); // Obtener el contexto del usuario para manejar el estado global de autenticación

  // Declarar un estado adicional para el elemento seleccionado
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [refresh, setRefresh] = useState(null);

  // Cargar la lista de categorías al cargar la página
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

      // Agregar la nueva categoría a la lista

      setFormData(initialForm);
      setIsLoading(false);
      setRefresh(data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar categoría:", error);
    }
  };

  // Función para actualizar una categoría
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

      // Actualizar la lista de categorías con la categoría actualizada
      setProduct((prevProduct) =>
        prevProduct.map((product) =>
          product._id === data._id ? data : product
        )
      );

      console.log(data);
      console.log(data._id);
      // Limpiar el formulario
      setFormData(initialForm);
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
    // Llenar el formulario con los datos del elemento seleccionado
    setFormData({
      idUser: product.idUser,
      sku: product.sku,
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      stock: product.stock,
      variants: product.variants,
      img: product.img,
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
              <th>SKU</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Categoria</th>
              <th>Sub Categoría</th>
              <th>Stock</th>
              <th>Variantes</th>
              <th>img</th>
            </tr>
          </thead>
          <tbody>
            {product?.map((product) => (
              <tr key={product._id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.subcategory}</td>
                <td>{product.stock}</td>
                <td>{product.variants}</td>
                <td>{product.img}</td>
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
        <h2>Actualizar datos de la tienda</h2>
        <Form>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Logo</Form.Label>
            <Form.Control
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="addresses"
              value={formData.addresses}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              name="phones"
              value={formData.phones}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>RRSS</Form.Label>
            <Form.Control
              type="text"
              name="rrss"
              value={formData.rrss}
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
