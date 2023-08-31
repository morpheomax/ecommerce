/* eslint-disable react/prop-types */ //Bloquea a esLint para que no detecte error en children

// HOC = Higher order component

// Importa UserContext, useReducer y userReducer desde sus respectivos archivos.
import { UserContext } from "./userContext";
import { useReducer } from "react";
import userReducer from "./userReducer";
import jwt from "jwt-decode";

// Crea un componente llamado UserProvider. Este es un Higher Order Component (HOC) que proporcionará el contexto de usuario a otros componentes.
export const UserProvider = ({ children }) => {
  const leerToken = () => {
    const token = JSON.parse(localStorage.getItem("loginFormData"));
    // console.log(token);
    // decodificar token
    if (token) {
      const tokenDecodificado = jwt(token);
      // console.log(tokenDecodificado);
      return { user: tokenDecodificado };
    }
    return null;
  };
  // Utiliza useReducer para crear un estado llamado 'user' y un despachador 'dispatch' basado en el userReducer.
  const [user, dispatch] = useReducer(userReducer, null, leerToken);

  // Retorna un componente UserContext.Provider que envuelve los componentes hijos.
  // Esto permite que los componentes hijos accedan al estado 'user' y al despachador 'dispatch' a través del contexto.
  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
