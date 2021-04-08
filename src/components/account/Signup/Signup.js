import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { auth } from "../../../firebase";

const Signup = () => {
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverErrorText, setServerErrorText] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signupSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setFirstNameError("");
    setLastNameError("");

    if (signup.firstName === "") {
      setError(true);
      setFirstNameError("First name can't remain empty");
    }
    if (signup.lastName === "") {
      setError(true);
      setLastNameError("First name can't remain empty");
    }
    if (signup.email === "") {
      setError(true);
      setEmailError("Please select an Email");
    }
    if (signup.email.length > 0) {
      setError(false);
      setEmailError("");
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(signup.email).toLowerCase())) {
        setError(true);
        setEmailError("Enter a valid Email");
      }
    }
    if (signup.password === "") {
      setError(true);
      setPasswordError("Enter a password");
    }
    // if (signup.password) {
    //   setError(false);
    //   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$/;
    //   if (!re.test(String(signup.password))) {
    //     setError(true);
    //     setPasswordError(
    //       "Password must contain Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    //     );
    //   }
    //}

    axios
      .post("http://localhost:3030/api/signup", signup, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(res);
        if (res.data === "User created") {
        }
        if (
          res.date === "The email address is already in use by another account."
        ) {
        } else {
          setServerError(true);
          setServerErrorText(res.data);
        }
        console.log("signed up success");
      })
      .catch((error) => {
        setServerError(true);
        setServerErrorText(error.message);
      });
  };

  return (
    <>
      <form
        onSubmit={signupSubmit}
        className="row  d-flex mb-5 w-100 align-items-center justify-content-center"
      >
        <div className="col col-lg-6 col-10" style={{ width: "95%" }}>
          <div className="display-4 my-5">Signup</div>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control border-dark my-2 bg-transparent"
                name="firstName"
                value={signup.firstName}
                onChange={(e) =>
                  setSignup({ ...signup, firstName: e.target.value.trim() })
                }
              />
              {error && <small className="text-danger">{firstNameError}</small>}
            </div>
            <div className="form-group col-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control border-dark my-2 bg-transparent"
                value={signup.lastName}
                onChange={(e) =>
                  setSignup({ ...signup, lastName: e.target.value.trim() })
                }
              />
              {error && <small className="text-danger">{lastNameError}</small>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              className="form-control border-dark my-2 bg-transparent"
              aria-describedby="emailHelp"
              value={signup.email}
              onChange={(event) =>
                setSignup({ ...signup, email: event.target.value.trim() })
              }
            />
            {error && <small className="text-danger">{emailError}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control border-dark my-2 bg-transparent"
              id="exampleInputPassword1"
              value={signup.password}
              onChange={(event) =>
                setSignup({ ...signup, password: event.target.value.trim() })
              }
            />
            {error && <small className="text-danger">{passwordError}</small>}
          </div>
          <div className="form-group">
            <NavLink
              className="form-check-label link-secondary text-decoration-none"
              id="exampleInput"
              exact
              to="/account/login"
            >
              Already a user? Login
            </NavLink>
          </div>
          {serverError && <small>{serverErrorText}</small>} <br />
          <button type="submit" className="btn text-white border-light my-3">
            Submit
          </button>
          <br />
        </div>
      </form>
    </>
  );
};

export default Signup;
