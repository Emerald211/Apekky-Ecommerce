import { BsCurrencyEuro } from "react-icons/bs";
import "./cart-item.styles.scss";

// import React from "react";

// eslint-disable-next-line react/prop-types
const CartItem = ({ cartItem }) => {
  // eslint-disable-next-line react/prop-types
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className=" cart-item-container font-serrat mb-12">
      <img src={imageUrl} alt={`${name}`} />

      <div className=" item-details">
        <span className="name">{name}</span>
        <span className="price flex items-center">
          {quantity} x <BsCurrencyEuro />{price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
