import { useState } from "react";
import "./navbar.styles.css"
import logo from "../../assets/logo.jpg";
import MobileNav from "../mobile-nav/mobile-nav.component";
import CartIcon from "../cart-icon/cart-icon.component";
import {
  SignInWithGooglePopup,
  customSignOut,
} from "../../utils/firebase/firebase.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectDropDown } from "../../store/cart/cart.selector";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
const Navbar = () => {
  const currentuser = useSelector(selectCurrentUser);

  const dropdown = useSelector(selectDropDown)

  const [showNav, setShowNav] = useState(false);

  const handleNav = () => {
    setShowNav(!showNav);
  };

  const googleSignInHandler = async () => {
    await SignInWithGooglePopup();
  };

  const signOutHandler = () => {
    customSignOut();
  };
  return (
    <nav
      style={{ color: "#FF01FD" }}
      className="bg-white border-gray-200 dark:bg-white shadow-lg"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src={logo} className="h-12 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-purp">
            Appeky Store
          </span>
        </a>

        <div className="mobile-cart">
          <CartIcon />
        </div>

        {dropdown && <CartDropDown />}

        <button
          onClick={handleNav}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4  rounded md:bg-transparent text-lg font-bold"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-lg font-bold  rounded   md:border-0 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent"
              >
                Shop
              </a>
            </li>

        
           

            {currentuser ? (
              <div className=" flex items-center">
                <li>
                  <a className="flex items-center py-2 pl-3 pr-4 text-lg font-bold  rounded   md:border-0 md:p-0  hover:px-4  ">
                    Orders <CartIcon />
                  </a>
                </li>

         
                <li>
                  <a
                    onClick={signOutHandler}
                    className="block ml-4 py-2 pl-3 pr-4 text-lg font-bold  rounded   md:border-0 md:p-0  dark:hover:bg-[#FF01FD] hover:bg-white hover:px-4 hover:text-white "
                  >
                    Sign Out
                  </a>
                </li>
              </div>
            ) : (
              <li>
                <a
                  onClick={googleSignInHandler}
                  className="block py-2 pl-3 pr-4 text-lg font-bold  rounded   md:border-0 md:p-0  dark:hover:bg-[#FF01FD] hover:bg-white hover:px-4 hover:text-white "
                >
                  Sign In
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      {showNav && <MobileNav set={handleNav} />}
    </nav>
  );
};

export default Navbar;
