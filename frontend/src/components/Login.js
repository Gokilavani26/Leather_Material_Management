import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../hooks/authContext";
import { TextField } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(authContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7000/login", {
        email,
        password,
      });

      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
        dispatch({ type: "LOGIN", payload: response.data });
        setError("");
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">LOGIN</h3>
      <div className="d-flex justify-content-center align-items-center">
        <div className="border p-5 rounded" style={{ maxWidth: "400px", width: "100%", backgroundColor: "#DADBDD"}}>
        
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="mb-3">
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                autoComplete="off"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div>
              {error ? (
                <p className="text-danger lead">
                  <i>{error}</i>
                </p>
              ) : null}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success my-2 w-75">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            Don't Have An Account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
