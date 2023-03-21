from pulp import *

# Create problem object
prob = LpProblem("Meal Planning", LpMaximize)

# Define food items and their nutritional values per gram
foods = {
    "food1": {
        "calories": 1.5,
        "protein": 0.1,
        "carbs": 0.3,
        "fat": 0.05,
        "vitamin": 0.001,
    },
    "food2": {
        "calories": 2.5,
        "protein": 0.05,
        "carbs": 0.4,
        "fat": 0.07,
        "vitamin": 0.002,
    },
    "food3": {
        "calories": 0.8,
        "protein": 0.2,
        "carbs": 0.05,
        "fat": 0.02,
        "vitamin": 0.005,
    },
    "food4": {
        "calories": 1.2,
        "protein": 0.15,
        "carbs": 0.1,
        "fat": 0.04,
        "vitamin": 0.001,
    },
    "food5": {
        "calories": 3.0,
        "protein": 0.2,
        "carbs": 0.3,
        "fat": 0.1,
        "vitamin": 0.003,
    },
}

# Define decision variables for the quantity of each food item in grams
food_vars = LpVariable.dicts("Food", foods, lowBound=0, cat=LpContinuous)

# Define objective function to maximize calories
prob += lpSum([foods[i]["calories"] * food_vars[i] for i in foods])

# Define constraints for minimum and maximum daily intake in grams
prob += lpSum([foods[i]["protein"] * food_vars[i] for i in foods]) >= 80
prob += lpSum([foods[i]["protein"] * food_vars[i] for i in foods]) <= 150
prob += lpSum([foods[i]["carbs"] * food_vars[i] for i in foods]) >= 200
prob += lpSum([foods[i]["carbs"] * food_vars[i] for i in foods]) <= 300
prob += lpSum([foods[i]["fat"] * food_vars[i] for i in foods]) >= 50
prob += lpSum([foods[i]["fat"] * food_vars[i] for i in foods]) <= 80

# Define constraint for minimum amount of each food item in grams
for i in foods:
    prob += (
        food_vars[i] >= foods[i]["protein"] * 30
    )  # assuming 30 grams of protein from each food item
    prob += (
        food_vars[i] >= foods[i]["carbs"] * 50
    )  # assuming 50 grams of carbs from each food item
    prob += (
        food_vars[i] >= foods[i]["fat"] * 10
    )  # assuming 10 grams of fat from each food item

# Solve the problem
prob.solve()

# Print the optimal meal plan
for i in foods:
    print(f"{i}: {value(food_vars[i])} grams")
