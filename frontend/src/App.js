import React from "react";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

//App Component
export default function App() {
  return (
    //Use Browser Router to route to different pages
    <BrowserRouter basename="/">
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Main />
      </div>
    </BrowserRouter>
  );
}
