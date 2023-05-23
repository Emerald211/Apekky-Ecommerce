import { CART_ACTION_TYPES } from "./cart.types";
export const CART_INITIAL_STATE = {
  dropdown: false,
  cartItem: [],
  deliveryFee: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItem: payload };
    case CART_ACTION_TYPES.SET_DROPDOWN:
      return { ...state, dropdown: payload };
    case CART_ACTION_TYPES.SET_DELIVERY_FREE:
      return { ...state, deliveryFee: payload };
    default:
      return state;
  }
};
