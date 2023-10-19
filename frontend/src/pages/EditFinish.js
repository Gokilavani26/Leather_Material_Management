import React, { useState, useEffect } from "react";
import { updateProduct, getProductById } from "../helpers/finished-api-functions";

import { useLocation, useNavigate } from "react-router-dom";
function EditFinish() {
  const loc = useLocation();
  const navigate = useNavigate();
  const id = loc.state;
  const [product, setProduct] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    productQuantity: "",
  });

  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct({
        productName: res.prod.productName,
        productCategory: res.prod.productCategory,
        productQuantity: res.prod.productQuantity,
        productPrice: res.prod.productPrice,
      });
    });
  }, [id]);
  const productQuantityHandler = (event) => {
    setProduct({
      ...product,
      productQuantity: event.target.value,
    });
  };
  const productPriceHandler = (event) => {
    setProduct({
      ...product,
      productPrice: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct(id, product).then((res) => {
      console.log(res);
    });

    navigate("/finish");
  };
  return (
    <>
      <div className="container m-4">
        <form onSubmit={submitHandler}>
          <div className="my-2">
            <label className="form-label">Cost</label>
            <input
              type="number"
              className="form-control w-50"
              onChange={productPriceHandler}
              value={product.productPrice}
            />
          </div>

          <div className="my-2">
            <label className="form-label">Quantity </label>
            <input
              type="number"
              className="form-control w-50"
              value={product.productQuantity}
              onChange={productQuantityHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary w-25">
            Update 
          </button>
          <button
            className="btn btn-danger w-25 mx-1"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default EditFinish;
