import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { stripePromise } from "../../utils/stripe/stripe.utils";

const PaymentForn = () => {
  const total = useSelector(selectCartTotal);
  const cartItem = useSelector(selectCartItems);
  const currentuser = useSelector(selectCurrentUser);


  const paymentHandler = async (e) => {
    e.preventDefault();
  
    try {
        const stripe = await stripePromise;
  
        // Call your serverless function or API endpoint to create a payment intent
        const response = await fetch('/netlify/functions/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 1000 }), // Provide the desired payment amount
        });
  
        const { clientSecret } = await response.json();
  
        // Confirm the payment on the client-side using the clientSecret
        const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: stripe.elements.getElement('card'),
            // Additional payment method options if necessary
          },
        });
  
        if (error) {
          console.log(error);
        } else {
          console.log('Payment succeeded!');
        }
      } catch (error) {
        console.log(error);
      }
  
      

  };

  return (
    <form onSubmit={paymentHandler}>
      <CardElement />
      <Button>PAY</Button>
    </form>
  );
};

export default PaymentForn;
