import React, { useState } from "react";
import { addProduct } from "../helpers/finished-api-functions";
import { useNavigate } from "react-router-dom";

function FinishedForm() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productCategory: "",
    productQuantity: "",
    productPrice: ""
  });

  const [error, setError] = useState(false);
  const productNameHandler = (event) => {
    setProduct({
      ...product,
      productName: event.target.value,
    });
  };

  const productCategoryHandler = (event) => {
    setProduct({
      ...product,
      productCategory: event.target.value,
    });
  };

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

    
  if (
    product.productName.length === 0 ||
    product.productCategory.length === 0 ||
    product.productQuantity.length === 0 ||
    product.productPrice.length === 0
  ) {
    setError("Fields Cannot Be Empty");
    return;
  }

  console.log(product);

    addProduct(product)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

      setProduct({
      productName: "",
      productCategory: "",
      productQuantity: "",
      productPrice: "",
    });
    navigate("/finish"); 
  };

  return (
    <div className="container my-4">
        <form onSubmit={submitHandler}>
          <div className="my-2">
          <label className="form-label">Product Name</label>
          <select
            className="form-control w-50"
            onChange={productNameHandler}
            value={product.productName}
          >
            <option value="">Select Product Name</option>
            <option value="Shoe">Shoe</option>
            <option value="Belt">Belt</option>
            <option value="Hat">Hat</option>
            {/* Add more options as needed */}
          </select>
              
          </div>

        <div className="my-2">
        <label className="form-label">Category</label>
          <select
            className="form-control w-50"
            onChange={productCategoryHandler}
            value={product.productCategory}
          >
            <option value="">Select Category</option>
            <option value="Shoe">Shoe</option>
            <option value="Belt">Belt</option>
            <option value="Hat">Hat</option>
          
          </select>
        </div>

        <div className="my-2">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control w-50"
            onChange={productPriceHandler}
            value={product.productPrice}
          />
        </div>

        <div className="my-2">
          <label className="form-label">Quantity(in Units)</label>
          <input
            type="number"
            className="form-control w-50"
            value={product.productQuantity}
            onChange={productQuantityHandler}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
      {error ? (
        <div>
          <p className="text-danger">Fields Cannot Be Empty</p>
        </div>
      ) : null}
    </div>
  );
}

export default FinishedForm;
