import { useEffect, useState } from "react";
import {
  getOrdersFromUserDocument,
  customOnAUthStateChange,
} from "../../utils/firebase/firebase.component";
import { BsCheckCircle } from "react-icons/bs";


const OrderPage = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const unsubscribe = customOnAUthStateChange((user) => {
      const getOrders = async () => {
        const data = await getOrdersFromUserDocument(user);

        console.log(data);

        setOrders(data);
      };

      getOrders();
    });

    console.log(orders);

    return unsubscribe;
  }, []);
  return (
    <div>
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
            <span>Status</span>
          </div>
        </div>

        {  orders ? orders.map((eachorders) => {
          return (
            <div key={eachorders.id} className=" checkout-header">

              <div className=" header-block">
                <div className=" w-[35%] ">
                  <img className=" w-[100%]" src={eachorders.imageUrl} alt={`${name}`} />
                </div>
              </div>

              <div className=" header-block">
                <span className="">{eachorders.name}</span>
              </div>

              <div className=" header-block ml-10">
                <span className=""> {eachorders.quantity}</span>
              </div>

              <div className=" header-block">
                <span className="price">{eachorders.price}</span>
              </div>

              <div className=" header-block ">
                <span className=" flex ">
                          <h1 className=" flex items-center gap-1">Completed <BsCheckCircle /></h1>
                </span>
              </div>
            </div>
          );
        }) : <div className=" mt-5"> <h1>There is no completed order</h1></div>}
      </div>
    </div>
  );
};

export default OrderPage;
