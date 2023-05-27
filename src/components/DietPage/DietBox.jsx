import React, { useEffect, useState } from "react";
import "./DietBox.css";
import {
  Button,
  Spinner,
  Container,
  Form,
  CardGroup,
  InputGroup,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import jwt_decode from "jwt-decode";
import FoodItemCard from "./FoodItemCard";
import { toast } from "react-toastify";

function DietBox() {
  const [showRecommend, setShowRecommend] = useState(false);
  const [showLogFood, setShowLogFood] = useState(false);

  const [completionLoading, setCompletionLoading] = useState(false);

  const [foodItems, setFoodItems] = useState([{ food: "", quantity: "" }]);

  const [loading, setLoading] = useState({ status: false, message: "" });
  const [isDietGenerated, setIsDietGenerated] = useState(false);
  const [generatedDiets, setGeneratedDiets] = useState([]);
  const [mealTiming, setMealTiming] = useState("lunch");

  const [meals, setMeals] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setShowLogFood(false);
    setShowRecommend(true);
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

  const handleQuantityChange = (e, index) => {
    const value = e.target.value;
    setFoodItems((prevFoodItems) => {
      const updatedFoodItems = [...prevFoodItems];
      updatedFoodItems[index].quantity = value;
      return updatedFoodItems;
    });
  };

  const handleAddRow = () => {
    setFoodItems((prevFoodItems) => [
      ...prevFoodItems,
      { food: "", quantity: "" },
    ]);
  };

  const handleRemoveRow = () => {
    if (foodItems.length === 1) {
      setFoodItems([{ food: "", quantity: "" }]);
      console.log(foodItems);
      setSuggestions([]);
      return;
    }
    setFoodItems((prevFoodItems) => {
      const updatedFoodItems = [...prevFoodItems];
      updatedFoodItems.pop();
      return updatedFoodItems;
    });
  };

  const handleFoodLog = async () => {
    const requestBodyFoodItems = foodItems.map((item) => {
      if (!item.quantity || item.quantity.toString() == "0") {
        toast.error("Please provide a valid quantity");
        return;
      }
      return {
        food: item.food[0],
        quantity: item.quantity,
      };
    });

    const requestBody = {
      meal_timing: mealTiming,
      log_info: requestBodyFoodItems,
    };

    try {
      const token = localStorage.getItem("Token");
      const userId = jwt_decode(token).user_id;
      setLoading({ status: true, message: "Saving diet plan.." });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/custom_food_log`,
        requestBody,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading({ status: false, message: "" });
      setFoodItems([{ food: "", quantity: "" }]);
      console.log(response);
      toast.success("Diet logged successfully");
    } catch (error) {
      setLoading({ status: false, message: "" });
      setFoodItems([{ food: "", quantity: "" }]);
      if (error.response.status === 400) {
        toast.error("Unable to log diet info due to missing data");
      } else if (error.response.status === 409) {
        toast.error(
          "Another diet plan already exist for the selected meal time. Please select a different time and try"
        );
      } else {
        console.log(error);
        if (error.response) {
          toast.error(error.response?.data);
        }
      }
    }

    console.log(requestBody);
  };

  const handleSearch = async (query) => {
    console.log(process.env.REACT_APP_EDAMAM_API_ENDPOINT);
    setCompletionLoading(true);
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
      setCompletionLoading(false);
    } catch (error) {
      setCompletionLoading(false);
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
      setShowRecommend([]);
      setGeneratedDiets(response.data);
    } catch (error) {
      setLoading({ status: false, message: "" });
      setGeneratedDiets([]);
      setShowRecommend([]);
      setIsDietGenerated(false);
      if (error.response.status == 400) {
        toast.error(
          "Cannot generate diet plan with the given data. Please choose some other meals"
        );
      }
    }
  };

  const handleChange = (selected) => {
    setMeals(selected);
  };

  const handleChangeLog = (value, index) => {
    console.log(value, index);

    setFoodItems((prevMeals) => {
      const updatedMeals = [...prevMeals];
      updatedMeals[index].food = value;
      return updatedMeals;
    });
    console.log(foodItems);
  };

  const handleSaveDietPlan = async () => {
    try {
      const token = localStorage.getItem("Token");
      const userId = jwt_decode(token).user_id;
      setLoading({ status: true, message: "Saving diet plan.." });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/diet_plans`,
        { diet_plan: generatedDiets, meal_timing: mealTiming },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setLoading({ status: false, message: "" });
      setGeneratedDiets([]);
      setMeals([]);
      setIsDietGenerated(false);
      toast.success("Diet plan saved successully");
    } catch (error) {
      setLoading({ status: false, message: "" });
      setMeals([]);
      setGeneratedDiets([]);
      setIsDietGenerated(false);
      if (error.response.status == 409) {
        toast.error("Diet plan already exist for the given meal time");
      } else {
        toast.error("An error occured");
      }
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
        <div className="button-container">
          <Button
            variant={showRecommend ? "primary" : "outline-primary"}
            style={{ marginRight: "10px" }}
            onClick={handleRecommendClick}
          >
            Recommend
          </Button>
          <Button
            variant={showLogFood ? "success" : "outline-success"}
            style={{ marginRight: "10px" }}
            onClick={handleLogFoodClick}
          >
            Log Food
          </Button>
        </div>
        {showRecommend && (
          <Container className="pop-up-container">
            <h3>Recommend diet plan</h3>
            {!isDietGenerated && (
              <div>
                <Typeahead
                  id="basic-typeahead-multiple"
                  labelKey="name"
                  multiple
                  isLoading={completionLoading}
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
              <CardGroup className="justify-content-center">
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
              {foodItems.map((foodItem, index) => (
                <Row key={index}>
                  <Col>
                    <Typeahead
                      id={`basic-typeahead-single-${index}`}
                      labelKey="name"
                      onInputChange={handleSearch}
                      onChange={(value) => handleChangeLog(value, index)}
                      options={suggestions}
                      placeholder="Search for your favorite meal.."
                      selected={foodItem.food}
                    />
                  </Col>

                  <Col>
                    <InputGroup className="pt-2">
                      <InputGroup.Text>Qty (in g) :</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Quantity"
                        value={foodItem.quantity}
                        onChange={(e) => handleQuantityChange(e, index)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              ))}{" "}
              <Row>
                <Col>
                  <Button
                    className="mt-3"
                    variant="outline-primary"
                    onClick={handleAddRow}
                  >
                    Add
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="mt-3"
                    variant="outline-primary"
                    onClick={handleRemoveRow}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
              <div className="mt-3">
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
              <Button
                className="mt-2"
                variant="outline-primary"
                onClick={handleFoodLog}
              >
                Log diet
              </Button>
            </Form>
          </Container>
        )}
      </div>
    </>
  );
}

export default DietBox;
