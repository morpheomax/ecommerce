/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import axiosInstance from "../../../config/axios";
import { UserContext } from "../../../context/user/userContext";

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
};

export const Profile = () => {
  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [selectedUser, setSelectedUser] = useState(null);
  const [, dispatch] = useContext(UserContext);

  const [state] = useContext(UserContext);

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos del usuario logueado
    axiosInstance
      .get(`/users/me`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          setFormData({
            name: response.data.name,
            lastname: response.data.lastname,
            // Agregar los demás campos según tu estructura de datos
          });
        } else {
          console.error("Respuesta inesperada de la API:", response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el Usuario:", error);
        setIsLoading(false);
      });
  }, [token]);

  const handleUpdateProfile = async () => {
    try {
      // Realizar la solicitud PUT para actualizar el perfil del usuario logueado
      const { data } = await axiosInstance.put("/users/me", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      // Actualizar los datos del usuario en el estado
      setUser(data);

      // Limpiar el formulario
      setFormData(initialForm);

      // Puedes omitir esta línea si no necesitas refrescar la página
      // setRefresh(data);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      // Realizar la solicitud DELETE para eliminar el perfil del usuario logueado
      await axiosInstance.delete("/users/me", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      // Limpiar el estado y redirigir a la página de inicio de sesión o a donde desees
      setUser(null);
      localStorage.removeItem("loginFormData"); // Limpiar el token almacenado
      // Redirigir a la página de inicio de sesión u otra página
      // history.push("/login");
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <h2>Editar Perfil</h2>

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
          {/* Agregar los demás campos del formulario aquí */}
          <Button onClick={handleUpdateProfile}>Actualizar</Button>
        </Form>
        <h2>Usuario</h2>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <p>{state.user._id}</p>
            {state.user.name}
            {state.user.lastname}
            {state.user.email}
            {state.user.username}
            {state.user.address}
            {state.user.addressNumber}
            {state.user.commune}
            {state.user.city}
            {state.user.reference}
            {state.user.postalcode}
            {state.user.phone}

            {/* Agregar los demás campos del usuario aquí */}
            <Button onClick={handleDeleteProfile}>Eliminar</Button>
          </div>
        )}
      </div>
    </>
  );
};
