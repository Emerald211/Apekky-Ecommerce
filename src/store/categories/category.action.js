import { createAction } from "../../utils/reducer/reducer";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
// import { customGetCategoryAndDocumentFromCollection } from "../../utils/firebase/firebase.component";

export const setCategories = (categoriesArray) => 
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ITEMS, categoriesArray);

