from flask import Flask, json, jsonify, redirect, render_template, request
import requests
from pulp import *
import random

app = Flask(__name__)

# Edamam API constants
NUTRIENTS_ENDPOINT = "https://api.edamam.com/api/food-database/v2/nutrients"
APP_ID = "17ef13d8"
APP_KEY = "1cd19810edca849183d418491db87c92"

# Payload for POST to NUTRIENTS_ENDPOINT
payload = {
    "ingredients": [
        {
            "quantity": 1,
            "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
            "foodId": "",
        }
    ]
}

# Header for POST to NUTRIENTS_ENDPOINT
headers = {"Content-Type": "application/json"}

# Route to check status of api
@app.route("/status", methods=["GET"])
def status():
    return {"status": "ok"}

# Route to index page
@app.route("/", methods=["GET"])
def home():
    return render_template("home.html")

# Route for diet plan generation
@app.route("/generate_diet", methods=["POST"])
def generate_diet():
    height = float(request.form["height"])
    weight = float(request.form["weight"])
    age = int(request.form["age"])
    gender = request.form["gender"]
    activity = request.form["physical-activity"]
    food_items = request.form.getlist("food-selection")
    food_items_id = request.form.getlist("food_id")

    food_list = []
    for i in range(len(food_items)):
        payload["ingredients"][0]["foodId"] = food_items_id[i]
        response = requests.post(
            NUTRIENTS_ENDPOINT,
            headers=headers,
            params={"app_id": APP_ID, "app_key": APP_KEY},
            json=payload,
        ).json()

        # Per gram values of calories, fat, carbs, protien etc.
        food_dict = {"food_item": food_items[i], "food_item_id": food_items_id[i]}
        food_dict["calories"] = response["calories"]
        food_dict["fat"] = response["totalNutrients"]["FAT"]["quantity"]
        food_dict["carbs"] = response["totalNutrients"]["CHOCDF"]["quantity"]
        food_dict["protein"] = response["totalNutrients"]["PROCNT"]["quantity"]

        food_list.append(food_dict)

    if not height or not age or not weight or not gender or not activity:
        return (
            jsonify(
                {"error": "Bad request", "message": "Please provide all the details"}
            ),
            400,
        )

    bmr = 0
    if gender == "female":
        bmr = 655.1 + ((9.563 * weight) + (1.850 * height) - (4.676 * age))
    elif gender == "male":
        bmr = 66.47 + ((13.75 * weight) + (5.003 * height) - (6.755 * age))

    amr = 0
    if activity == "sedentary":
        amr = bmr * 1.2
    elif activity == "light":
        amr = bmr * 1.375
    elif activity == "moderate":
        amr = bmr * 1.55
    elif activity == "active":
        amr = bmr * 1.725
    elif activity == "very-active":
        amr = bmr * 1.9

    # Required calories per meal in a day 
    required_calories = amr / 3
    print(required_calories)

    
    total_nutrients = {"calories": 0, "fat": 0, "carbs": 0, "protein": 0}
    
    # Create a list to store the food items in the meal plan
    meal_plan = []
    
    # Iterate through the food list and add items to the meal plan until the required calories per meal are met
    for food in food_list:
        # Check if adding the current food item will exceed the required calories per meal

        quantity = random_value = random.randint(50, 200)
        if total_nutrients["calories"] + food["calories"] * quantity <= required_calories:
            # Add the current food item to the meal plan
            meal_plan.append({"food_item": food["food_item"], "quantity": quantity})
            
            # Update the total nutrient information for the meal plan
            total_nutrients["calories"] += food["calories"] * quantity
        else:
            # Stop adding food items once the required calories per meal are met
            break
    
    # Return a json object with the meal plan and total nutrient information
    return jsonify({"meal_plan": meal_plan, "total_nutrients": total_nutrients})
  


# Run the flask server
if __name__ == "__main__":
    app.run(debug=True)
