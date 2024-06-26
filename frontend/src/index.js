import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthContextprovider } from "./hooks/authContext";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextprovider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextprovider>
);
