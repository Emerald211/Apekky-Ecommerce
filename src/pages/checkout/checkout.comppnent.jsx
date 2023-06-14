import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  selectCartItems,
  selectCartTotal,
  selectDeliveryFee,
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
import { setDeliveryFee } from "../../store/cart/cart.action";
import emailjs from "emailjs-com";
import PaymentForn from "../../components/payment-form/payment-form.component";

const Checkout = () => {
  const cartItem = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentuser = useSelector(selectCurrentUser);

  emailjs.init("mESjxZ_og4PkWRGaA");

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [country, setCountry] = useState("");
  const [submited, setSubmitted] = useState(false);

  // eslint-disable-next-line no-undef
  console.log(import.meta.env.VITE_DEV_TOKEN_MECHANT_ID);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const { register, handleSubmit, res } = useForm();

  const onSubmitAction = async (data) => {
    console.log("___FORM_DATA___,", data);

    setFormData(data);

    dispatch(setDeliveryFee(3));
    setSubmitted(true);
  };

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
            <form
              onSubmit={handleSubmit(onSubmitAction)}
              className=" flex gap-4 flex-col mb-24"
              action=""
            >
              <input
                className=" lg:w-[700px] outline-none px-3 py-2  border border-main"
                type="text"
                {...register("address")}
                placeholder="Enter Address to deliver to"
              />
              <select
                onClick={handleCountryChange}
                className="border border-main px-3 py-2"
                name=""
                {...register("country")}
                id=""
              >
                <option>Select COUNTRY</option>
                <option value="UK">UK</option>
                <option value="OTHER COUNTRIES">OTHER COUNTRIES</option>
              </select>
              <select
                onClick={handleChange}
                className="border border-main px-3 py-2"
                name=""
                {...register("deliverytime")}
                id=""
              >
                <option>Select Delivery Time</option>
                {country === "UK" && (
                  <option value="Next Working Day">Next Working Day</option>
                )}

                <option value="Between 14 Days">Between 14 Days</option>
              </select>
              {selectedValue === "Next Working Day" && (
                <p className=" text-sm flex items-center text-red-500">
                  *This costs <BsCurrencyPound /> 3 *
                </p>
              )}

              <Button buttonType="inverted">
                {submited ? "PROCEED TO PAYMENT" : "SUBMIT"}
              </Button>
            </form>
            <h1 className=" mb-4">Payment Method</h1>
            {/* 
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
                        gateway: "braintree",
                        "braintree:apiVersion": "v1",
                        "braintree:sdkVersion": "braintree.client.3.94.0",
                        "braintree:merchantId": import.meta.env.VITE_DEV_TOKEN_BRAINTREE_MECHANT_ID,
                        "braintree:clientKey": import.meta.env.VITE_DEV_TOKEN_BRAINTREE_CLIENT_KEY
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: import.meta.env.VITE_DEV_TOKEN_MECHANT_ID,
                  merchantName: "APEKKYSTORE",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: `${cartTotal}`,
                  currencyCode: "GBP",
                  countryCode: "GB",
                },
                shippingAddressRequired: true,
                callbackIntents: ["PAYMENT_AUTHORIZATION"],
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
              }}
              onPaymentAuthorized={(paymentData) => {
                console.log(paymentData, "transaction successful");

                const orderDetails = paymentData.shippingAddress;

                const products = cartItem;

                const productDetails = products.map((product) => {
                  return `
              Product: ${product.name}
              Image URL: ${product.imageUrl}
              Price: ${product.price} Euros
              Quantity: ${product.quantity}
            `;
                });

                const formattedProductDetails = productDetails.join("\n");

                const sendPaymentConfirmationEmail = () => {
                  const templateParams = {
                    name: orderDetails.name,
                    // order_id: completedOrder.id,
                    amount: cartTotal,
                    paymentMethod: "GOOGLE PAY",
                    items: `${formattedProductDetails}`,
                  };

                  emailjs
                    .send("service_x1xb88n", "template_vswwvhp", templateParams)
                    .then((response) => {
                      console.log(
                        "Payment confirmation email sent to the customer:",
                        response.status,
                        response.text
                      );
                    })
                    .catch((error) => {
                      console.error(
                        "Error sending payment confirmation email to the customer:",
                        error
                      );
                    });
                };

                sendPaymentConfirmationEmail();

                // Assuming you have configured EmailJS and initialized it with your User ID

                // Function to send the payment confirmation email to the seller

                const sendPaymentNotificationToSeller = () => {
                  const templateParams = {
                    // order_id: completedOrder.id,
                    amount: `${cartTotal} Pounds`,
                    customerName: orderDetails.name,
                    customerEmail: orderDetails.phoneNumber,
                    paymentMethod: "GOOGLEPAY",
                    items: `${formattedProductDetails}`,
                    address: orderDetails.address1,
                    city: orderDetails.locality,
                    country: orderDetails.countryCode,
                    deliverytime: formData.deliverytime,
                  };

                  emailjs
                    .send("service_x1xb88n", "template_csfo85y", templateParams)
                    .then((response) => {
                      console.log(
                        "Payment notification email sent to the seller:",
                        response.status,
                        response.text
                      );
                    })
                    .catch((error) => {
                      console.error(
                        "Error sending payment notification email to the seller:",
                        error
                      );
                    });
                };

                // Usage example
                sendPaymentNotificationToSeller();

               
              }}
              existingPaymentMethodRequired="false"
            />

            <Paypal formData={formData} /> */}

            <PaymentForn />
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
