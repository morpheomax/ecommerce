/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";

export const UserAdmin = ({ setEditUser, refresh }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    console.log(userId);
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
  const superAdmins = users.filter((user) => user.rol !== "cliente");

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          {clientes.length > 0 && (
            <>
              <h3>Clientes</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nombre de Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente._id}>
                      <td>{cliente.name}</td>
                      <td>{cliente.lastname}</td>
                      <td>{cliente.username}</td>
                      <td>{cliente.rol}</td>
                      <td>
                        <button onClick={() => handleEditUser(cliente)}>
                          Editar
                        </button>
                        <button onClick={() => handleDeleteUser(cliente._id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {superAdmins.length > 0 && (
            <>
              <h3>SuperAdmins</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nombre de Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {superAdmins.map((superAdmin) => (
                    <tr key={superAdmin._id}>
                      <td>{superAdmin.name}</td>
                      <td>{superAdmin.lastname}</td>
                      <td>{superAdmin.username}</td>
                      <td>{superAdmin.rol}</td>
                      <td>
                        <button onClick={() => handleEditUser(superAdmin)}>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteUser(superAdmin._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};
