import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer";

const addCartItemFunction = (cartItem, productsToAdd) => {
  // change cartitem to camel case and the others too aswell
  const existingCartItem = cartItem.find((cartitem) => {
    return cartitem.id === productsToAdd.id;
  });

  if (existingCartItem) {
    return cartItem.map((eachCartitem) =>
      eachCartitem.id === productsToAdd.id
        ? { ...eachCartitem, quantity: eachCartitem.quantity + 1 }
        : eachCartitem
    );
  }

  return [...cartItem, { ...productsToAdd, quantity: 1 }];
};

const removeCartItemFunction = (cartItem, productToRemove) => {
  const existingItem = cartItem.find((eachCartitem) => {
    return eachCartitem.id === productToRemove.id;
  });

  if (existingItem.quantity === 1) {
    return cartItem.filter((eachCartItem) => {
      return eachCartItem.id !== productToRemove.id;
    });
  }

  return cartItem.map((eachCartItem) => {
    return eachCartItem.id === productToRemove.id
      ? { ...eachCartItem, quantity: eachCartItem.quantity - 1 }
      : eachCartItem;
  });
};

const deleteFromCartFunction = (cartItem, productToDelete) => {
  return cartItem.filter((eachCartItem) => {
    return eachCartItem.id !== productToDelete.id;
  });
};

export const setDropDown = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_DROPDOWN, boolean);

export const addItemToCart = (cartItem, productsToAdd) => {
  const newCartItems = addCartItemFunction(cartItem, productsToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItem, productToRemove) => {
  const newCartItems = removeCartItemFunction(cartItem, productToRemove);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const deleteFromCart = (cartItem, productToDelete) => {
  const newCartItems = deleteFromCartFunction(cartItem, productToDelete);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setDeliveryFee = (amount) =>
  createAction(CART_ACTION_TYPES.SET_DELIVERY_FREE, amount);
