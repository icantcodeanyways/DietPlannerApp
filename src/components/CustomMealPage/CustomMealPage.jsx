import React, { useEffect, useState } from "react";
import {
  Button,
  InputGroup,
  Container,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import "./styles.css";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

function CustomMealPage() {
  const [foodItems, setFoodItems] = useState([{ food: "", quantity: "" }]);
  const [suggestions, setSuggestions] = useState([]);
  const [nutritionalInfo, setNutritionalInfo] = useState({
    totalCarbs: 0,
    totalFat: 0,
    totalCalories: 0,
    totalProtien: 0,
  });

  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
  const [isLoading, setIsLoading] = useState({ status: false, message: "" });

  // Save to database related state
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [mealName, setMealName] = useState("");
  const [mealTiming, setMealTiming] = useState("");

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

  const handleAddRow = () => {
    setShowNutritionalInfo(false);
    setSuggestions([]);
    setFoodItems((prevFoodItems) => [
      ...prevFoodItems,
      { food: "", quantity: "" },
    ]);
  };

  const handleCalculateDiet = async () => {
    if (foodItems.length === 1 && foodItems[0].food === "") {
      toast.error("Please select at least one ingredient");
      return;
    }
    const dietInfo = [];

    const requestPromises = foodItems.map(async (item) => {
      const itemName = item.food[0];
      const itemQuantity = item.quantity;
      /* console.log(`${itemName} ${itemQuantity}`); */

      try {
        setIsLoading({
          status: true,
          message: "Calculating nutritional info..",
        });
        const response = await axios.get(
          process.env.REACT_APP_EDAMAM_FOOD_DATABASE_ENDPOINT,
          {
            params: {
              ingr: itemName,
              app_id: process.env.REACT_APP_EDAMAM_FOOD_DATABASE_APP_ID,
              app_key: process.env.REACT_APP_EDAMAM_FOOD_DATABASE_APP_KEY,
            },
          }
        );
        let food;
        if (response.data.parsed && response.data.parsed.length == 0) {
          food = response.data.hints[0].food;
        } else {
          food = response.data.parsed[0].food;
        }
        const imageUrl = food.image;
        const calorie = food.nutrients.ENERC_KCAL / 100;
        const protien = food.nutrients.PROCNT / 100;
        const fat = food.nutrients.FAT / 100;
        const carbs = food.nutrients.CHOCDF / 100;

        dietInfo.push({
          name: itemName,
          quantity: itemQuantity,
          image: imageUrl,
          calorie: calorie,
          protien: protien,
          fat: fat,
          carbs: carbs,
        });
      } catch (error) {
        toast.error(
          "Data unavailable for one of the selected items. Please choose another item"
        );
        console.log(error);
      }
    });

    try {
      await Promise.all(requestPromises);
      let totalCalories = 0;
      let totalCarbs = 0;
      let totalProtien = 0;
      let totalFat = 0;

      dietInfo.forEach((info) => {
        totalFat += info.fat * info.quantity;
        totalCarbs += info.carbs * info.quantity;
        totalProtien += info.protien * info.quantity;
        totalCalories += info.calorie * info.quantity;
      });

      setIsLoading({ status: false, message: "" });
      setShowNutritionalInfo(true);
      setNutritionalInfo({
        totalCalories: totalCalories.toFixed(2),
        totalFat: totalFat.toFixed(2),
        totalCarbs: totalCarbs.toFixed(2),
        totalProtien: totalProtien.toFixed(2),
      });
    } catch (error) {
      toast.error(
        "An error occured while calculating diet info. Please try again."
      );
      console.log(error);
    }
  };

  const handleQuantityChange = (e, index) => {
    const value = e.target.value;
    setFoodItems((prevFoodItems) => {
      const updatedFoodItems = [...prevFoodItems];
      updatedFoodItems[index].quantity = value;
      return updatedFoodItems;
    });
  };

  const handleRemoveRow = () => {
    if (foodItems.length === 1) {
      setFoodItems([{ food: "", quantity: "" }]);
      setSuggestions([]);
      setShowNutritionalInfo(false);
      return;
    }
    setFoodItems((prevFoodItems) => {
      const updatedFoodItems = [...prevFoodItems];
      updatedFoodItems.pop();
      return updatedFoodItems;
    });
  };

  const handleChangeIngredients = (value, index) => {
    console.log(value, index);

    setFoodItems((prevMeals) => {
      const updatedMeals = [...prevMeals];
      updatedMeals[index].food = value;
      return updatedMeals;
    });
  };

  const handleSaveDialogOpen = () => {
    setShowSaveDialog(true);
  };

  const handleSaveDialogClose = () => {
    setShowSaveDialog(false);
  };

  const handleSaveMeal = async () => {
    // Validate meal name and timing
    if (!mealName.trim() || !mealTiming.trim()) {
      toast.error("Please enter both meal name and timing.");
      return;
    }

    const totalQuantity = foodItems.reduce((total, item) => {
      return total + parseFloat(item.quantity);
    }, 0);

    const totalFoodData = {
      meal_timing: mealTiming.toLowerCase(),
      meal_name: mealName,
      total_calories: parseFloat(nutritionalInfo.totalCalories),
      total_protien: parseFloat(nutritionalInfo.totalProtien),
      quantity: totalQuantity,
      total_carbs: parseFloat(nutritionalInfo.totalCarbs),
      total_fat: parseFloat(nutritionalInfo.totalFat),
    };

    try {
      const token = localStorage.getItem("Token");
      const userId = jwt_decode(token).user_id;
      setIsLoading({ status: true, message: "Logging custom meal.." });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/custom_meal_log`,
        totalFoodData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setIsLoading({ status: false, message: "" });
      toast.success("Custom meal saved successfully!");

      setMealName("");
      setMealTiming("");

      setShowSaveDialog(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while saving the custom meal.");
      console.log(error);
    }
  };

  return (
    <div className="d-flex custom-meal-page align-items-center vh-100">
      {isLoading.status && <Loading message={isLoading.message} />}
      <Container className="pop-up-container">
        <h3>Custom meal calculation</h3>
        {foodItems.map((foodItem, index) => (
          <Row key={index}>
            <Col>
              <Typeahead
                id={`basic-typeahead-single-${index}`}
                options={suggestions}
                labelKey="name"
                onInputChange={handleSearch}
                onChange={(value) => handleChangeIngredients(value, index)}
                placeholder="Search the ingredient.."
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
        ))}
        <Row>
          <Col>
            <Button className="mt-3" variant="success" onClick={handleAddRow}>
              Add
            </Button>
          </Col>
          <Col>
            <Button className="mt-3" variant="danger" onClick={handleRemoveRow}>
              Remove
            </Button>
          </Col>
        </Row>
        <Button
          className="mt-3"
          variant="outline-primary"
          onClick={handleCalculateDiet}
        >
          Calculate meal info
        </Button>
        {showNutritionalInfo && (
          <div className="mt-3 fw-bold fs-6">
            <p className="fs-3">Nutritonal info</p>
            <p>Total calories : {nutritionalInfo.totalCalories} cal</p>
            <p>Total fat : {nutritionalInfo.totalFat} g</p>
            <p>Total protien : {nutritionalInfo.totalProtien} g</p>
            <p>Total carbs : {nutritionalInfo.totalCarbs} g</p>
            <Button
              className="mt-3"
              variant="primary"
              onClick={handleSaveDialogOpen}
            >
              Save to Database
            </Button>
          </div>
        )}
        <Modal show={showSaveDialog} onHide={handleSaveDialogClose}>
          <Modal.Header closeButton>
            <Modal.Title>Save Custom Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Meal Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meal name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="pt-3">
              <div>
                <Button
                  variant={
                    mealTiming === "Breakfast" ? "primary" : "outline-primary"
                  }
                  onClick={() => setMealTiming("Breakfast")}
                  className="me-2"
                >
                  Breakfast
                </Button>
                <Button
                  variant={
                    mealTiming === "Lunch" ? "primary" : "outline-primary"
                  }
                  onClick={() => setMealTiming("Lunch")}
                  className="me-2"
                >
                  Lunch
                </Button>
                <Button
                  variant={
                    mealTiming === "Dinner" ? "primary" : "outline-primary"
                  }
                  onClick={() => setMealTiming("Dinner")}
                >
                  Dinner
                </Button>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSaveDialogClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveMeal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default CustomMealPage;
