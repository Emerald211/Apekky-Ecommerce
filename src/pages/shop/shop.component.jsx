import { Routes, Route } from "react-router-dom";
import ShoppingComponent from "../../components/shopping-component/shopping-component";
import Sections from "../../components/sections/section.component";
import { customGetCategoryAndDocumentFromCollection } from "../../utils/firebase/firebase.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCategories } from "../../store/categories/category.action";


const Shop = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    const getRes = async () => {
      const data = await customGetCategoryAndDocumentFromCollection();

      // console.log(data);

      dispatch(setCategories(data));
    };

    return getRes;
  }, []);
  return (
    <Routes>
      <Route index element={<ShoppingComponent />} ></Route>
      <Route path=":section" element={<Sections />}></Route>
</Routes>
  );
};

export default Shop;
