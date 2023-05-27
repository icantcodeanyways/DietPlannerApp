import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Useform.css";
import { toast } from "react-toastify";

function UserForm() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityFactor, setActivityFactor] = useState();
  const [dietGoal, setDietGoal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Token");
        const userId = jwt_decode(token).user_id;
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const userData = response.data;

        setWeight(userData.weight);
        setHeight(userData.height);
        setActivityFactor(userData.activity_factor);
        setDietGoal(userData.diet_goal);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const payload = {
        height: Number(height),
        weight: Number(weight),
        activity_factor: Number(activityFactor),
        diet_goal: dietGoal,
      };
      console.log(payload);
      const token = localStorage.getItem("Token");
      const userId = jwt_decode(token).user_id;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Data updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured while updating data");
    }
  }

  return (
    <>
      <div className="containerBox">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4">Update user details</h3>
          <label>
            Height:
            <input
              type="text"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </label>
          <label>
            Weight:
            <input
              type="text"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
          </label>
          <label>Activity Factor</label>
          <select
            class="form-select"
            value={activityFactor}
            onChange={(event) => setActivityFactor(event.target.value)}
          >
            <option value="1">1</option>
            <option value="1.2">1.2</option>
            <option value="1.4">1.4</option>
            <option value="1.6">1.6</option>
            <option value="1.8">1.8</option>
          </select>
          <label>Diet goal</label>
          <select
            class="form-select"
            value={dietGoal}
            onChange={(event) => setDietGoal(event.target.value)}
          >
            <option value="gain">Gain weight</option>
            <option value="maintain">Maintain weight</option>
            <option value="lose">Lose weight</option>
          </select>
          <button className="mt-4" type="submit">Update profile</button>
        </form>
      </div>
    </>
  );
}

export default UserForm;
