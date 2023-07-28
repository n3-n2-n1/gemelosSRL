// cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './cartActionTypes';

const initialState = {
  cartItems: [],
  totalPrice: 0, // New property to store the total price
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_TO_CART: {
      const updatedCartItems = [...state.cartItems, action.payload];
      const updatedTotalPrice = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
      };
    }
    case REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter((item) => item.id !== action.payload);
      const updatedTotalPrice = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
      };
    }
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
