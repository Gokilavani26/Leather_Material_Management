import React, { useState } from "react";
import RawForm from "./RawForm";
import FinishedForm from "./FinishedForm";

function ProductForm(props) {
  const [product, setProduct] = useState("");

  const productCategoryHandler = (event) => {
    setProduct(event.target.value);
  };

  return (
    <div className="container p-4">
      <div className="my-1 mx-2">
        <label className="form-label">Product Category</label>
        <select
          type="text"
          placeholder="Name"
          className="form-select w-25"
          value={product.productCategory}
          onChange={productCategoryHandler}
        >
          <option value="-">Select Category</option>
          <option value="raw">Raw Material</option>
          <option value="finish">Finished Goods</option>
        </select>
      </div>

      {product === "raw" ? <RawForm /> : null}
      {product === "finish" ? <FinishedForm /> : null}
  <br />
      <div className="my-1 mx-2 w-100">
        <button onClick={() => props.cancel()} className="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProductForm;
