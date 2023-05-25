import "../Dashboard/Dashboard.css";
import {
  Container,
  Spinner,
  CardGroup,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "react-datepicker/dist/react-datepicker.css";
import FoodItemCard from "../DietPage/FoodItemCard";
import "../DietPage/DietBox.css";
import { toast } from "react-toastify";

function ViewDietPlan() {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [dietPlans, setDietPlans] = useState([]);

  const searchDietPlan = async () => {
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setIsLoading(true);
    try {
      const token = localStorage.getItem("Token");
      const userId = jwt_decode(token).user_id;
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/diet_plans?q=${formattedDate}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setDietPlans(response.data);
      setHasSearched(true);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "No diet plans exist for the given date. Check date and try again"
        );
      }
      setDietPlans([]);
      setIsLoading(false);
      setHasSearched(false);
      console.log(error);
    }
  };

  return (
    <div className="DashboardContainer">
      {isLoading && (
        <div className="overlay">
          <span className="loading-text">Retrieving diet plan..</span>
          <Spinner
            animation="grow"
            style={{ width: "8rem", height: "8rem" }}
            variant="warning"
          />
        </div>
      )}
      <Container className="bg-light p-5">
        {!hasSearched && (
          <Container>
            <Row>
              <h2>See your diets</h2>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col md="5">
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </Col>
              <Col md="auto pt-2">
                <Button variant="primary" onClick={searchDietPlan}>
                  Search
                </Button>
              </Col>
            </Row>
          </Container>
        )}
        {hasSearched && (
          <Container>
            <h3>
              {`Your diet plans for: ${date.toLocaleDateString({
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
            </h3>
            {dietPlans.map((dietplan, index) => (
              <Row key={index} className="justify-content-center">
                <h2>{dietplan.meal_timing}</h2>
                <CardGroup className="justify-content-center">
                  {dietplan.diet_plan.map((diet, foodIndex) => (
                    <div key={foodIndex}>
                      <FoodItemCard diet={diet} />
                    </div>
                  ))}
                </CardGroup>
              </Row>
            ))}
          </Container>
        )}
      </Container>
    </div>
  );
}

export default ViewDietPlan;
