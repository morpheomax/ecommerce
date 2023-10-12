/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import axiosInstance from "../../../config/axios";
import { UserContext } from "../../../context/user/userContext";
import { Table } from "react-bootstrap";

const initialForm = {
  name: "",
  logo: "",
  description: "",
  addresses: "",
  phones: "",
  rrss: "",
};

export const Store = () => {
  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [, dispatch] = useContext(UserContext); // Obtener el contexto del usuario para manejar el estado global de autenticación

  // Declarar un estado adicional para el elemento seleccionado
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [refresh, setRefresh] = useState(null);

  // Cargar la lista de categorías al cargar la página
  useEffect(() => {
    axiosInstance
      .get("/store")
      .then((response) => {
        if (response.data && Array.isArray(response.data.detail)) {
          setStore(response.data.detail);
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
        "/store",
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
  const handleUpdateCategory = async (storeId) => {
    try {
      console.log(storeId);
      // Realizar la solicitud PUT para actualizar una categoría
      const { data } = await axiosInstance.put(
        `/store/${storeId}`,
        formData, // Enviar formData en el cuerpo de la solicitud
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }
      );

      // Actualizar la lista de categorías con la categoría actualizada
      setStore((prevStore) =>
        prevStore.map((store) => (store._id === data._id ? data : store))
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
  const handleEditClick = (store) => {
    setSelectedCategory(store);
    // Llenar el formulario con los datos del elemento seleccionado
    setFormData({
      name: store.name,
      logo: store.logo,
      description: store.description,
      addresses: store.addresses,
      phones: store.phones,
      rrss: store.rrss,
    });
  };

  // Funcion para eliminar registro
  const handleDeleteCategory = async (storeId) => {
    try {
      // Realizar la solicitud DELETE para eliminar una categoría
      await axiosInstance.delete(`/store/${storeId}`, {
        headers: { authorization: `Token ${token}` },
      });

      // Eliminar la categoría de la lista
      setStore((prevStore) =>
        prevStore.filter((store) => store._id !== storeId)
      );
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // Manejar cambios en el formulario

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevStore) => ({
      ...prevStore,
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
              <th>Nombre</th>
              <th>Logo</th>
              <th>Descripción</th>
              <th>Direcciones</th>
              <th>Teléfonos</th>
              <th>Redes Sociales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store?.map((store) => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.logo}</td>
                <td>{store.description}</td>
                <td>{store.addresses}</td>
                <td>{store.phones}</td>
                <td>{store.rrss}</td>
                <td>
                  <button onClick={() => handleEditClick(store)}>Editar</button>
                  <button onClick={() => handleDeleteCategory(store._id)}>
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

          <Button onClick={handleCreateCategory}>Crear</Button>
          <Button onClick={() => handleUpdateCategory(selectedCategory._id)}>
            Actualizar
          </Button>
        </Form>

        {/*   <h2>Lista de Categorías</h2>
        <ul>
          {store?.map((store) => (
            <li key={store._id}>
              {store.name} - {store.logo} - {store.description} -{" "}
              {store.addresses} - {store.phones} - {store.rrss}
              <button onClick={() => handleEditClick(store)}>Editar</button>
              <button onClick={() => handleDeleteCategory(store._id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul> */}

        {/* <hr />
        <ul>
          {store?.map((store) => (
            <li key={store._id}>
              {Object.entries(store).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
              <div>
                <button onClick={() => handleEditClick(store)}>Editar</button>
                <button onClick={() => handleDeleteCategory(store._id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul> */}

        <hr />
      </div>
    </>
  );
};
