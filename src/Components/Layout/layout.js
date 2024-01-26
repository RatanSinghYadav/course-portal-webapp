import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Layout/Nav.js'
import Sidebar from './Sidebar.js'


function Layout() {
  return (
    <>
      <Navbar />
      <Sidebar/>
      <Outlet />
    </>
  )
}

export default Layout