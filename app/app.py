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
    try:
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
        print(food_list)

        calories = 0
        meal_plan = []

        # Loop through all the food items
        for food in food_list:
            # If it's calorie is 0 then simply add a random value of that food
            if food["calories"] == 0:
                meal_plan.append(
                    {"food_item": food["food_item"], "quantity": random.randint(10, 60)}
                )
                continue

            # Calculate how much of that food item is needed to make upto the required caloire
            max_qty = int(required_calories / food["calories"])
            if max_qty >= 50:
                quantity = random.randint(50, max_qty)
                if (calories + food["calories"] * quantity) <= required_calories:
                    meal_plan.append({"food_item": food["food_item"], "quantity": quantity})
                    calories += food["calories"] * quantity

        if len(meal_plan) != len(food_list):
            meal_plan.append(
                {
                    "food_item": food_list[-1]["food_item"],
                    "quantity": int((required_calories - calories) / food_list[-1]["calories"]),
                }
            )

        # Return a json object with the meal plan and total nutrient information
        return render_template("diet.html", meal_plan=meal_plan)
    except:
        return render_template("error.html")

# Run the flask server
if __name__ == "__main__":
    app.run(debug=True)
