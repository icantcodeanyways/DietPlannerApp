import React from 'react'
// import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import './Accord.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Accord() {
    return (
        <>
            <div className='AccordBox container'>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Breakfast </Accordion.Header>
                        <Accordion.Body>
                            <div className='BreakDiv'>
                                Carbohydrates <ProgressBar animated now={80} />
                                Protein <ProgressBar variant='warning' animated now={45} />
                                Fat <ProgressBar variant='danger' animated now={70} />
                            </div>
                            <br />
                            <div class=" buttons">
                    <button class="button"><span></span>Recommend</button>
                    <button class="button button2"><span></span>Add</button>
                    <button class="button button3 "><span></span>Track</button>
                </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Lunch </Accordion.Header>
                        <Accordion.Body>
                            Carbohydrates <ProgressBar animated now={30} />
                            Protein <ProgressBar variant='warning' animated now={35} />
                            Fat <ProgressBar variant='danger' animated now={20} />
                            <br />
                            <div class=" buttons">
                    <button class="button"><span></span>Recommend</button>
                    <button class="button button2"><span></span>Add</button>
                    <button class="button button3 "><span></span>Track</button>
                </div>
                        </Accordion.Body>

                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Dinner </Accordion.Header>
                        <Accordion.Body>
                            Carbohydrates <ProgressBar animated now={50} />
                            Protein <ProgressBar variant='warning' animated now={25} />
                            Fat <ProgressBar variant='danger' animated now={40} />
                            <br />
                            <div class=" buttons">
                    <button class="button"><span></span>Recommend</button>
                    <button class="button button2"><span></span>Add</button>
                    <button class="button button3 "><span></span>Track</button>
                </div>
                        </Accordion.Body>

                    </Accordion.Item>
                </Accordion>
            </div>
        </>

    )
}

export default Accord