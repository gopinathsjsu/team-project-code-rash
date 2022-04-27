import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import STRINGS from "../constant";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      //console.log(user);
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const result = (await axios.post(STRINGS.url + "/api/users/register", user)).data;
        console.log(result);
        setSuccess(result);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    } else {
      alert("Password not matched");
    }
  }

  return (
    <div>
      {loading && <Loader></Loader>}
      {error.length > 0 && <Error msg={error}></Error>}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success.length > 0 && <Success msg={success}></Success>}
          <div className="bs">
            <h2>Register your account</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br></br>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br></br>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br></br>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your password to confirm"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            {loading ? (
              <div>Registering your account...</div>
            ) : (
              <button className="button2 loginButton" onClick={register}>
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
