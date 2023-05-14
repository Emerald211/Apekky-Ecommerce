import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";
import { BsCurrencyEuro } from "react-icons/bs";
// import { useState } from "react";
import Paypal from "../../components/paypal/paypal.component";

const Checkout = () => {
  const cartItem = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // const [checkout, setCheckout] = useState(false);

  return (
    <div className=" checkout-container font-serrat">
      <div className=" checkout-header">
        <div className=" header-block">
          <span>Product</span>
        </div>

        <div className=" header-block">
          <span>Description</span>
        </div>

        <div className=" header-block">
          <span>Quantity</span>
        </div>

        <div className=" header-block">
          <span>Price</span>
        </div>

        <div className=" header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItem.map((eachCartitem) => {
        const { id } = eachCartitem;
        return <CheckoutItem key={id} cartitem={eachCartitem} />;
      })}

      <span className="total font-serrat flex items-center">
        Total: <BsCurrencyEuro />
        {cartTotal}
      </span>

      <div className=" mt-24 font-serrat">
        <h1>Payment Method</h1>

        <Paypal />
      </div>
    </div>
  );
};

export default Checkout;
