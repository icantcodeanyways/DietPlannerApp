import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import './Navbar/Navbar'
import NavbarSample from './Navbar/Navbar';
import './Home.css';


function Home() {
  return (
    <div >
      <NavbarSample />
      <div className='Conatiner1'>
        <div className='Box col-xs-6' style={{float:'right',position:'absolute',right:'20px'}}>
          <div className='TextSection' >
            <h1 style={{color:'white'}}>Sample Text </h1>
            <h3 style={{color:'white'}}>Sample Text </h3>

            </div>
        <Link to='/Signup1' ><Button variant="primary" style={{margin:10}} >SignUp</Button></Link>
        <Link to='/Login' ><Button variant="warning" >Login</Button></Link>
        </div>
        
      </div>


    </div>

  )
}

export default Home