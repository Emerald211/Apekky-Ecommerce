import { USERACTIONTYPES } from "./user.types";

const INITIALSTATE = {
  currentuser: null,
};

export const userReducer = (state = INITIALSTATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USERACTIONTYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentuser: payload,
      };
    default:
      return state;
  }
};
