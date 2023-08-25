// HOC = Higher order component

import { UserContext } from "./userContext";
import { useReducer } from "react";
import userReducer from "./userReducer";

export const UserProvider = ({ children }) => {
  // la siguiente linea debiera ser como la siguiente:
  // const [state, dispatch] = useReducer(userReducer, null)
  // pero como vamos a manejar un usuario, la nombraremos como tal
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
