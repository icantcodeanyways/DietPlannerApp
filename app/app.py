from flask import Flask, json, jsonify, redirect, render_template, request

app = Flask(__name__)


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
    print(height, weight, age, gender, activity)

    if not height or not age or not weight or not gender or not activity:
        return (
            jsonify(
                {"error": "Bad request", "message": "Please provide all the details"}
            ),
            400,
        )

    if gender == "female":
        bmr = 655.1 + ((9.563 * weight) + (1.850 * height) - (4.676 * age))
    elif gender == "male":
        bmr = 66.47 + ((13.75 * weight) + (5.003 * height) - (6.755 * age))

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
    return jsonify({"amr": amr, "bmr": bmr})


# Run the flask server
if __name__ == "__main__":
    app.run(debug=True)
