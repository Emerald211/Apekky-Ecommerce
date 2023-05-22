import { Routes, Route } from "react-router-dom";
import ShoppingComponent from "../../components/shopping-component/shopping-component";
import Sections from "../../components/sections/section.component";
import { customGetCategoryAndDocumentFromCollection } from "../../utils/firebase/firebase.component";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCategories } from "../../store/categories/category.action";
import Description from "../description/description.component";

const Shop = () => {
  console.log("page rendered");

  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customGetCategoryAndDocumentFromCollection();
        dispatch(setCategories(data));
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [dispatch]);

  useEffect(() => {
    return () => {};
  }, [items]);

  return (
    <Routes>
      <Route index element={<ShoppingComponent />}></Route>
      <Route path=":section" element={<Sections />}></Route>
      <Route path="description/:id" element={<Description />}></Route>
    </Routes>
  );
};

export default Shop;
