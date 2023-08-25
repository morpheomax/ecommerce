import { Container, Row, Col, Image } from "react-bootstrap";
import { config } from "../helpers/config";

export const AboutPage = () => {
  return (
    <>
      <Container className="py-5">
        <Row className="mb-5">
          <Col>
            <h1 className="text-center">Nosotros</h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6}>
            <Image
              src={config.tienda}
              alt="Imagen de nuestra tienda"
              fluid
              roundedCircle // Agregamos esta propiedad para el borde redondeado
              className="mb-3 shadow" // Estilo de sombra para destacar la imagen
            />
          </Col>
          <Col md={6}>
            <h2>Nuestra Historia</h2>
            <p>
              En <strong>{config.nameStore}</strong>, creemos en la conexión
              entre mente, cuerpo y espíritu. Fundada en el año 2023, nuestra
              pasión por el bienestar y la espiritualidad nos llevó a crear un
              espacio donde puedas encontrar una amplia gama de productos
              diseñados para nutrir tu alma y enriquecer tu vida diaria.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6}>
            <h2>Nuestra Misión</h2>
            <p>
              Nuestra misión es brindarte acceso a productos de alta calidad que
              te ayuden a encontrar equilibrio y armonía en tu vida. Creemos en
              el poder de la aromaterapia, la meditación y la espiritualidad
              para transformar tu rutina diaria en momentos significativos de
              cuidado personal y autoconexión.
            </p>
          </Col>
          <Col md={6}>
            <Image
              src={config.products}
              alt="Productos Aromaterapia"
              fluid
              roundedCircle //  propiedad para el borde redondeado
              className="mb-3 shadow" // Estilo de sombra para destacar la imagen
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Contáctanos</h2>
            <p>
              Estamos aquí para responder a tus preguntas y ayudarte en tu viaje
              espiritual. No dudes en ponerte en contacto con nuestro equipo en
              cualquier momento.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
