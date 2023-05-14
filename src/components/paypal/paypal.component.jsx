import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.component";

import { customOnAUthStateChange } from "../../utils/firebase/firebase.component";

export default function Paypal() {
  const paypal = useRef();

  const total = useSelector(selectCartTotal);
  const cartItem = useSelector(selectCartItems);
  // const user = useSelector(selectCurrentUser)

  useEffect(() => {
    window.paypal
      .Buttons({
        // eslint-disable-next-line no-unused-vars
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Total Amount",
                amount: {
                  currency_code: "EUR",
                  value: total,
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
            status: order.status,
            time: order.create_time,
            payerid: order.payer.payer_id,
          };

          console.log(completedOrder);

          console.log("bgghghg");

          alert("complered")

          const addOrders = () => {
            const unsubscribe = customOnAUthStateChange((user) => {
              console.log(user);

              createUserDocumentFromAuth(user, { orders: completedOrder});
            });

            console.log("jsjdj");
            alert("hdhdh")

            return unsubscribe;
          };

          addOrders();
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
