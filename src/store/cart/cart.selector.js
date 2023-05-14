import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItem
);

export const selectDropDown = createSelector(
  [selectCartReducer],
  (cart) => cart.dropdown
);

export const selectCartTotal = createSelector([selectCartReducer], (cart) =>
  cart.cartItem.reduce(
    (total, eachCartItem) => total + eachCartItem.quantity * eachCartItem.price,
    0
  )
);
