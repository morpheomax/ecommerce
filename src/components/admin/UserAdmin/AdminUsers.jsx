/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import axiosInstance from "../../../config/axios";
import { UserContext } from "../../../context/user/userContext";
import { Table } from "react-bootstrap";

const initialForm = {
  name: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  address: "",
  addressNumber: "",
  commune: "",
  city: "",
  reference: "",
  postalcode: "",
  phone: "",
  rol: "",
};

export const AdminUsers = () => {
  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [, dispatch] = useContext(UserContext); // Obtener el contexto del usuario para manejar el estado global de autenticación

  // Declarar un estado adicional para el elemento seleccionado
  const [selectedUser, setSelectedUser] = useState(null);

  const [refresh, setRefresh] = useState(null);

  // Cargar la lista de usuarios al cargar la página
  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((response) => {
        if (response.data && Array.isArray(response.data.detail)) {
          setUser(response.data.detail);
        } else {
          console.error("Respuesta inesperada de la API:", response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Usuarios:", error);
        setIsLoading(false);
      });
  }, [refresh]);

  // Función para crear un nueva usuario
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Realizar la solicitud POST para crear un Usuario
      const { data } = await axiosInstance.post(
        "/users",
        formData,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }
      );

      // Agregar nuevo usuario a la lista

      setFormData(initialForm);
      setIsLoading(false);
      setRefresh(data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar usuario:", error);
    }
  };

  // Función para actualizar un usuario
  const handleUpdateUser = async (userId) => {
    try {
      //   console.log(userId);
      // Realizar la solicitud PUT para actualizar un usuario
      const { data } = await axiosInstance.put(
        `/users/${userId}`,
        formData, // Enviar formData en el cuerpo de la solicitud
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }
      );

      // Actualizar la lista de usuarios actualizada
      setUser((prevUser) =>
        prevUser.map((user) => (user._id === data._id ? data : user))
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
      console.error("Error al actualizar el Usuario:", error);
    }
  };

  // Función para manejar el botón "Editar"
  const handleEditClick = (user) => {
    setSelectedUser(user);
    // Llenar el formulario con los datos del elemento seleccionado
    setFormData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: user.password,
      address: user.address,
      addressNumber: user.addressNumber,
      commune: user.commune,
      city: user.city,
      reference: user.reference,
      postalcode: user.postalcode,
      phone: user.phone,
    });
  };

  // Funcion para eliminar registro
  const handleDeleteUser = async (userId) => {
    try {
      // Realizar la solicitud DELETE para eliminar un usuario
      await axiosInstance.delete(`/store/${userId}`, {
        headers: { authorization: `Token ${token}` },
      });

      // Eliminar la usuario de la lista
      setUser((prevUser) => prevUser.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Manejar cambios en el formulario

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="mt-4">
        <h2>Usuarios</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Número</th>
              <th>Comuna</th>
              <th>Ciudad</th>
              <th>Referencia</th>
              <th>Codigo Postal</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.addressNumber}</td>
                <td>{user.commune}</td>
                <td>{user.city}</td>
                <td>{user.reference}</td>
                <td>{user.postalcode}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleEditClick(user)}>Editar</button>
                  <button onClick={() => handleDeleteUser(user._id)}>
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
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="Number"
              name="addressNumber"
              value={formData.addressNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Comuna</Form.Label>
            <Form.Control
              type="text"
              name="commune"
              value={formData.commune}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Reference</Form.Label>
            <Form.Control
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Codigo Postal</Form.Label>
            <Form.Control
              type="Number"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Button onClick={handleCreateUser}>Crear</Button>
          <Button onClick={() => handleUpdateUser(selectedUser._id)}>
            Actualizar
          </Button>
        </Form>
        <hr />
      </div>
    </>
  );
};
