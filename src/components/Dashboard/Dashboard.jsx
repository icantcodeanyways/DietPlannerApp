import React from "react";
import NavbarSample from "../Navbar/Navbar";

import "./Dashboard.css";
import CircularBar from "../CircularProgressBar/CircularBar";
import Accord from "../Accord/Accord";

function Dashboard() {
  return (
    <>
      <NavbarSample />
      <div className="DashboardContainer">
        <CircularBar />
        <br />
        <Accord />
      </div>
    </>
  );
}

export default Dashboard;
