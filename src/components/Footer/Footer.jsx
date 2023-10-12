/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { config } from "../../config/config";
import "./Footer.css"; // Importa las variables desde config.js

// const categories = ["Joyas de plata", "Inciensos", "Aroma terapia", "Velas"];

export const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState(null);

  // GET de la coleccion Store
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
        console.error("Error al obtener la lista de Productos:", error);
        setIsLoading(false);
      });
  }, []);

  // GET de la coleccion Categories
  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((response) => {
        if (response.data && Array.isArray(response.data.detail)) {
          setCategories(response.data.detail);
        } else {
          console.error("Respuesta inesperada de la API:", response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Productos:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <footer>
      <Container fluid>
        <Row
          className="bg-dark text-white p-2 text-center pt-4"
          xs={1}
          sm={2}
          md={4}
        >
          <Col>
            <img
              src={config.logo}
              width="100"
              className="d-inline-block align-top inverted-image"
              alt="Logo"
            />
            <div>
              <i className="bi bi-facebook m-2"></i>
              <i className="bi bi-instagram m-2"></i>
              <i className="bi bi-pinterest m-2"></i>
              <i className="bi bi-whatsapp m-2"></i>
            </div>
          </Col>
          <Col>
            <h5>CATEGORIAS</h5>
            <ul className="list-unstyled">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link className="nav-link" to={`categorias/${category.name}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <h5>LINKS</h5>

            <ul className="list-unstyled">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link className="nav-link" to={`categorias/${category.name}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>NEWSLETER</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className=" text-white">
                  Núnca compartiremos tu email.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="bg-dark text-white p-2 text-center" xs={1}>
          <Col>
            © 2020 Copyright:
            <strong style={{ textTransform: "uppercase" }}>
              {store?.map((store) => store.name)}
            </strong>
          </Col>{" "}
          {/* Usa la variable desde config.js */}
        </Row>
      </Container>
    </footer>
  );
};
