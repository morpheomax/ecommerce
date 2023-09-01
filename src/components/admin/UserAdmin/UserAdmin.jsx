/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";
import { Table, Form } from "react-bootstrap";

export const UserAdmin = ({ setEditUser, refresh }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estado para almacenar el rol seleccionado
  const [selectedRole, setSelectedRole] = useState("cliente");

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
  }, [refresh]);

  // Función para eliminar un usuario por su ID
  const handleDeleteUser = async (userId) => {
    const token = JSON.parse(localStorage.getItem("loginFormData"));
    // console.log(userId);
    try {
      // Realizar la solicitud DELETE a la API para eliminar el usuario
      await axiosInstance.delete(`/users/${userId}`, {
        headers: { authorization: `Token ${token}` },
      });

      // Actualizar la lista de usuarios después de eliminar
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Funcion Editar

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  // Configurar el evento SSE para recibir actualizaciones en tiempo real
  const eventSource = new EventSource("/events"); // Reemplaza "/events" con la ruta correcta de SSE en tu servidor

  eventSource.addEventListener("userCreated", (event) => {
    // Cuando se recibe un evento de usuario creado, actualiza la lista de usuarios
    const newUser = JSON.parse(event.data);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  });

  // Filtrar usuarios por rol "Cliente"
  const clientes = users.filter((user) => user.rol === "cliente");

  // Filtrar usuarios por rol "SuperAdmin"
  const Administración = users.filter((user) => user.rol !== "cliente");

  // Función para manejar el cambio en el selector de rol
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Filtrar usuarios por rol seleccionado
  const filteredUsers = selectedRole === "cliente" ? clientes : Administración;

  return (
    <div className="m-5">
      <h2>Lista de Usuarios</h2>
      {/* Selector para elegir el rol */}
      <Form.Group className="d-flex p-2">
        <Form.Label>Filtrar por Rol:</Form.Label>
        <Form.Control
          as="select"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="cliente">Cliente</option>
          <option value="superAdmin">Administración</option>
        </Form.Control>
      </Form.Group>

      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          {clientes.length > 0 && (
            <>
              <h3>Usuarios</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nombre de Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.lastname}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.rol}</td>
                      <td>
                        <div className="d-flex">
                          <div
                            onClick={() => handleEditUser(user)}
                            className="me-2 text-primary"
                          >
                            <i className="bi bi-pencil"></i>
                          </div>

                          <div
                            onClick={() => handleDeleteUser(user._id)}
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
        </>
      )}
    </div>
  );
};
