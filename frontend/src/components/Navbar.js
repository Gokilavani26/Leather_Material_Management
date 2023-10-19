import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../hooks/authContext";

function Navbar() {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
      <div className="container">
        
        <Link className="navbar-brand fs-3" to="/" >
          
          LOYAL SMALL SCALE INDUSTRY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end py-3" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {user ? (
              <>
                <Link className="nav-link text-light" to="/raw">
                  Stocks
                </Link>
                <Link className="nav-link text-light" to="/orders">
                  Sales
                </Link>
                <Link className="nav-link text-light" to="/supplier">
                 Supplier
                </Link>

                <Link className="nav-link text-light" to="/payment">
                Payment
                </Link>
                <Link className="nav-link text-light" to="/report">
                  Report
                </Link>
              </>
            ) : null}

            {!user ? (
              <>
                <Link to="/signup" className="nav-link text-light">
                  Sign Up
                </Link>
                
                <Link to="/login" className="nav-link text-light">
                  Login
                </Link>
              </>
            ) : null}
          </div>

          {user ? (
            <button
              className="btn btn-danger ml-5"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
