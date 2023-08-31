/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import axiosInstance from "../../../config/axios";
import { Table } from "react-bootstrap";

const initialForm = {
  name: "",
  description: "",
  subcategory: "",
};

export const Categories = () => {
  const token = JSON.parse(localStorage.getItem("loginFormData"));
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);

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
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axiosInstance.delete(`/categories/${categoryId}`, {
        headers: { Authorization: `Token ${token}` },
      });

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem("loginFormData"));
      console.log(token);

      const { data } = await axiosInstance.post("/categories/", formData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      });

      setFormData(initialForm);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar categoría:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Container fluid className="mt-4">
        <div className="card p-4 shadow">
          <h5 className="mb-4 text-center">Registro de Categorías</h5>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={2}>
                <Form.Group controlId="name">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={2}>
                <Form.Group controlId="description">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-2">
              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                className="mb-3"
              >
                {isLoading ? "Guardando..." : "Crear"}
              </Button>
            </Row>
          </Form>
        </div>
      </Container>

      <div className="m-5">
        <h2>Lista de Categorías</h2>
        {isLoading ? (
          <p>Cargando Categorías...</p>
        ) : (
          <>
            <h3>Categorías</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Sub Categoría</th>
                  <th>Descripción Sub</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.subcategory}</td>
                    <td>{category.subdescription}</td>
                    <td>
                      <div className="d-flex">
                        <div
                          onClick={() => handleDeleteCategory(category._id)}
                          className="text-danger"
                        >
                          <i className="bi bi-trash3"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};
