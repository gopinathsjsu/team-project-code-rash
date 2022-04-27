import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function LandingScreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "80px", fontFamily:"inherit" }}>
          HOTEL BOOKING
        </h2>
        <h1 data-aos="zoom-out" style={{ color: "white", fontFamily:"inherit" }}>
          Click below to catch up with our website!
        </h1>
        <Link to="/home">
          {/* <button className="btn btn-primary landingBtn">Get Started</button> */}
          <button className="button button1">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingScreen;
