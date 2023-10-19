import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMaterialById, updateMaterial } from "../helpers/raw-api-function";

function EditMaterial() {
  const loc = useLocation();
  const navigate = useNavigate();
  const id = loc.state;
  const [material, setMaterial] = useState({
    materialName: "",
    supplierName: "",
    materialCost: "",
    materialQuantity: "",
  });

  useEffect(() => {
    getMaterialById(id).then((res) => {
      console.log(res);
  setMaterial({
        materialName: res.material.materialName,
        supplierName: res.material.supplierName,
        materialCost: res.material.materialCost,
        materialQuantity: res.material.materialQuantity,
      });
    });
  }, [id]);

  const materialQuantityHandler = (event) => {
    setMaterial({
      ...material,
      materialQuantity: event.target.value,
    });
  };
  const materialCostHandler = (event) => {
    setMaterial({
      ...material,
      materialCost: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateMaterial(id, material).then((res) => {
      console.log(res);
    });
 
    navigate("/raw");
  };

  return (
    <>
      <div className="container my-4">
        <form onSubmit={submitHandler}>
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
            <label className="form-label">Material Quantity</label>
            <input
              type="number"
              className="form-control w-50"
             
              onChange={materialQuantityHandler}
              value={material.materialQuantity}
            />
          </div>

          <button type="submit" className="btn btn-primary w-25">
            Edit
          </button>
          <button
            onClick={() => navigate("/raw")}
            className="btn btn-danger mx-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default EditMaterial;
