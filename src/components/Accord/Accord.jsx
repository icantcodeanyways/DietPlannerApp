import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Accord.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useHistory } from "react-router-dom";

function Accord(props) {
  console.log(props);
  const breakFastStats = props.userDetails.breakFastStats;
  const dinnerStats = props.userDetails.dinnerStats;
  const lunchStats = props.userDetails.lunchStats;

  const history = useHistory();

  const breakFastPercentStats = {
    carbsPercent:
      (breakFastStats.consumed_carbs / (props.userDetails.requiredCarbs / 3)) *
      100,
    protienPercent:
      (breakFastStats.consumed_protien /
        (props.userDetails.requiredProtien / 3)) *
      100,
    fatPercent:
      (breakFastStats.consumed_fat / (props.userDetails.requiredFat / 3)) * 100,
  };

  const lunchPercentStats = {
    carbsPercent:
      (lunchStats.consumed_carbs / (props.userDetails.requiredCarbs / 3)) * 100,
    protienPercent:
      (lunchStats.consumed_protien / (props.userDetails.requiredProtien / 3)) *
      100,
    fatPercent:
      (lunchStats.consumed_fat / (props.userDetails.requiredFat / 3)) * 100,
  };

  const dinnerPercentStats = {
    carbsPercent:
      (dinnerStats.consumed_carbs / (props.userDetails.requiredCarbs / 3)) *
      100,
    protienPercent:
      (dinnerStats.consumed_protien / (props.userDetails.requiredProtien / 3)) *
      100,
    fatPercent:
      (dinnerStats.consumed_fat / (props.userDetails.requiredFat / 3)) * 100,
  };
  // console.log("breakFastStats:", breakFastStats);
  // console.log("lunchStats:", lunchStats);
  // console.log("dinnerStats:", dinnerStats);

  return (
    <>
      <div className="AccordBox ">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Breakfast </Accordion.Header>
            <Accordion.Body>
              <div className="BreakDiv">
                Carbohydrates [
                {props.userDetails.breakFastStats.consumed_carbs !== undefined
                  ? props.userDetails.breakFastStats.consumed_carbs.toFixed(2)
                  : "0"}
                /{(props.userDetails.requiredCarbs / 3).toFixed(2)}]
                {/* {props.userDetails.consumedCalories.toFixed(3) } */}
                <ProgressBar
                  className="mb-3 mx-3"
                  animated
                  now={breakFastPercentStats.carbsPercent}
                />
                Protein [
                {`${
                  props.userDetails.breakFastStats.consumed_protien !==
                  undefined
                    ? props.userDetails.breakFastStats.consumed_protien.toFixed(
                        2
                      )
                    : "0"
                }/${(props.userDetails.requiredProtien / 3).toFixed(2)}`}
                ]
                <ProgressBar
                  className="mb-3 mx-3"
                  variant="warning"
                  animated
                  now={breakFastPercentStats.protienPercent}
                />
                Fat [
                {props.userDetails.breakFastStats.consumed_fat !== undefined
                  ? props.userDetails.breakFastStats.consumed_fat.toFixed(2)
                  : "0"}
                /{(props.userDetails.requiredFat / 3).toFixed(2)}]
                <ProgressBar
                  className="mb-3 mx-3"
                  variant="danger"
                  animated
                  now={breakFastPercentStats.fatPercent}
                />
              </div>
              <br />

              {/* <button
                class="button button3 "
                onClick={() => {
                  history.push("/diet");
                }}
              >
                Track
              </button> */}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Lunch </Accordion.Header>
            <Accordion.Body>
              Carbohydrates [
              {props.userDetails.lunchStats.consumed_carbs !== undefined
                ? props.userDetails.lunchStats.consumed_carbs.toFixed(2)
                : "0"}
              /{(props.userDetails.requiredCarbs / 3).toFixed(2)}]
              <ProgressBar
                className="mb-3 mx-3"
                animated
                now={lunchPercentStats.carbsPercent}
              />
              Protein [
              {props.userDetails.lunchStats.consumed_protien !== undefined
                ? props.userDetails.lunchStats.consumed_protien.toFixed(2)
                : "0"}
              /{(props.userDetails.requiredProtien / 3).toFixed(2)}]
              <ProgressBar
                className="mb-3 mx-3"
                variant="warning"
                animated
                now={lunchPercentStats.protienPercent}
              />
              Fat [
              {props.userDetails.lunchStats.consumed_fat !== undefined
                ? props.userDetails.lunchStats.consumed_fat.toFixed(2)
                : "0"}
              /{(props.userDetails.requiredFat / 3).toFixed(2)}]
              <ProgressBar
                className="mb-3 mx-3"
                variant="danger"
                animated
                now={lunchPercentStats.fatPercent}
              />
              <br />
              {/* <button
                class="button button3 "
                onClick={() => {
                  history.push("/diet");
                }}
              >
                Track
              </button> */}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Dinner </Accordion.Header>
            <Accordion.Body>
              Carbohydrates [
              {props.userDetails.dinnerStats.consumed_carbs !== undefined
                ? props.userDetails.dinnerStats.consumed_carbs.toFixed(2)
                : "0"}
              /{(props.userDetails.requiredCarbs / 3).toFixed(2)}]
              <ProgressBar
                className="mb-3 mx-3"
                animated
                now={dinnerPercentStats.carbsPercent}
              />
              Protein [
              {props.userDetails.dinnerStats.consumed_protien !== undefined
                ? props.userDetails.dinnerStats.consumed_protien.toFixed(2)
                : "0"}
              /{(props.userDetails.requiredProtien / 3).toFixed(2)}]
              <ProgressBar
                className="mb-3 mx-3"
                variant="warning"
                animated
                now={dinnerPercentStats.protienPercent}
              />
              Fat [
              {props.userDetails.dinnerStats.consumed_protien !== undefined
                ? props.userDetails.dinnerStats.consumed_fat.toFixed(2)
                : "0"}
              /{(props.userDetails.requiredFat / 3).toFixed(2)}]
              <ProgressBar
                className="mb-3 mx-3"
                variant="danger"
                animated
                now={dinnerPercentStats.fatPercent}
              />
              <br />
              <div class=" buttons">
                {/* <button
                  class="button button3 "
                  onClick={() => {
                    history.push("/diet");
                  }}
                >
                  Track
                </button> */}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default Accord;
