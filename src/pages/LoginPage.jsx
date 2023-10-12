import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user/userContext";
import { types } from "../context/user/userReducer";

import axiosInstance from "../config/axios";
import jwt from "jwt-decode";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  // Nuevo estado para el inicio de sesión
  const [, setIsLoggedIn] = useState(false);

  // Estados para manejar mensajes de alerta
  const [, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("loginFormData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos no vacíos
    if (!formData.email || !formData.password) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axiosInstance.post("/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // decodificar token
      const tokenDecodificado = jwt(data.token);

      // Almacenando datos en localStorage, de este modo lo puedo mantener para usar en provider y mantengo la sesion activa aun actualizando la pagina
      if (formData.rememberMe) {
        localStorage.setItem("loginFormData", JSON.stringify(data.token));
      } else {
        localStorage.removeItem("loginFormData");
      }
      // Mostrar el token en la consola
      // console.log("Token decodificado:", tokenDecodificado);
      dispatch({
        type: types.setUserState,
        payload: tokenDecodificado,
      });
      setIsLoggedIn(true); // Establecer isLoggedIn en true al iniciar sesión con éxito
      setSuccessMessage("Conexión exitosa");
      setIsLoading(false);
      window.alert("Usuario Logueado");
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // Mostrar un mensaje de error usando el componente de Alerta de Bootstrap
      setErrorMessage("Error al iniciar sesión");

      dispatch({
        type: types.setError,
        payload: error,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <Form onSubmit={handleSubmit}>
            <h2 className="mb-4">Iniciar Sesión</h2>

            {/* Mostrar mensaje de error si existe */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form.Group controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="bi bi-eye"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill"></i>
                  )}
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="rememberMe">
              <Form.Check
                type="checkbox"
                name="rememberMe"
                label="Recordar cuenta"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="mt-3 text-center">
              <Button
                variant="primary"
                type="submit"
                className="m-2"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>

              <Link to="/registro">
                <Button variant="secondary" type="button" className="ml-2 m-2">
                  Registrarse
                </Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
