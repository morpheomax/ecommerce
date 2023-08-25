import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [validated, setValidated] = useState(false); // Estado para la validación
  const [loading, setLoading] = useState(false); // Estado para el botón de carga
  const [alert, setAlert] = useState(null); // Estado para el mensaje de alerta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Cuando se realiza un cambio, eliminar la alerta si existe
    setAlert(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      // Validar el formulario
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        setLoading(true); // Habilitar el botón de carga

        // Enviar los datos del formulario al servidor

        const response = await axios.post(
          "https://backendproyecto5.onrender.com/contact/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          console.log(formData)
        );
        console.log(response.data);
        console.log(response);
        // Mostrar mensaje de éxito
        setAlert({
          variant: "success",
          message: "Su mensaje se ha enviado con éxito",
        });

        // Manejar la respuesta del servidor
      } catch (error) {
        // Mostrar mensaje de error
        setAlert({
          variant: "danger",
          message: "Error al enviar el mensaje",
        });

        console.error(error);
      } finally {
        setLoading(false); // Deshabilitar el botón de carga
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center">Contacto</h2>
          {alert && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert(null)}
              dismissible
            >
              {alert.message}
            </Alert>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required // Campo obligatorio
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required // Campo obligatorio
              />
              <Form.Control.Feedback type="invalid">
                Ingrese un correo electrónico válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required // Campo obligatorio
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center mt-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
