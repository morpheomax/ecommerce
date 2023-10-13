export const ActionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      // Lógica para agregar un producto al carrito
      return { ...state, cart: [...state.cart, action.payload] };
    case ActionTypes.REMOVE_FROM_CART:
      // Lógica para eliminar un producto del carrito
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case ActionTypes.CLEAR_CART:
      // Lógica para vaciar todo el carrito
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default cartReducer;

