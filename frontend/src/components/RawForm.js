import React, { useState } from "react";
import { addMaterial } from "../helpers/raw-api-function";
import { useNavigate } from "react-router-dom";

function RawForm() {
  const navigate = useNavigate();
  const [material, setMaterial] = useState({
    materialName: "",
    supplierName: "",
    materialCost: "",
    materialQuantity: ""
  });

  const [error, setError] = useState(false);
  const supplierNameHandler = (event) => {
    setMaterial({
      ...material,
      supplierName: event.target.value,
    });
  };

  const materialNameHandler = (event) => {
    setMaterial({
      ...material,
      materialName: event.target.value,
    });
  };
  const materialCostHandler = (event) => {
    setMaterial({
      ...material,
      materialCost: event.target.value,
    });
  };
  const materialQuantityHandler = (event) => {
    setMaterial({
      ...material,
      materialQuantity: event.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
  
    if (
      material.materialName.length === 0 ||
      material.supplierName.length === 0 ||
      material.materialCost.length === 0 ||
      material.materialQuantity.length === 0
    ) {
      setError("Fields Cannot Be Empty");
      return;
    }
  
    console.log(material);
    addMaterial(material)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  
    setMaterial({
      materialName: "",
      supplierName: "",
      materialCost: "",
      materialQuantity: "",
    });
    navigate("/raw"); 
  };
  

  return (
    <div className="container my-4">
      <form onSubmit={submitHandler}>
        <div className="my-2">
        <label className="form-label">Material Name</label>
          <select
            className="form-control w-50"
            onChange={materialNameHandler}
            value={material.materialName}
          >
            <option value="">Select Material Name</option>
            <option value="Leather">Leather</option>
            <option value="Sole">Sole</option>
            <option value="Gum">Gum</option>
            <option value="Stiffner">Stiffner</option>
            <option value="Rexin">Rexin</option>
            <option value="Laces">Laces</option>
          </select>
        </div>

        <div className="my-2">
          <label className="form-label">Supplier Name</label>
          <input
           type="text"
            className="form-control w-50"
            onChange={supplierNameHandler}
            value={material.supplierName}
          />
        </div>

        <div className="my-2">
          <label className="form-label">Material Cost</label>
          <input
            type="number"
            className="form-control w-50"
            onChange={materialCostHandler}
            value={material.materialCost}
          />
        </div>

        <div className="my-2">
          <label className="form-label">Material Quantity(in Units)</label>
          <input
            type="number"
            className="form-control w-50"
            value={material.materialQuantity}
            onChange={materialQuantityHandler}
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

export default RawForm;