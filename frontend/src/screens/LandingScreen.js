import React from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import "../styles/Home.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css"; // You can also use <link> for styles
// // ..
// AOS.init({
//   duration: 2000,
// });

function LandingScreen() {
  return (
    // <div className="row landing">
    //   <div className="col-md-12 text-center">
    //     <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "80px", fontFamily:"inherit" }}>
    //       HOTEL BOOKING
    //     </h2>
    //     <h1 data-aos="zoom-out" style={{ color: "white", fontFamily:"inherit" }}>
    //       Click below to catch up with our website!
    //     </h1>
    //     <Link to="/home">
    //       {/* <button className="btn btn-primary landingBtn">Get Started</button> */}
    //       <button className="button button1">Get Started</button>
    //     </Link>
    //   </div>
    // </div>

    <div className='home'>
            <Banner />
            <div className='home__section'>
            <Card
                src="https://i.pinimg.com/originals/45/3f/1a/453f1a6859e13ae5608e24de26a796b5.jpg"
                title="Single Bedrooms"
                description="Well-designed single bedrooms for your office trips"
                price="Starting from $30/night"
            />
            <Card
                src="https://cdn.decoist.com/wp-content/uploads/2012/06/Double-master-bedroom-in-Aspen-home.jpg"
                title="Double Bedrooms"
                description="Enjoy the amazing sights of California with these stunning double bedrooms"
                price="Starting from $50/night"
            />
            <Card
                src="https://media.nomadicmatt.com/2018/apartment.jpg"
                title="Suite"
                description="Luxurious Rooms with vast spaces just for your long weekends"
                price=" Starting from $70/night"
            />
            </div>
    </div>
  );
}

export default LandingScreen;
