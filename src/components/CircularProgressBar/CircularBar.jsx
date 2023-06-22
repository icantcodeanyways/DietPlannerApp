import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router-dom";

import "./CircularBar.css";

function CircularBar(props) {
  const history = useHistory();

  const caloriePercentage =
    ((props.userDetails.consumedCalories / props.userDetails.requiredCalories) *
      100) |
    0;
  const fatPercentage =
    ((props.userDetails.consumedFat / props.userDetails.requiredFat) * 100) | 0;
  const protienPercentage =
    ((props.userDetails.consumedProtien / props.userDetails.requiredProtien) *
      100) |
    0;
  const carbPercentage =
    ((props.userDetails.consumedCarbs / props.userDetails.requiredCarbs) *
      100) |
    0;

  return (
    <>
      <div className="Box1">
        <h4 className="mt-3">
          Calories : {props.userDetails.consumedCalories.toFixed(3)} /{" "}
          {Math.round(props.userDetails.requiredCalories)}
        </h4>
        <div className="Box2 mb-3">
          <div className="CircularBox" style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={caloriePercentage}
              text={`${caloriePercentage.toFixed(2).toString()}%`}
            />
          </div>
        </div>
        <div>
          Carbohydrates{" "}
          <ProgressBar className="mb-3 mx-3" animated now={carbPercentage} />
          Protein{" "}
          <ProgressBar
            className="mb-3 mx-3"
            variant="warning"
            animated
            now={protienPercentage}
          />
          Fat{" "}
          <ProgressBar
            className="mb-3  mx-3"
            variant="danger"
            animated
            now={fatPercentage}
          />
        </div>
        <div>
        <button
                class="button btn1"
                onClick={() => {
                  history.push("/diet");
                }}
              >
                Recommend
              </button>
              <button
                class="button btn2"
                onClick={() => {
                  history.push("/diet");
                }}
              >
                Custom Meal
              </button>
              <button
                class="button btn3"
                onClick={() => {
                  history.push("/diet");
                }}
              >
                Log Food
              </button>
        </div>
      </div>
    </>
  );
}

export default CircularBar;
