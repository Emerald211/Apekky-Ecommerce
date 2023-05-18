import { useSelector } from "react-redux";
import "./mobile-nav.styles.css";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  SignInWithGooglePopup,
  customSignOut,
} from "../../utils/firebase/firebase.component";

import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const MobileNav = ({ set }) => {
  const currentuser = useSelector(selectCurrentUser);

  const navigate = useNavigate()

  const googleSignInHandler = async () => {
    await SignInWithGooglePopup();
  };

  const signOutHandler = () => {
    customSignOut();
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
        <a onClick={() => navigate("/")}>Home</a>
        <a onClick={() => navigate("/shop")}>Shop</a>

        {currentuser ? (
          <div className=" flex flex-col gap-7">
            <a>Orders</a>
            <a onClick={signOutHandler}>Sign Out</a>
          </div>
        ) : (
          <GoogleButton onClick={googleSignInHandler} />
        )}
      </div>
      ;
    </div>
  );
};

export default MobileNav;
