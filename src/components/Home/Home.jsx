import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="Conatiner1">
      <div
        className="Box col-xs-6"
        style={{ float: "right", position: "absolute", right: "25px" }}
      >
        <div className="TextSection">
          <h1 style={{ color: "white" }}>Welcome to Diet Planner App</h1>
          <h5 className="pt-3" style={{ color: "white" }}>
            Login to start using the app!
          </h5>
        </div>
        <Link to="/register">
          <Button variant="primary" style={{ margin: 10 }}>
            SignUp
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="warning">Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
