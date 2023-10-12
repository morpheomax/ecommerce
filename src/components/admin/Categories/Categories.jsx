/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import axiosInstance from "../../../config/axios";
import { UserContext } from "../../../context/user/userContext";
import { Table } from "react-bootstrap";

const initialForm = {
  name: "",
  description: "",
  subcategory: "",
};

export const Categories = () => {
  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [, dispatch] = useContext(UserContext); // Obtener el contexto del usuario para manejar el estado global de autenticación

  // Declarar un estado adicional para el elemento seleccionado
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [refresh, setRefresh] = useState(null);

  // Cargar la lista de categorías al cargar la página
  useEffect(() => {
    axiosInstance
      .get("/categories/")
      .then((response) => {
        if (response.data && Array.isArray(response.data.detail)) {
          setCategories(response.data.detail);
        } else {
          console.error("Respuesta inesperada de la API:", response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Categorías:", error);
        setIsLoading(false);
      });
  }, [refresh]);

  // Función para crear una nueva categoría
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Realizar la solicitud POST para crear una categoría
      const { data } = await axiosInstance.post(
        "/categories",
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
  const handleUpdateCategory = async (categoryId) => {
    try {
      console.log(categoryId);
      // Realizar la solicitud PUT para actualizar una categoría
      const { data } = await axiosInstance.put(
        `/categories/${categoryId}`,
        formData, // Enviar formData en el cuerpo de la solicitud
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }
      );

      // Actualizar la lista de categorías con la categoría actualizada
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === data._id ? data : category
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
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    // Llenar el formulario con los datos del elemento seleccionado
    setFormData({
      name: category.name,
      description: category.description,
      subcategory: category.subcategory,
    });
  };

  // Funcion para eliminar registro
  const handleDeleteCategory = async (categoryId) => {
    try {
      // Realizar la solicitud DELETE para eliminar una categoría
      await axiosInstance.delete(`/categories/${categoryId}`, {
        headers: { authorization: `Token ${token}` },
      });

      // Eliminar la categoría de la lista
      setCategories((prevCategories) =>
        prevCategories.filter((categories) => categories._id !== categoryId)
      );
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // Manejar cambios en el formulario

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <h2>Crear Nueva Categoría</h2>
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
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button onClick={handleCreateCategory}>Crear</Button>
          <Button onClick={() => handleUpdateCategory(selectedCategory._id)}>
            Actualizar
          </Button>
        </Form>

        <h2>Lista de Categorías</h2>
        <ul>
          {categories?.map((category) => (
            <li key={category._id}>
              {category.name} - {category.description}
              <button onClick={() => handleEditClick(category)}>Editar</button>
              <button onClick={() => handleDeleteCategory(category._id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
