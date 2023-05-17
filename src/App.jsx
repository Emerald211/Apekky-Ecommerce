import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./pages/navigation/navigation.component";
import Home from "./pages/home/home.component";
import { useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  customOnAUthStateChange,
} from "./utils/firebase/firebase.component";
import { useDispatch } from "react-redux";
import { setCurrentUSer } from "./store/user/user.action";
import Shop from "./pages/shop/shop.component";
import Checkout from "./pages/checkout/checkout.comppnent";
import { customGetCategoryAndDocumentFromCollection } from "./utils/firebase/firebase.component";
import { setCategories } from "./store/categories/category.action";

function App() {
  const dispatch = useDispatch();
  const [items, setItems] = useState()

  useEffect(() => {
    const unsubscribe = customOnAUthStateChange((user) => {
      console.log(user);

      createUserDocumentFromAuth(user, { uid: user.uid });

      dispatch(setCurrentUSer(user));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getRes = async () => {
      const data = await customGetCategoryAndDocumentFromCollection();

      // console.log(data);

      dispatch(setCategories(data));

      setItems(data)
    };

    return () => getRes();
  }, []);

  useEffect(() => { }, [items])

  console.log(items);

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
