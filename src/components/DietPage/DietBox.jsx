import React, { useEffect, useState } from "react";
import "./DietBox.css";
import {
  Button,
  Spinner,
  Container,
  Form,
  CardGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import jwt_decode from "jwt-decode";
import FoodItemCard from "./FoodItemCard";
import { ToastContainer, toast } from "react-toastify";

function DietBox() {
  const [showRecommend, setShowRecommend] = useState(false);
  const [showLogFood, setShowLogFood] = useState(false);

  const [loading, setLoading] = useState({ status: false, message: "" });
  const [isDietGenerated, setIsDietGenerated] = useState(false);
  const [generatedDiets, setGeneratedDiets] = useState([]);
  const [mealTiming, setMealTiming] = useState("lunch");

  const [meals, setMeals] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const preFetch = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_EDAMAM_API_AUTOCOMPLETE_ENDPOINT,
          {
            params: {
              q: "a",
              app_id: process.env.REACT_APP_EDAMAM_API_APP_ID,
              app_key: process.env.REACT_APP_EDAMAM_API_APP_KEY,
            },
          }
        );
        const completions = response.data;
        setSuggestions(completions);
      } catch (error) {
        console.log(error);
      }
    };
    preFetch();
  }, []);

  const handleSearch = async (query) => {
    console.log(process.env.REACT_APP_EDAMAM_API_ENDPOINT);
    try {
      const response = await axios.get(
        process.env.REACT_APP_EDAMAM_API_AUTOCOMPLETE_ENDPOINT,
        {
          params: {
            q: query,
            app_id: process.env.REACT_APP_EDAMAM_API_APP_ID,
            app_key: process.env.REACT_APP_EDAMAM_API_APP_KEY,
          },
        }
      );

      const completions = response.data;
      setSuggestions(completions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecommendDiet = async () => {
    if (meals.length < 3) {
      toast.error("Please select atleast three items");
      return;
    }
    try {
      const token = localStorage.getItem("Token");
      const userId = jwt_decode(token).user_id;
      setLoading({ status: true, message: "Generating diet plan.." });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/generate_diet_plan`,
        { selected_meals: meals },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading({ status: false, message: "" });
      setIsDietGenerated(true);
      setGeneratedDiets(response.data);
    } catch (error) {
      setLoading({ status: false, message: "" });
      setGeneratedDiets([]);
      setIsDietGenerated(false);
      console.log(error);
    }
  };

  const handleChange = (selected) => {
    setMeals(selected);
  };

  const handleSaveDietPlan = async () => {
    try {
      const token = localStorage.getItem("Token");
      const userId = jwt_decode(token).user_id;
      setLoading({ status: true, message: "Saving diet plan.." });
      generatedDiets.push({ diet_timing: mealTiming });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/diet_plans`,
        { diet_plan: generatedDiets },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setLoading({ status: false, message: "" });
      setGeneratedDiets([]);
      setIsDietGenerated(false);
    } catch (error) {
      setLoading({ status: false, message: "" });
      setGeneratedDiets([]);
      setIsDietGenerated(false);
      console.log(error);
    }
  };

  const handleRecommendClick = () => {
    setShowRecommend(true);
    setIsDietGenerated(false);
    setMeals([]);
    setShowLogFood(false);
  };

  const handleLogFoodClick = () => {
    setShowRecommend(false);
    setShowLogFood(true);
  };

  return (
    <>
      {loading.status && (
        <div className="overlay">
          <span className="loading-text">{loading.message}</span>
          <Spinner
            animation="grow"
            style={{ width: "8rem", height: "8rem" }}
            variant="warning"
          />
        </div>
      )}
      <div className="DietBox col-lg-10 col-sm container-fluid">
        <ToastContainer />
        <div className="button-container">
          <Button
            variant="outline-primary"
            style={{ marginRight: "10px" }}
            onClick={handleRecommendClick}
          >
            Recommend
          </Button>
          <Button
            variant="outline-success"
            style={{ marginRight: "10px" }}
            onClick={handleLogFoodClick}
          >
            Log Food
          </Button>
        </div>
        {showRecommend && (
          <Container className="pop-up-container">
            {!isDietGenerated && (
              <div>
                <Typeahead
                  id="basic-typeahead-multiple"
                  labelKey="name"
                  multiple
                  onInputChange={handleSearch}
                  onChange={handleChange}
                  options={suggestions}
                  placeholder="Search for your favorite meal.."
                  selected={meals}
                />
                <Button
                  onClick={handleRecommendDiet}
                  variant="outline-primary"
                  className="recommend-button mt-3"
                >
                  Generate diet plan
                </Button>
              </div>
            )}
            {isDietGenerated && (
              <CardGroup>
                {generatedDiets.map((diet, index) => (
                  <FoodItemCard index={index} diet={diet} />
                ))}
              </CardGroup>
            )}
            {isDietGenerated && (
              <div>
                <div>
                  <ToggleButtonGroup
                    type="radio"
                    defaultValue={mealTiming}
                    name="options"
                    onChange={(timing) => setMealTiming(timing)}
                  >
                    <ToggleButton id="tbg-radio-1" value="breakfast">
                      Breakfast
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value="lunch">
                      Lunch
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-3" value="dinner">
                      Dinner
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div>
                  <Button
                    onClick={handleSaveDietPlan}
                    variant="outline-primary"
                    className="recommend-button mt-3"
                  >
                    Save diet plan
                  </Button>
                </div>
              </div>
            )}
          </Container>
        )}
        {showLogFood && (
          <Container className="pop-up-container">
            <h3>Log Food</h3>
            <Form>
              <Form.Group>
                <Form.Control type="text" placeholder="Search for food..." />
              </Form.Group>
              <Button variant="outline-primary" onClick={() => {}}>
                Search
              </Button>
            </Form>
          </Container>
        )}
      </div>
    </>
  );
}

export default DietBox;
