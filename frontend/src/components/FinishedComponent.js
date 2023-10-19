import axios from "axios";

import React, { useState, useEffect } from "react";
import { deleteProductById } from "../helpers/finished-api-functions";

import { useNavigate } from "react-router-dom";
function FinishedComponent() {
  const [finishedProducts, setFinishedProducts] = useState([]);

  const navigate = useNavigate();

  const deleteHandler = (id) => {
    deleteProductById(id).then((response) => console.log(response));
    window.location.reload(); 
  };

  useEffect(() => {
    axios.get("http://localhost:7000/finish").then((response) => {
      setFinishedProducts(response.data.product);
    });
  }, []);



  return (
    <>
      {finishedProducts.length === 0 ? null : (
       <div className="my-4 text-center">
          <span className="mb-4 fs-3 font-weight-bold"> Finished Goods Stocks</span><br></br>
          <table className="table table-striped-columns text-center  mt-4">
            <thead>
              <tr className="border-dark p-2">
                <th>Product Name</th>
                <th>Category</th>
                <th>Product Cost</th>
                <th>Product Quantity</th>
                <th colSpan={2} className="">
                  Options
                </th>
              </tr>
            </thead>

            <tbody>
              {finishedProducts.map((product) => {
                return (
                  <tr key={product._id} className="border my-3">
                    <td>{product.productName}</td>
                    <td>{product.productCategory}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.productQuantity}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHandler(product._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          navigate("/edit/finish", {
                            state: product._id,
                          })
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default FinishedComponent;
