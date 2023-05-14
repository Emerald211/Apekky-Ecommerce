import { createAction } from "../../utils/reducer/reducer";
import { USERACTIONTYPES } from "./user.types";

export const setCurrentUSer = (user) =>
  createAction(USERACTIONTYPES.SET_CURRENT_USER, user);
