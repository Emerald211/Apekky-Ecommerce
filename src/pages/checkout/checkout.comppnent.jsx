import { useSelector } from "react-redux";
import { useState } from "react";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";
import { BsCurrencyEuro, BsCurrencyPound } from "react-icons/bs";
// import { useState } from "react";
import Paypal from "../../components/paypal/paypal.component";
import GooglePayButton from "@google-pay/button-react";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useForm } from "react-hook-form";
import SignIn from "../../components/sign-in/sign-in.component";
import Button from "../../components/button/button.component";

const Checkout = () => {
  const cartItem = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentuser = useSelector(selectCurrentUser);

  const [formData, setFormData] = useState({})
  const [selectedValue, setSelectedValue] = useState("");
  const [submited, setSubmitted] = useState(false)
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const { register, handleSubmit } = useForm();

  const onSubmitAction = async (data) => {
    
    console.log("___FORM_DATA___,", data);

    setFormData(data)

    setSubmitted(true)
    
  };

  // const [checkout, setCheckout] = useState(false);

  return (
    <>
      {currentuser ? (
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

          <div className=" mt-24 flex justify-center text-black items-center flex-col font-serrat">
            <form onSubmit={handleSubmit(onSubmitAction)} className=" flex gap-4 flex-col mb-24" action="">
              <input
                className=" lg:w-[700px] outline-none px-3 py-2  border border-main"
                type="text"
                {...register('address')}
                placeholder="Enter Address to deliver to"
              />
              <select
                onClick={handleChange}
                className="border border-main px-3 py-2"
                name=""
                {...register('deliverytime')}
                id=""
              >
                <option>Select Delivery Time</option>
                <option value="Next Working Day">Next Working Day</option>

                <option value="Between 14 Days">Between 14 Days</option>
              </select>
              {selectedValue === "Next Working Day" && <p className=" text-sm flex items-center text-red-500">*This costs <BsCurrencyPound/> 3 *</p>}

              <Button buttonType="inverted">{ submited ? 'PROCEED TO PAYMENT' : 'SUBMIT' }</Button>
            </form>
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

            <Paypal formData = {formData} />
          </div>
        </div>
      ) : (
        <div>
          <SignIn />
        </div>
      )}
    </>
  );
};

export default Checkout;
