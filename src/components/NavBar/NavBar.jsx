import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MarqueeBar } from "../MarqueeBar/MarqueeBar";
import { UserContext } from "../../context/user/userContext";
import { config } from "../../config/config";
import NavDropdown from "react-bootstrap/NavDropdown";
import Accordion from "react-bootstrap/Accordion";
import { types } from "../../context/user/userReducer";

const categories = ["Joyas de plata", "Inciensos", "Aroma terapia", "Velas"];

export const NavBar = () => {
  // Obtener el estado del contexto de usuario
  const [state, dispatch] = useContext(UserContext);
  // Navegación para redirigir a otras páginas
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cerrando sesión");
    // Aquí coloca la lógica para cerrar la sesión del usuario
    // Por ejemplo, puedes llamar a una función de tu contexto de usuario para hacerlo
    dispatch({ type: types.setLogout }); // Ejemplo de cómo podría llamarse una acción de logout
    // Redirigir al usuario a la página principal
    navigate("/");
  };

  return (
    <>
      <nav className="navbar m-0 p-0 bg-body-tertiary fixed-top">
        <MarqueeBar />
        <div className="container-fluid m-2">
          <div className="container-fluid text-center">
            <div className="row align-items-center">
              <div className="col-1">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div className="col-2">
                <i className="bi bi-search"></i>
              </div>
              <Link className="col-5 mx-auto navbar-brand" to="/">
                <strong>{config.nameStore}</strong>
              </Link>
              {/* iconos barra Nav */}
              <div className="col-1">
                <NavDropdown title={<i className="bi bi-person-circle"></i>}>
                  {state?.user ? ( // Verificar si el usuario está autenticado
                    state.user.rol !== "cliente" ? (
                      <>
                        <NavDropdown.Item>
                          {/* Mostrar el nombre del usuario */}
                          <p>Hola! {state.user.name}</p>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-link" to="/perfil">
                            Perfil
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-link" to="/admin">
                            Administración
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-link" to="/configuracion">
                            Configuración
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="btn" onClick={handleLogout}>
                            Cerrar Sesión
                          </Link>
                        </NavDropdown.Item>
                      </>
                    ) : state.user.rol === "cliente" ? (
                      <>
                        <NavDropdown.Item>
                          {/* Mostrar el nombre del usuario */}
                          <p>Bienvenido {state.user.name}</p>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-link" to="/perfil">
                            Perfil
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-link" to="/direcciones">
                            Direcciones
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-link" to="/miscompras">
                            Mis Compras
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            className="nav-link"
                            to="/misproductosguardados"
                          >
                            Mis Productos Guardados
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="btn" onClick={handleLogout}>
                            Cerrar Sesión
                          </Link>
                        </NavDropdown.Item>
                      </>
                    ) : (
                      // Rol desconocido o no manejado
                      <NavDropdown.Item>Rol no válido</NavDropdown.Item>
                    )
                  ) : (
                    // Usuario no autenticado
                    <>
                      <NavDropdown.Item>
                        <Link className="nav-link" to="/login">
                          Iniciar Sesión
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link className="nav-link" to="/registro">
                          Registrarse
                        </Link>
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </div>
              <div className="col-1">
                <Link className="nav-link" to="/seguimiento">
                  <i className="bi bi-heart"></i>
                </Link>
              </div>
              <div className="col-1">
                <Link className="nav-link" to="/compras">
                  <i className="bi bi-bag"></i>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                {" "}
                <img
                  src={config.logo}
                  className="rounded img-thumbnail"
                  alt={config.nameStore}
                  style={{ maxWidth: "150px" }}
                />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            {/* -------------------------- */}

            {/* Sesion iniciada Administrado*/}
            {state?.user && state.user.rol !== "cliente" ? ( // Verificar si el usuario está autenticado y su rol
              <>
                <Accordion>
                  {/*defaultActiveKey="0"*/}
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Administrar Pedidos</Accordion.Header>
                    <Accordion.Body>- Ver Pedidos</Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Administrar Tienda</Accordion.Header>
                    <Accordion.Body>- Datos de la tienda - RRSS</Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Usuarios</Accordion.Header>
                    <Accordion.Body>
                      <Link to="/useradmin" className="nav-link">
                        - Administrar Usuarios
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Categorías</Accordion.Header>
                    <Accordion.Body>
                      <Link to="/categories" className="nav-link">
                        - Administrar Categorías
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Variantes</Accordion.Header>
                    <Accordion.Body>
                      - Ver Variantes - Crear Variantes
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5">
                    <Accordion.Header>Productos</Accordion.Header>
                    <Accordion.Body>
                      - Ver Productos - Crear/Editar Productos - Stock
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            ) : (
              <>
                {/* Vista ususario */}
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="./nosotros">
                        Nosotros
                      </Link>
                    </li>

                    {/* Lista desplegable */}
                    <NavDropdown
                      title="Categorias"
                      id="offcanvasNavbarDropdown"
                    >
                      {categories.map((category, index) => (
                        <NavDropdown.Item key={index}>
                          <Link
                            className="nav-link"
                            to={`categorias/${category}`}
                          >
                            {category}
                          </Link>
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>

                    <li className="nav-item">
                      <Link className="nav-link" to="./contacto">
                        Contacto
                      </Link>
                    </li>
                  </ul>

                  <form className="d-flex mt-3" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Buscar"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-dark" type="submit">
                      Buscar
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* -------------------------- */}
          </div>
        </div>
      </nav>
    </>
  );
};
