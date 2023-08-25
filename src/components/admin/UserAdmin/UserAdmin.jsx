import { useState, useEffect } from "react";
import axios from "axios";

export const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Realizar la solicitud GET a la API para obtener la lista de usuarios
    axios
      .get("https://backendproyecto5.onrender.com/users/")
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
  }, []);

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
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente._id}>
                      <td>{cliente.name}</td>
                      <td>{cliente.lastname}</td>
                      <td>{cliente.username}</td>
                      <td>{cliente.rol}</td>
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
                  </tr>
                </thead>
                <tbody>
                  {superAdmins.map((superAdmin) => (
                    <tr key={superAdmin._id}>
                      <td>{superAdmin.name}</td>
                      <td>{superAdmin.lastname}</td>
                      <td>{superAdmin.username}</td>
                      <td>{superAdmin.rol}</td>
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
