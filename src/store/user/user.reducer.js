import { USERACTIONTYPES } from "./user.types"; // change this to USER_ACTION_TYPES and all the others to aswell

const INITIALSTATE = {
  currentuser: null, // change currentuser to camel case
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
