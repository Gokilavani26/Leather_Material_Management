import React, { useState } from "react";
import SupplierComponent from "../components/SupplierComponent";
import SupplierForm from "../components/SupplierForm";

// import SupplierPayment from "../components/SupplierPayment";

function SupplierPage() {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };
  return (
    <>
      {show ? (
        <SupplierForm cancel={showHandler} />
      ) : (
        <div className="d-flex justify-content-center align-items-center my-4">
          <button className="btn btn-dark w-25" onClick={showHandler}>
            Add Supplier
          </button>
        </div>
      )}

      <SupplierComponent />
      {/* <SupplierPayment /> */}


    </>
  );
}

export default SupplierPage;
