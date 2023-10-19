import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMaterial } from "../helpers/raw-api-function";
function MaterialComponent() {
  const navigate = useNavigate();
  const [rawMaterial, setRawMaterial] = useState([]);

  const deleteHandler = (id) => {
    deleteMaterial(id).then((response) => console.log(response));
    window.location.reload(); 
  };

  useEffect(() => {
    axios.get("http://localhost:7000/raw").then((response) => {
      setRawMaterial(response.data.material);
    });
  }, []);

  return (
    <>
      {rawMaterial.length === 0 ? null : (
        <div className="my-4 text-center">
         <span className="mb-4 fs-3 font-weight-bold">  Raw Material Stocks</span><br></br>
          <table className="table table-striped-columns text-center mt-4">
           
            <thead>
              <tr className="border-dark p-2">
                <th>Material Name</th>
                <th>Supplier Name</th>
                <th>Material Cost</th>
                <th>Material Quantity</th>
                <th colSpan={2} className="">
                  Options
                </th>
              </tr>
            </thead>

            <tbody>
              {rawMaterial.map((material) => {
                return (
                  <tr key={material._id} className="border my-3">
                    <td>{material.materialName}</td>
                    <td>{material.supplierName} </td>
                    <td>Rs {material.materialCost}</td>
                    <td>{material.materialQuantity}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHandler(material._id);
                          
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          navigate("/edit/raw", {
                            state:material._id,
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

export default MaterialComponent;
