import Accordion from "react-bootstrap/Accordion";
import { UserAdmin } from "../../components/admin/UserAdmin/UserAdmin";
export const AdminPage = () => {
  return (
    <>
      <UserAdmin />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Información de la Tienda Ver y Modificar
          </Accordion.Header>
          <Accordion.Body>
            - Nombre de Tienda - Dirección o direcciones - Teléfonos (Fijo,
            movil) - Redes sociales (Facebook, Twitter, Instagram, Youtube,
            TikTok, Threads)
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Administración de usuarios</Accordion.Header>
          <Accordion.Body>
            CRUD de Usuarios, proveniente de la colección users de las de datos
            tienda en mongodb
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Creación de Categorias y sub Categorias
          </Accordion.Header>
          <Accordion.Body>
            CRUD de Categorias y subcategorias, proveniente de la colección
            categories de lase de datos tienda en mongodb
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Creación de Variantes</Accordion.Header>
          <Accordion.Body>
            CRUD de Variantes, como por ejemplo: nombre: Color -- Blanco --
            Negro -- Rojo proveniente de la colección variants de lase de datos
            tienda en mongodb
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Visualizar y categorizar formulario Contacto
          </Accordion.Header>
          <Accordion.Body>
            Visualizar los registros que se ingresan a la colección contacts de
            la base de datos tienda en Mongodb y aplicar estados como,
            pendiente, derivado, resuelto
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Creación Productos</Accordion.Header>
          <Accordion.Body>
            CRUD de productos, crear, listar, editar y elminar los productos de
            la colección products de la base de datos tienda en Mongodb
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
