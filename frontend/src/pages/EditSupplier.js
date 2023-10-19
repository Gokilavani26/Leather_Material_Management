import React, { useEffect, useState } from "react";
import {
  getSupplierById,
  updateSupplier,
} from "../helpers/supplier-api-functions";
import { useLocation, useNavigate } from "react-router-dom";

function EditSupplier() {
  const navigate = useNavigate();
  const loc = useLocation();

  const id = loc.state;
  const [supplier, setSupplier] = useState({
    supplierName: "",
    supplierphoneNumber: "",
    supplierCompany: "",
    supplierPay: "",
   
  });

  useEffect(() => {
    getSupplierById(id).then((res) => {
      setSupplier({
        supplierName: res.supplier.supplierName,
        supplierphoneNumber: res.supplier.supplierphoneNumber,
        supplierCompany: res.supplier.supplierCompany,
        supplierPay: res.supplier.supplierPay,
       
      });
    });
  }, [id]);

  const supplierNameHandler = (e) => {
    setSupplier({
      ...supplier,
      supplierName: e.target.value,
    });
  };
  const supplierphoneNumberHandler = (e) => {
    setSupplier({
      ...supplier,
      supplierphoneNumber: e.target.value,
    });
  };
    const supplierCompanyHandler = (e) => {
      setSupplier({
        ...supplier,
        supplierCompany: e.target.value,
      });
    };
  
  const supplierPayHandler = (e) => {
    setSupplier({
      ...supplier,
      supplierPay: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateSupplier(id, supplier).then((res) => {
      console.log(res);
    });

    navigate("/supplier");
  };
  return (
    <>
      <div className="container w-50">
        <form onSubmit={submitHandler}>
          <div className="my-2">
            <label className="form-label">Supplier Name</label>
            <input
              type="text"
              value={supplier.supplierName}
              onChange={supplierNameHandler}
              className="form-control"
            />
          </div>
          <div className="my-2">
            <label className="form-label">Supplier Phone Number</label>
            <input
              type="text"
              value={supplier.supplierphoneNumber}
              onChange={supplierphoneNumberHandler}
              className="form-control"
            />
          </div>
          
          <div className="my-2">
            <label className="form-label">Supplier Company Name</label>
            <input
              type="text"
              value={supplier.supplierCompany}
              onChange={supplierCompanyHandler}
              className="form-control"
            />
          </div>
          <div className="my-2">
            <label className="form-label">Supplier Pay</label>
            <input
              type="number"
              value={supplier.supplierPay}
              onChange={supplierPayHandler}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-dark w-25">
            Edit Supplier
          </button>
          <button
            onClick={() => navigate("/supplier")}
            className="btn btn-danger mx-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default EditSupplier ;
