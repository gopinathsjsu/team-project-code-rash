import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import STRINGS from "../constant";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function Login() {
    setLoading(true);
    const user = {
      email,
      password,
    };
    //console.log(user);
    try {
      const result = (await axios.post(STRINGS.url + "/api/users/login", user)).data;
      console.log(result);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials ! Please enter correct credentials");
    }
    setLoading(false);
  }
  return (
    <div>
      {loading && <Loader></Loader>}

      <div className="row justify-content-center mt-5" style={{marginRight:"0px", textAlign:"center"}}>
        <div className="col-md-4 mt-5">
          {error.length > 0 && <Error msg={error}></Error>}
          <div className="bs" style={{backgroundColor:"#232B2B", borderColor:"black", borderStyle:"groove", borderWidth:"0.01px"}}>
            <h2 style={{color:"#ffffff"}}>Login to your account</h2>
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
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <br></br>
            {loading ? (
              <div>Logging in...</div>
            ) : (
              <button className="button2 registerButton" onClick={Login}>
                LOGIN
              </button>
            )}
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

            <a href='/register' style={{color:"#EC135F"}}>Are you a new member? Click here</a>

            {/* <div>
              <a href="/register" style={{color:"blue", display:"inline-block"}}>Are you a new member? Click here</a>
            </div> */}

          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
    </div>
    
  );
}

export default LoginScreen;
