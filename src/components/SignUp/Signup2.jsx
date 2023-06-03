import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarSample from './Navbar/Navbar';
// import ActivityFactorImage from './images/activity_factor.jpg';
// import WeightGoalsImage from './images/weight_goals.jpg';
import active from "./images/active.jpg"
import sedentary from "./images/SEdentary.jpg"
import moderate from "./images/Moderate.jpg"
import Sitting from "./images/Sittingcouch.jpg"
import highlyActive from "./images/highlyactive.jpg"
import gainw from "./images/Weight Gain.jpg"
import loosew from "./images/Weight Loss.jpg"
import maintain from "./images/bg2.jpg"



import "./Signup2.css"

function Signup2() {
  const [activityFactor, setActivityFactor] = useState('');
  const [weightGoals, setWeightGoals] = useState('');

  const handleActivityFactorChange = (event) => {
    setActivityFactor(event.target.value);
  };

  const handleWeightGoalsChange = (event) => {
    setWeightGoals(event.target.value);
  };

  return (
    <div className='Signup2Container'>
      <NavbarSample />

      <div className='col-md-6 mb-4 activityfactor'>
        <h4>Activity Factor</h4>
        <label>
          <input
            type='radio'
            name='activityFactor'
            value='1'
            checked={activityFactor === '1'}
            onChange={handleActivityFactorChange}
          />
          <img className='image' src={Sitting} alt='Activity Factor 1' />
          1 Little/No Activity
        </label>
        <label>
          <input
            type='radio'
            name='activityFactor'
            value='1.2'
            checked={activityFactor === '1.2'}
            onChange={handleActivityFactorChange}
          />
          <img  className="image" src={sedentary} alt='Activity Factor 2' />
          1.2 Sedentary activity
        </label>
        <label>
          <input
            type='radio'
            name='activityFactor'
            value='1.4'
            checked={activityFactor === '1.4'}
            onChange={handleActivityFactorChange}
          />
          <img className="image" src={moderate} alt='Activity Factor 3' />
          1.4 Moderate Activity
        </label>
        <label>
          <input
            type='radio'
            name='activityFactor'
            value='1.6'
            checked={activityFactor === '1.6'}
            onChange={handleActivityFactorChange}
          />
          <img className="image" src={active} alt='Activity Factor 3' />
          1.6 Active Lifestyle
        </label>
        <label>
          <input
            type='radio'
            name='activityFactor'
            value='1.8'
            checked={activityFactor === '1.8'}
            onChange={handleActivityFactorChange}
          />1.8
          <img className="image" src={highlyActive} alt='Activity Factor 3' />
          1.8 Higly Active
        </label>
        {/* Add more options as needed */}
      </div>
      <br />

      <div className='col-md-6 mb-4 weightgoals'>
        <h4>Weight Goals</h4>
        <label>
          <input
            type='radio'
            name='weightGoals'
            value='1'
            checked={weightGoals === '1'}
            onChange={handleWeightGoalsChange}
          />
          <img className='image' src={gainw} alt='Weight Goal 1' />
          Gain Weight
        </label>
        <label>
          <input
            type='radio'
            name='weightGoals'
            value='2'
            checked={weightGoals === '2'}
            onChange={handleWeightGoalsChange}
          />
          <img className='image' src={loosew} alt='Weight Goal 2' />
          Loose Weight
        </label>
        <label>
          <input
            type='radio'
            name='weightGoals'
            value='3'
            checked={weightGoals === '3'}
            onChange={handleWeightGoalsChange}
          />
          <img className="image" src={maintain} alt='Weight Goal 3' />
          Maintain Weight

        </label>
      </div>

      <div className='d-flex justify-content-end pt-3'>
        <Link to='/Main'>
          <button type='button' className='btn btn-warning btn-lg ms-2'>
            Submit form
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signup2;
