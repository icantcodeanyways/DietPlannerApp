import React from "react";
import NavbarSample from "../Navbar/Navbar";
import "./Diet.css";
import DietBox from "./DietBox";

function Diet() {
  return (
    <div>
      <NavbarSample />
      <div className="Dietcontainer">
        <DietBox />
      </div>
    </div>
  );
}

export default Diet;
