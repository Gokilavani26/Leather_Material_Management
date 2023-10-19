// SupplierComponent.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteSupplierById } from "../helpers/supplier-api-functions";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate

function SupplierComponent() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/supplier").then((res) => {
      setSupplier(res.data.supplier);
    });
  }, [supplier]);

  const deleteHandler = (id) => {
    deleteSupplierById(id).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      {supplier.length === 0 ? null : (
        <div className="container my-2">
          <table className="table table-striped-columns ">
            <thead>
              <tr className="border-dark my-2 text-center">
                <th>Supplier Name</th>
                <th>Supplier Phone Number</th>
                <th>Supplier Company Name</th>
                <th>Amount Payable</th>
                <th></th>
                <th>Option</th>
                <th></th> {/* Add a new table header for Payment */}
              </tr>
            </thead>

            <tbody>
              {supplier.map((supplier) => {
                return (
                  <tr key={supplier._id} className="border my-2 text-center">
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.supplierphoneNumber}</td>
                    <td>{supplier.supplierCompany}</td>
                    <td>{supplier.supplierPay}</td>
                    
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHandler(supplier._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                
                      <td>
                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          navigate("/edit/supplier", {
                            state:supplier._id,
                          })
                        }
                      >
                        Edit
                      </button>
                    </td>
                      
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          navigate("/payment",  {
                            state:supplier._id,
                          });
                        }}
                      >
                        Pay
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

export default SupplierComponent;
