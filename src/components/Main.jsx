import React from 'react'
import NavbarSample from './Navbar/Navbar';
// import { ProSidebarProvider } from 'react-pro-sidebar';

import './Main.css'
import CircularBar from './CircularProgressBar/CircularBar';
import Accord from './Accord/Accord';
// import SideBar from './SideBar/SideBar';



function Main() {
  return (
    <>
      <NavbarSample />
      
      <div className='MainConatiner'>
      {/* <ProSidebarProvider>
        <SideBar />
      </ProSidebarProvider>; */}
        <CircularBar />
        <br />
        <Accord />
      </div>

    </>
  )
}

export default Main