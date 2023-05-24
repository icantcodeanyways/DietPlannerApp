import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./CircularBar.css";
function CircularBar(props) {
  const caloriePercentage =
    (props.userDetails.consumedCalories / props.userDetails.requiredCalories) *
    100;
  const fatPercentage =
    (props.userDetails.consumedFat / props.userDetails.requiredFat) * 100;
  const protienPercentage =
    (props.userDetails.consumedProtien / props.userDetails.requiredProtien) *
    100;
  const carbPercentage =
    (props.userDetails.consumedCarbs / props.userDetails.requiredCarbs) * 100;

  return (
    <>
      <div className="Box1">
        <h4>
          Calories : {props.userDetails.consumedCalories.toFixed(3)} /{" "}
          {Math.round(props.userDetails.requiredCalories.toFixed(3))}
        </h4>
        <div className="Box2">
          <div className="CircularBox" style={{ width: 150, height: 150 }}>
            <CircularProgressbar
              value={caloriePercentage}
              text={`${caloriePercentage.toFixed(2).toString()}%`}
            />
          </div>
        </div>
        <div>
          Carbohydrates <ProgressBar animated now={carbPercentage} />
          Protein{" "}
          <ProgressBar variant="warning" animated now={protienPercentage} />
          Fat <ProgressBar variant="danger" animated now={fatPercentage} />
        </div>
      </div>
    </>
  );
}

export default CircularBar;
