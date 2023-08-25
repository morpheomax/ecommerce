export const types = {
  setUserState: "[USER] Set user state",
  setError: "[USER] Set Error",
  setLogout: "[USER] Set logout",
};
// Definición de un reducer para el contexto de usuario
const userReducer = (state, action = {}) => {
  switch (action.type) {
    // Caso para la acción "REGISTER"
    case types.setUserState:
      // Retorna un nuevo estado con los mismos valores que el estado actual
      // y actualiza la propiedad "user" con los datos proporcionados en "action.payload"
      return {
        ...state,
        user: action.payload,
      };
      // Caso para la acción "ERROR"
      case types.setError:
      return{
      ...state,
      error: action.payload,
        };
        case types.setLogout:
          return{
            ...state,
            user: null,
          }
    // Caso por defecto en caso de que la acción no coincida con ninguna acción conocida
    default:
      // Retorna el estado actual sin realizar cambios
      return state;
  }
};

// Exporta la función reducer para que pueda ser utilizada en otros archivos
export default userReducer;
