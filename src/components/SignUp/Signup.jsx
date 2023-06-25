import React, { useState } from "react";
import "./Signup.css";
import { toast } from "react-toastify";
import samplePhoto from "../images/bg4.jpg";
import axios from "axios";
import Loading from "../Loading/Loading";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    activityFactor: "",
    dob: "",
    height: "",
    weight: "",
    dietGoal: "",
  });

  const [loading, setLoading] = useState({ status: false, message: "" });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading({ status: true, message: "Creating account..." });
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        activity_factor: parseFloat(formData.activityFactor),
        dob: new Date(formData.dob).toLocaleDateString("en-GB"),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        diet_goal: formData.dietGoal,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/register`,
        payload
      );

      if (response.status === 201) {
        console.log("success");
        toast.success("Account created successfully. Please login");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
          activityFactor: "",
          dob: "",
          height: "",
          weight: "",
          dietGoal: "",
        });
      }
      setLoading({ status: false, message: "" });
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(
          "A user already exist with that email address. Please login or use a different email address"
        );
      } else if (error.response.status === 400) {
        toast.error(
          "Invalid user details. Please check the data you have entered and try again"
        );
      } else {
        toast.error("An orror occured");
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        activityFactor: "",
        dob: "",
        height: "",
        weight: "",
        dietGoal: "",
      });
      setLoading({ status: false, message: "" });

      console.log(error.response.data);
    }
  }

  return (
    <div className="Signup1Container">
      {loading.status && <Loading message={loading.message} />}
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src={samplePhoto}
                      className="img-fluid h-100"
                      alt=""
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                      }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">
                        Registration Details
                      </h3>

                      <form onSubmit={handleRegister}>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                name="firstName"
                                placeholder="Enter your first name"
                                onChange={handleFormChange}
                                required
                                value={formData.firstName}
                              />
                              <label
                                className="form-label"
                                for="form3Example1m"
                              >
                                First name
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="form3Example1n"
                                className="form-control form-control-lg"
                                required
                                placeholder="Enter your last name"
                                name="lastName"
                                onChange={handleFormChange}
                                value={formData.lastName}
                              />
                              <label
                                className="form-label"
                                for="form3Example1n"
                              >
                                Last name
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="email"
                                id="form3Example1m1"
                                className="form-control form-control-lg"
                                placeholder="Enter your Email "
                                name="email"
                                required
                                onChange={handleFormChange}
                                value={formData.email}
                              />
                              <label
                                className="form-label"
                                for="form3Example1m1"
                              >
                                Email
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="password"
                                id="form3Example1n1"
                                className="form-control form-control-lg"
                                placeholder="Create new password"
                                name="password"
                                required
                                onChange={handleFormChange}
                                value={formData.password}
                              />
                              <label
                                className="form-label"
                                for="form3Example1n1"
                              >
                                Password
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="password"
                                id="form3Example1n1"
                                className="form-control form-control-lg"
                                required
                                placeholder="Confirm password"
                                name="confirmPassword"
                                onChange={handleFormChange}
                                value={formData.confirmPassword}
                              />
                              <label
                                className="form-label"
                                for="form3Example1n1"
                              >
                                Confirm password
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                          <h6 className="mb-0 me-4">Gender: </h6>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              onChange={handleFormChange}
                              value="female"
                              name="gender"
                              checked={formData.gender === "female"}
                              required
                              id="femaleGender"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="femaleGender"
                            >
                              Female
                            </label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="maleGender"
                              required
                              checked={formData.gender === "male"}
                              onChange={handleFormChange}
                              value="male"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="maleGender"
                            >
                              Male
                            </label>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6 mb-4">
                            <select
                              name="activityFactor"
                              value={formData.activityFactor}
                              style={{
                                maxWidth: "400px",
                                overflow: "auto",
                              }}
                              className="select"
                              required
                              onChange={handleFormChange}
                            >
                              <option value="1">Activity Factor</option>
                              <option value="1">
                                Sedentary (Little or no exercise)
                              </option>
                              <option value="1.2">
                                Mild activity (Intensive exercise for at least
                                20 mins per week)
                              </option>
                              <option value="1.4">
                                Moderate activity (Intensive exercise for at
                                least 30 to 60 mins 3 times per week)
                              </option>
                              <option value="1.6">
                                Heavy activity (Intensive exercise for 60 mins
                                for at least 5 times per week)
                              </option>
                              <option value="1.8">
                                Extreme activity (Daily intense exercise for at
                                least 3 hours)
                              </option>{" "}
                            </select>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6 mb-4">
                            <select
                              name="dietGoal"
                              value={formData.dietGoal}
                              className="select"
                              required
                              onChange={handleFormChange}
                            >
                              <option>Diet Goal</option>
                              <option value="gain">Gain weight</option>
                              <option value="maintain">Maintain weight</option>
                              <option value="lose">Lose weight</option>
                            </select>
                          </div>
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            name="dob"
                            required
                            onChange={handleFormChange}
                            value={formData.dob}
                          />
                          <label className="form-label" for="form3Example9">
                            DOB
                          </label>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="number"
                                className="form-control form-control-lg"
                                name="height"
                                required
                                onChange={handleFormChange}
                                value={formData.height}
                              />
                              <label className="form-label">Height(cm)</label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="number"
                                name="weight"
                                className="form-control form-control-lg"
                                required
                                onChange={handleFormChange}
                                value={formData.weight}
                              />
                              <label className="form-label">Weight(kg)</label>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center pt-3">
                          <button
                            type="submit"
                            className="btn btn-warning btn-lg ms-2"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
