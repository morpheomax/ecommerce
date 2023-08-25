import { useState } from "react";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../components/Login/login";
import { useContext } from "react";
import { UserContext } from "../context/user/userContext";
import { types } from "../context/user/userReducer";
import axios from "axios";
import jwt from "jwt-decode";

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
  aceptaTerminos: false,
  autorizaTratamiento: false,
};

export const Registro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Navegación para redirigir a otras páginas
  const navigate = useNavigate();

  // Obtener el contexto del usuario para manejar el estado global de autenticación
  const [, dispatch] = useContext(UserContext);

  // Estado para mostrar u ocultar el modal de inicio de sesión
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState(initialForm);

  // Estado para manejar los errores del formulario
  const [errors, setErrors] = useState(initialForm);

  // Estado para mostrar el mensaje de registro completado
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Estado para manejar el estado del correo electrónico (registrado o no)
  const [emailExists, setEmailExists] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  // Función para verificar si el correo electrónico ya está registrado
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `https://backendproyecto5.onrender.com/users/check-email/${email}`
      );
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
    }
  };

  // Manejar cambios en el campo de correo electrónico
  const handleEmailChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));

    // Verificar si el correo electrónico ya existe
    checkEmailExists(value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validar campos del formulario y crear un objeto de errores
    const newErrors = {
      name: formData.name === "",
      lastname: formData.lastname === "",
      email: formData.email === "",
      username: formData.username === "",
      password: formData.password === "",
      address: formData.address === "",
      addressNumber: formData.addressNumber === "",
      commune: formData.commune === "",
      city: formData.city === "",
      reference: formData.reference === "",
      postalcode: formData.postalcode === "",
      phone: formData.phone === "",
      aceptaTerminos: !formData.aceptaTerminos,
      autorizaTratamiento: !formData.autorizaTratamiento,
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Enviar datos al servidor para el registro
      const { data } = await axios.post(
        "https://backendproyecto5.onrender.com/users/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Decodificar el token de respuesta
      const tokenDecodificado = jwt(data.token);
      console.log(tokenDecodificado);

      // Actualizar el estado global de usuario autenticado
      dispatch({
        type: types.setUserState,
        payload: tokenDecodificado,
      });

      // Limpiar el formulario y mostrar mensaje de registro completado
      setFormData(initialForm);
      setRegistrationComplete(true);

      // Redirigir al usuario a la página principal
      navigate("/");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      window.alert("Error al registrar usuario");
      console.log(error);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="card p-4 shadow">
          <h2 className="mb-4 text-center">Registro</h2>
          {registrationComplete && (
            <Alert variant="success" className="mb-3">
              Registro completado. ¡Bienvenido!
            </Alert>
          )}

          {/* Formulario */}
          <Form onSubmit={handleSubmit}>
            {/* Contenido Formulario */}
            <Row>
              <Col xs={12} md={6}>
                {/* Nombre */}
                <Form.Group controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {/* Apellido */}
                <Form.Group controlId="lastname">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    isInvalid={errors.lastname}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Email */}
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    isInvalid={errors.email || emailExists}
                  />
                  {emailExists && (
                    <Form.Text className="text-danger">
                      El correo electrónico ya está registrado.
                    </Form.Text>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {/* Usuario */}
                <Form.Group controlId="username">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {/* Password */}
                <Form.Group controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={errors.password}
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
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Dirección */}
                <Form.Group controlId="address">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    isInvalid={errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={4}>
                {/* Número de Dirección */}
                <Form.Group controlId="addressNumber">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="number"
                    name="addressNumber"
                    value={formData.addressNumber}
                    onChange={handleChange}
                    isInvalid={errors.addressNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {/* Ciudad */}
                <Form.Group controlId="city">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    isInvalid={errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {/* Comuna */}
                <Form.Group controlId="commune">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Control
                    type="text"
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    isInvalid={errors.commune}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Referencia */}
                <Form.Group controlId="reference">
                  <Form.Label>Referencia</Form.Label>
                  <Form.Control
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    isInvalid={errors.reference}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {/* Código Postal */}
                <Form.Group controlId="postalcode">
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="text"
                    name="postalcode"
                    value={formData.postalcode}
                    onChange={handleChange}
                    isInvalid={errors.postalcode}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {/* Teléfono */}
                <Form.Group controlId="phone">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {/* CheckBox */}
            <Row>
              <Col>
                <Form.Group controlId="aceptaTerminos">
                  <Form.Check
                    type="checkbox"
                    label="Acepto los términos y condiciones"
                    name="aceptaTerminos"
                    checked={formData.aceptaTerminos}
                    onChange={handleChange}
                    isInvalid={errors.aceptaTerminos}
                  />
                  <Form.Control.Feedback type="invalid">
                    Debes aceptar los términos y condiciones
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="autorizaTratamiento">
                  <Form.Check
                    type="checkbox"
                    label="Autorizo el tratamiento de mis datos personales"
                    name="autorizaTratamiento"
                    checked={formData.autorizaTratamiento}
                    onChange={handleChange}
                    isInvalid={errors.autorizaTratamiento}
                  />
                  <Form.Control.Feedback type="invalid">
                    Debes autorizar el tratamiento de tus datos personales
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              className="mb-3"
            >
              {isLoading ? "Guardando..." : "Registrarme"}
            </Button>
          </Form>
          <div className="text-center">
            ¿Ya tienes cuenta?{" "}
            <Link to="#" onClick={() => setShowLoginModal(true)}>
              Inicia sesión
            </Link>
          </div>
        </div>
        <Login
          showModal={showLoginModal}
          handleCloseModal={() => setShowLoginModal(false)}
        />
      </div>
    </>
  );
};
