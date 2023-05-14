
import { useDispatch, useSelector } from "react-redux";
import "./checkout-item.styles.scss";
import { addItemToCart, removeItemFromCart, deleteFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

// eslint-disable-next-line react/prop-types
const CheckoutItem = ({ cartitem }) => {
  // eslint-disable-next-line react/prop-types
  const { name, imageUrl, price, quantity } = cartitem;


  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItems);

  const IncrementHandler = () => dispatch(addItemToCart(cartItem, cartitem));
  const DecrementHandler = () =>
    dispatch(removeItemFromCart(cartItem, cartitem));

  const deleteFromCartHandler = () =>
    dispatch(deleteFromCart(cartItem, cartitem));
  return (
    <div className=" checkout-item-container">
      <div className=" image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={DecrementHandler} className="arrow">
          &#10094;
        </div>
        <span className="value"> {quantity}</span>

        <div onClick={IncrementHandler} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div onClick={deleteFromCartHandler} className=" remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
