import React, { useState } from "react";
import OrderComponent from "../components/OrderComponent";
import OrderForm from "../components/OrderForm";

function OrderPage() {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };
  return (
    <>
      {show ? (
        <OrderForm cancel={showHandler} />
      ) : (
        <div className="d-flex justify-content-center align-items-center my-4">
          <button className="btn btn-dark w-25" onClick={showHandler}>
            Add New Order
          </button>
        </div>
      )}

      <OrderComponent />
    </>
  );
}

export default OrderPage;
