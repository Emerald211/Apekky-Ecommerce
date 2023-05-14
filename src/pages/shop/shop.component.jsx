import { Routes, Route } from "react-router-dom";
import ShoppingComponent from "../../components/shopping-component/shopping-component";
import Sections from "../../components/sections/section.component";


const Shop = () => {
  return (
    <Routes>
      <Route index element={<ShoppingComponent />} ></Route>
      <Route path=":section" element={<Sections />}></Route>
</Routes>
  );
};

export default Shop;
