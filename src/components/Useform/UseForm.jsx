import React, { useState } from 'react';
import './Useform.css'

function UserForm() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityFactor, setActivityFactor] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Submit the form data to the server here
  }

  return (

    <div className='containerBox '>
        <form onSubmit={handleSubmit}>
      <label>
        Height:
        <input
          type="text"
          value={height}
          onChange={event => setHeight(event.target.value)}
        />
      </label>
      <br />
      <label>
        Weight:
        <input
          type="text"
          value={weight}
          onChange={event => setWeight(event.target.value)}
        />
      </label>
      <br />
      {/* <select>
        Activity Factor:
        <option
          type="select"
          value={activityFactor}
          onChange={event => setActivityFactor(event.target.value)
            // <option value="1">Activity Factor</option>
            <option value="1">1</option>
            <option value="1.2">1.2</option>
            <option value="1.4">1.4</option>
            <option value="1.6">1.6</option>
            <option value="1.8">1.8</option>}
          
        />
      </select> */}
      <label>Activity Factor
      <select class="form-select">
      value={activityFactor}
          onChange={event => setActivityFactor(event.target.value)}
  <option>1</option>
  <option>1.2</option>
  <option>1.4</option>
  <option>1.6</option>
  <option>1.8</option>
  <option>1.2</option>
</select>
      </label>
      
      <br />
      <label>
        Food Preferences:
        <textarea
          value={foodPreferences}
          onChange={event => setFoodPreferences(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
    </div>
  );
}

export default UserForm;
