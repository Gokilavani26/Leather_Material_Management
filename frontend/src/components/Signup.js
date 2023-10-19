import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { authContext } from "../hooks/authContext";

function Signup() {
  const { dispatch } = useContext(authContext);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const special = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]"];
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role:""
  });

  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const usernameHandler = (event) => {
    setNewUser({ ...newUser, username: event.target.value });
  };

  const emailHandler = (event) => {
    setNewUser({ ...newUser, email: event.target.value });
  };

  const roleHandler = (event) => {
    setNewUser({ ...newUser, role: event.target.value });
  };

  const passwordHandler = (event) => {
    setNewUser({ ...newUser, password: event.target.value });
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (
      newUser.email.length <= 0 ||
      newUser.username.length <= 0 ||
      newUser.password.length <= 0 ||
      newUser.role.length <= 0
    ) {
      setMessage("All Fields Must Be Filled");
      setDisplay(true);
      return;
    }

    if (
      !newUser.password.split("").some((char) => numbers.includes(Number(char))) ||
      !newUser.password.split("").some((char) => special.includes(char))
    ) {
      setMessage("Weak Password");
      setDisplay(true);
      return;
    }
    if (newUser.password !== confirmPassword) {
      setMessage("Password Does Not Match");
      setDisplay(true);
      return;
    }

    setSuccessMessage("Registration Successful");

    console.log(newUser);

    axios
      .post("http://localhost:7000/signup", newUser)
      .then((res) => {
        console.log(`response from server : ${res.data}`);
        if (res) {
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({ type: "LOGIN", payload: res.data });
          setRegister(true);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      });

    setDisplay(false);
    setNewUser({
      username: "",
      email: "",
      password: "",
      role: ""
    });
    setConfirmPassword("");
  };
  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">SIGN UP</h3>
      <div className="row justify-content-center "  >
        <div className="col-md-6">
          <form onSubmit={submitHandler} className="border p-5 rounded" style={{ backgroundColor: "#DADBDD" }}>
            <div className="form-group mb-3">
              <input 
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={usernameHandler}
                className="form-control p-2"
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={emailHandler}
                className="form-control  p-2"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Role"
                value={newUser.role}
                onChange={roleHandler}
                className="form-control  p-2"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={passwordHandler}
                className="form-control  p-2"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="Confirm Password  "
                value={confirmPassword}
                className="form-control p-2"
                onChange={confirmPasswordHandler}
              />
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-success w-50">Submit</button>
            </div>
            {error ? (
              <p className="mt-3 text-danger text-center">{error}</p>
            ) : null}
          </form>
          {display ? (
            <div className="mt-4 alert alert-danger text-center">{message}</div>
          ) : null}
          {register ? (
            <div className="mt-4 alert alert-success text-center">
              {successMessage}
              <br />
              You Can Login With Your Email And Password
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Signup;
