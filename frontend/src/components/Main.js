import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

//Create a Main Component
export default function Main() {
  return (
    <div>
      {/*Render Different Component based on Route*/}
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}
