import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.component";
import { customOnAUthStateChange } from "../../utils/firebase/firebase.component";
import emailjs from "emailjs-com";

export default function Paypal() {
  emailjs.init("mESjxZ_og4PkWRGaA");

  const paypal = useRef();

  const total = useSelector(selectCartTotal);
  const cartItem = useSelector(selectCartItems);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Total Amount",
                amount: {
                  currency_code: "EUR",
                  value: Math.floor(total),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          const completedOrder = {
            id: order.id,
            email: order.payer.email_address,
            name: `${order.payer.name.given_name} ${order.payer.name.surname}`,
            items: cartItem,
            amount: `${total} Euros`,
            status: order.status,
            time: order.create_time,
            payerid: order.payer.payer_id,
          };

          console.log(completedOrder);

          const products = completedOrder.items;

          const productDetails = products.map((product) => {
            return `
              Product: ${product.name}
              Image URL: ${product.imageUrl}
              Price: ${product.price} Euros
              Quantity: ${product.quantity}
            `;
          });

          const formattedProductDetails = productDetails.join("\n");

          // To buyer

          const sendPaymentConfirmationEmail = () => {
            const templateParams = {
              name: completedOrder.name,
              order_id: completedOrder.id,
              amount: completedOrder.amount,
              paymentMethod: "PAYPAL",
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
              order_id: completedOrder.id,
              amount: completedOrder.amount,
              customerName: completedOrder.name,
              customerEmail: completedOrder.email,
              paymentMethod: "PAYPAL",
              items: `${formattedProductDetails}`,
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

          alert("Order completed");

          const unsubscribe = customOnAUthStateChange((user) => {
            if (user) {
              console.log("User is authenticated:", user);
              // Call the createUserDocumentFromAuth function
              createUserDocumentFromAuth(user, { orders: [completedOrder] })
                .then(() => console.log("User document created successfully"))
                .catch((error) =>
                  console.error("Error creating user document:", error)
                );
            } else {
              console.log("User is not authenticated");
            }
          });

          return () => unsubscribe();
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [total, cartItem]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
