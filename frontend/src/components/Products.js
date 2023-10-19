import { React } from "react";
import { Link, Route, Routes } from "react-router-dom";

import FinishedComponent from "./FinishedComponent";
import MaterialComponent from "./MaterialComponent";

function Products() {
  return (
    <>
      <div className="container p-2 my-4"><br></br>
        <div className="container d-flex justify-content-center align-items-center mb-4 mx-4 my-4">

          <Link className="btn btn-dark w-25 mx-4" to={"/raw"}>
            Raw Material
          </Link>

          <Link className="btn btn-dark w-25 mx-4" to={"/finish"}>
            Finished Goods
          </Link>

        </div>

        <div>
          <Routes>
            <Route path="/raw" element={<MaterialComponent />}></Route>
            <Route path="/finish" element={<FinishedComponent />}></Route>
          </Routes>
        </div>  
      </div>
    </>
  );
}

export default Products;
