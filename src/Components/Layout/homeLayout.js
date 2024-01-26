import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNavbar from './HomeNavbar'


function HomeLayout() {
  return (
    <>
      <HomeNavbar />
      <Outlet />
    </>
  )
}

export default HomeLayout