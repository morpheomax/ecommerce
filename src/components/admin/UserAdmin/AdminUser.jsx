import { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../config/axios";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import jwt from "jwt-decode";
import { UserContext } from "../../../context/user/userContext";
import { types } from "../../../context/user/userReducer";

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
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Obtener el contexto del usuario para manejar el estado global de autenticación
  const [, dispatch] = useContext(UserContext);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState(initialForm);

  // Estado para manejar los errores del formulario
  const [errors, setErrors] = useState(initialForm);

  // Estado para mostrar el mensaje de registro completado
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Estado para manejar el estado del correo electrónico (registrado o no)
  const [emailExists, setEmailExists] = useState(false);

  // Estado para manejar los mensajes de error y éxito
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    // Realizar la solicitud GET a la API para obtener la lista de usuarios
    axiosInstance
      .get("/users/")
      .then((response) => {
        if (response.data && Array.isArray(response.data.detail)) {
          // Verificar si la respuesta contiene un arreglo en la propiedad "detail"
          setUsers(response.data.detail); // Establecer los usuarios en el estado
        } else {
          console.error("Respuesta inesperada de la API:", response.data);
        }
        setIsLoading(false); // Cambiar el estado de carga a falso
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
        setIsLoading(false);
      });

    // Configurar el evento SSE para recibir actualizaciones en tiempo real
    const eventSource = new EventSource("/events"); // Reemplaza "/events" con la ruta correcta de SSE en tu servidor

    eventSource.addEventListener("userCreated", (event) => {
      // Cuando se recibe un evento de usuario creado, actualiza la lista de usuarios
      const newUser = JSON.parse(event.data);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    return () => {
      // Cierra la conexión SSE cuando el componente se desmonta
      eventSource.close();
    };
  }, []);

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
      const response = await axiosInstance.get(`/users/check-email/${email}`);
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

    // Restablecer los mensajes de error y éxito
    setError(null);
    setRegistrationSuccess(false);

    // Validar campos del formulario y crear un objeto de errores
    const newErrors = {
      name: formData.name === "",
      lastname: formData.lastname === "",
      email: formData.email === "" || emailExists,
      username: formData.username === "",
      password: formData.password === "",
      address: formData.address === "",
      addressNumber: formData.addressNumber === "",
      commune: formData.commune === "",
      city: formData.city === "",
      reference: formData.reference === "",
      postalcode: formData.postalcode === "",
      phone: formData.phone === "",
      rol: formData.rol === "",
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Enviar datos al servidor para el registro
      const { data } = await axiosInstance.post("/users/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      setRegistrationSuccess(true);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar usuario:", error);
      // Mostrar un mensaje de error al usuario
      setError(
        "Error al registrar usuario. Por favor, revise los datos e inténtelo de nuevo."
      );
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Container fluid>
        <div className="card p-4 shadow">
          <h5 className="mb-4 text-center">Registro de Usuarios</h5>
          {registrationSuccess && (
            <Alert variant="success" className="mb-3">
              Registro completado. ¡Bienvenido!
            </Alert>
          )}

          {/* Formulario */}
          <Form onSubmit={handleSubmit}>
            {/* Contenido Formulario */}
            <Row>
              {/* Nombre */}
              <Col xs={12} md={2}>
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
              {/* Apellido */}
              <Col xs={12} md={2}>
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
              {/* Email */}
              <Col xs={12} md={4}>
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
              {/* Usuario */}
              <Col xs={12} md={2}>
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
              {/* Password */}
              <Col xs={12} md={2}>
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
              {/* Dirección */}
              <Col xs={12} md={4}>
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
              {/* Número de Dirección */}
              <Col xs={12} md={2}>
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
              <Col xs={12} md={3}>
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
              <Col xs={12} md={3}>
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
              {/* Referencia */}
              <Col xs={12} md={4}>
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
              {/* Código Postal */}
              <Col xs={12} md={2}>
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
              {/* Teléfono */}
              <Col xs={12} md={3}>
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
              <Col>
                <Form.Group controlId="rol">
                  <Form.Label>Perfil</Form.Label>
                  <Form.Select
                    type="text"
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    isInvalid={errors.rol}
                  >
                    <option disabled>Seleccione...</option>
                    <option value="administrador">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="cliente">Cliente</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Campo obligatorio
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row></Row>

            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              className="mb-3"
            >
              {isLoading ? "Guardando..." : "Crear"}
            </Button>
          </Form>
        </div>
      </Container>

      <div>
        <h2>Lista de Usuarios</h2>
        {isLoading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <>
            {/* Renderizar la tabla de usuarios */}
            {users.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nombre de Usuario</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.lastname}</td>
                      <td>{user.username}</td>
                      <td>{user.rol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};
