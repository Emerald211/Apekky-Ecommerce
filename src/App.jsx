import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./pages/navigation/navigation.component";
import Home from "./pages/home/home.component";
import { useEffect, } from "react";
import {
  createUserDocumentFromAuth,
  customOnAUthStateChange,
} from "./utils/firebase/firebase.component";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUSer } from "./store/user/user.action";
import Shop from "./pages/shop/shop.component";
import Checkout from "./pages/checkout/checkout.comppnent";
import { selectCategories } from "./store/categories/category.selector";


function App() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories)

  useEffect(() => {
    const unsubscribe = customOnAUthStateChange((user) => {
      console.log(user);

      createUserDocumentFromAuth(user, { uid: user.uid });

      dispatch(setCurrentUSer(user));
    });

    return unsubscribe;
  }, [categories]);



  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
