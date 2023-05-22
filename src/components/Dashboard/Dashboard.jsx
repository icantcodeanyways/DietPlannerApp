import React from "react";

import "./Dashboard.css";
import CircularBar from "../CircularProgressBar/CircularBar";
import Accord from "../Accord/Accord";

function Dashboard() {
  return (
    <>
      <div className="DashboardContainer">
        <CircularBar />
        <br />
        <Accord />
      </div>
    </>
  );
}

export default Dashboard;
