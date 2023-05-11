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
      <label>
        Activity Factor:
        <input
          type="text"
          value={activityFactor}
          onChange={event => setActivityFactor(event.target.value)}
        />
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
