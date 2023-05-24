import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./mobile-nav.styles.css";
import { selectCurrentUser } from "../../store/user/user.selector";
import {

  customSignOut,
} from "../../utils/firebase/firebase.component";
import { setCurrentUSer } from "../../store/user/user.action";

import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const MobileNav = ({ set }) => {
  const currentuser = useSelector(selectCurrentUser);

  useEffect(() => {}, [currentuser])

  const navigate = useNavigate()

  const dispatch = useDispatch()


  const signOutHandler = async () => {
    try {
      await customSignOut();
      dispatch(setCurrentUSer(null));
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div
      style={{ color: "#EB0EEB" }}
      className="topnav z-30 absolute font-serrat mobile-nav left-0 top-0  h-screen w-screen flex flex-col text-center items-center justify-center bg-white"
    >
      <h1 onClick={set} className=" text-lg font-bold absolute top-16 right-16">
        X
      </h1>
      <div
        id="myLinks"
        className=" flex flex-col gap-8 text-2xl font-bold justify-center"
      >
        <a onClick={() => {
          navigate("/")
          set()
        }}>Home</a>
        <a onClick={() => {
          navigate("/shop")
          set();
        }}>Shop</a>

        {currentuser ? (
          <div className=" flex flex-col gap-7">
            <a onClick={() => {
          navigate("/orders")
          set();
        }}>Orders</a>
            <a onClick={() => {
              signOutHandler()
              set()
            }}>Sign Out</a>
          </div>
        ) : (
          <a onClick={() => {
          navigate("/signin")
          set();
        }}>Sign In</a>
        )}
      </div>
      ;
    </div>
  );
};

export default MobileNav;
