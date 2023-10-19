import React, { useState } from "react";
import { addSupplier} from "../helpers/supplier-api-functions";
function SupplierForm(props) {
  const [supplier, setSupplier] = useState({
    supplierName: "",
    supplierphoneNumber: "",
    supplierCompany: "",
    supplierPay: "",
  });

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

    // if (
    //   supplier.phoneNumber.length !== 10 ||
    //   supplier.supplierName.length === 0 ||
    //   supplier.orderNumber.length === 0 ||
    //   supplier.orderDate.length === 0
    // ) {
    //   setError("Fields Cannot Be Empty");
    //   return;
    // }

    addSupplier(supplier).then((res) => {
      console.log(res);
    });
    props.cancel();
    setSupplier({
      supplierName: "",
      supplierphoneNumber: "",
      supplierCompany: "",
      supplierSalary: "",
    });
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
              type="number"
              value={supplier.supplierphoneNumber}
              onChange={supplierphoneNumberHandler}
              className="form-control"
            />
          </div>
          <div className="my-2">
            <label className="form-label">Supplier Company</label>
            <input
              type="text"
              value={supplier.supplierCompany}
              onChange={supplierCompanyHandler}
              className="form-control"
            />
          </div>
          <div className="my-2">
            <label className="form-label">Supplier Balance</label>
            <input
              type="number"
              value={supplier.supplierPay}
              onChange={supplierPayHandler}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-dark w-25">
            Add Supplier
          </button>
          <button
            onClick={() => props.cancel()}
            className="btn btn-danger mx-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default SupplierForm;
