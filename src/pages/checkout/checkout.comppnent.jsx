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
import GooglePayButton from "@google-pay/button-react";
import { selectCurrentUser } from "../../store/user/user.selector";
import SignIn from "../../components/sign-in/sign-in.component";

const Checkout = () => {
  const cartItem = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentuser = useSelector(selectCurrentUser)

  // const [checkout, setCheckout] = useState(false);

  return (
    <>
      { currentuser ?      <div className=" checkout-container font-serrat">
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

      <div className=" mt-24 flex justify-center items-center flex-col font-serrat">
        <h1 className=" mb-4">Payment Method</h1>

        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: "100.00",
              currencyCode: "USD",
              countryCode: "US",
            },
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
         />

        <Paypal />
      </div>
      </div> :
        <div>
         <SignIn />
        </div>
    
    
    }

    </>

  );
};

export default Checkout;
