import { useDispatch, useSelector } from "react-redux";
import cart from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.css"
import { selectCartItems, selectDropDown } from "../../store/cart/cart.selector";
// import { useEffect } from "react";
import { setDropDown } from "../../store/cart/cart.action";

const CartIcon = () => {

  const cartItem = useSelector(selectCartItems)
  const dropdown = useSelector(selectDropDown)

  const dispatch = useDispatch()

  const setDropdownHandler = () => {
     dispatch(setDropDown(!dropdown))
  }

  

  // useEffect(() => {}, [cartItem])
  return (
    <div onClick={setDropdownHandler}  className=" cart-icon-container">
      <img src={cart} className=" shopping-icon" />
      <span className=" item-count">{cartItem.length }</span>
    </div>
  );
};

export default CartIcon;
