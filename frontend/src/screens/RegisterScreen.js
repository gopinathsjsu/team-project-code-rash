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
      alert("Password doesn't match!");
    }
  }

  return (
    <div>
      {loading && <Loader></Loader>}
      {error.length > 0 && <Error msg={error}></Error>}

      <div className="row justify-content-center mt-5" style={{marginRight:"0px"}}>
        <div className="col-md-4 mt-4">
          {success.length > 0 && <Success msg={success}></Success>}
          <div className="bs" style={{backgroundColor:"#232B2B", borderColor:"black", borderStyle:"groove", borderWidth:"0.01px"}}>
            <h2 style={{color:"#ffffff"}}>Register your account</h2>
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
                  <br></br>
            {loading ? (
              <div>Registering your account...</div>
            ) : (
              <button className="button2 registerButton" onClick={register}>
                REGSITER
              </button>
            )}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href='/login'  style={{color:"#EC135F", textAlign:"center"}}>Already an existing member? Click here</a>

          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>

  );
}

export default RegisterScreen;
