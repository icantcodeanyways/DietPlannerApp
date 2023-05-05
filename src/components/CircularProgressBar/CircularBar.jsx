import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularBar.css';
function CircularBar() {
    return (
        <>
            <div className='Box1'>
                <h4>Calories:000/000</h4>
                <div className='Box2'>
                    <div className='CircularBox' style={{ width: 150, height: 150 }}>
                        <CircularProgressbar value={50} 
                        text={'50%'}
                        />
                    </div>
                </div>
                <div>
                    
                Carbohydrates <ProgressBar animated now={80}/>
                Protein <ProgressBar variant='warning' animated now={45} />
                Fat <ProgressBar variant='danger' animated now={70}  />
                </div>
            </div>
        </>
    )
}

export default CircularBar