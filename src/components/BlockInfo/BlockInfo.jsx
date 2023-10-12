import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import seguro from "../../assets/img/imgcomponents/seguro.png";
import delivery from "../../assets/img/imgcomponents/delivery.png";
import descuento from "../../assets/img/imgcomponents/discount.png";
import soporte from "../../assets/img/imgcomponents/24.png";

export const BlockInfo = () => {
  return (
    <>
      <Container fluid className="p-5">
        <Row className="text-center">
          <Col xs={6} md={3}>
            <img src={seguro} alt="Pago seguro" />
            <h6>Pago Seguro</h6>
          </Col>
          <Col xs={6} md={3}>
            <img src={delivery} alt="Pago seguro" />
            <h6>Envíos a todo el País</h6>
          </Col>
          <Col xs={6} md={3}>
            <img src={descuento} alt="Pago seguro" />
            <h6>Descuentos disponibles</h6>
          </Col>
          <Col xs={6} md={3}>
            <img src={soporte} alt="Pago seguro" />
            <h6>Soporte 24/7</h6>
          </Col>
        </Row>
      </Container>
    </>
  );
};
