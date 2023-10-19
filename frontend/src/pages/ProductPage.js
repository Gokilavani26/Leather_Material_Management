import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import Products from "../components/Products";

function ProductPage() {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };
  return (
    <>
      {show ? (
        <ProductForm cancel={showHandler} />
      ) : (
        <div className="d-flex justify-content-center align-items-center my-4">
          <button className="btn btn-dark w-25 " onClick={showHandler}>
            Add Stock
          </button>
        </div>
      )} 

      <Products />
    </>
  );
}

export default ProductPage;
