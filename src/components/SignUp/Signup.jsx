import React, { useState } from "react";
import "./Signup.css";
// import { Link } from "react-router-dom";
// import { Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-toastify";
import samplePhoto from "../images/bg4.jpg";
import axios from "axios";

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
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="Signup1Container">
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
                              value="male"
                              name="gender"
                              required
                              id="femaleGender"
                            />
                            <label
                              className="form-check-label"
                              for="femaleGender"
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
                              onChange={handleFormChange}
                              value="female"
                            />
                            <label
                              className="form-check-label"
                              for="maleGender"
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
                              className="select"
                              required
                              onChange={handleFormChange}
                            >
                              <option value="1">Activity Factor</option>
                              <option value="1">1</option>
                              <option value="1.2">1.2</option>
                              <option value="1.4">1.4</option>
                              <option value="1.6">1.6</option>
                              <option value="1.8">1.8</option>
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
                              <option value="maintain">Diet Goal</option>
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
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            Reset all
                          </button>
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
