import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Accord.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function Accord(props) {
  const breakFastStats = props.userDetails.breakFastStats | 0;
  const dinnerStats = props.userDetails.dinnerStats | 0;
  const lunchStats = props.userDetails.lunchStats | 0;

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

  return (
    <>
      <div className="AccordBox container">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Breakfast </Accordion.Header>
            <Accordion.Body>
              <div className="BreakDiv">
                Carbohydrates{" "}
                <ProgressBar
                  animated
                  now={breakFastPercentStats.carbsPercent}
                />
                Protein{" "}
                <ProgressBar
                  variant="warning"
                  animated
                  now={breakFastPercentStats.protienPercent}
                />
                Fat{" "}
                <ProgressBar
                  variant="danger"
                  animated
                  now={breakFastPercentStats.fatPercent}
                />
              </div>
              <br />
              <div class=" buttons">
                <button class="button">
                  <span></span>Recommend
                </button>
                <button class="button button3 ">
                  <span></span>Track
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Lunch </Accordion.Header>
            <Accordion.Body>
              Carbohydrates{" "}
              <ProgressBar animated now={lunchPercentStats.carbsPercent} />
              Protein{" "}
              <ProgressBar
                variant="warning"
                animated
                now={lunchPercentStats.protienPercent}
              />
              Fat{" "}
              <ProgressBar
                variant="danger"
                animated
                now={lunchPercentStats.fatPercent}
              />
              <br />
              <div class=" buttons">
                <button class="button">
                  <span></span>Recommend
                </button>
                <button class="button button3 ">
                  <span></span>Track
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Dinner </Accordion.Header>
            <Accordion.Body>
              Carbohydrates{" "}
              <ProgressBar animated now={dinnerPercentStats.carbsPercent} />
              Protein{" "}
              <ProgressBar
                variant="warning"
                animated
                now={dinnerPercentStats.protienPercent}
              />
              Fat{" "}
              <ProgressBar
                variant="danger"
                animated
                now={dinnerPercentStats.fatPercent}
              />
              <br />
              <div class=" buttons">
                <button class="button">
                  <span></span>Recommend
                </button>
                <button class="button button3 ">
                  <span></span>Track
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default Accord;
