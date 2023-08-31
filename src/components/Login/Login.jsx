import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Importa el componente Link
import { UserContext } from "../../context/user/userContext";
import { types } from "../../context/user/userReducer";

import axiosInstance from "../../config/axios";
import jwt from "jwt-decode";
// eslint-disable-next-line react/prop-types
export const Login = ({ showModal, handleCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [, dispatch] = useContext(UserContext);

  const initialUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);

  // Navegación para redirigir a otras páginas
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("submit");
    try {
      console.log(user);
      const { data } = await axiosInstance.post("/users/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      const tokenDecodificado = jwt(data.token);
      dispatch({
        type: types.setUserState,
        payload: tokenDecodificado,
      });
      console.log("Dispatch realizado");
      window.alert("Usuario logueado");
      setIsLoading(false);
      handleCloseModal(); // Cerrar el modal después de iniciar sesión exitosamente
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      window.alert("Error al loguear");
      dispatch({
        type: types.setError,
        payload: error,
      });
    }
  };

  return (
    <Modal size="sm" show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Agrega los campos del formulario aquí */}
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={user.email}
              type="email"
              placeholder="Ingresa tu email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              value={user.password}
              type="password"
              placeholder="Ingresa tu contraseña"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button
          variant="outline-success"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Iniciando..." : "Iniciar Sesion"}
        </Button>
        {/* Utiliza el componente Link para ir a la página de registro */}
        <Link to="/registro">
          <Button variant="outline-primary" onClick={handleCloseModal}>
            Regístrate
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};
