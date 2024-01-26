import React, { useEffect, useState } from 'react'
import logo from "../Assets/Media/Images/logo.jpg"
import { Link, useNavigate } from 'react-router-dom';
import '../Assets/Styles/userNav.css'

const HomeNav = () => {
  return (
    <div className="jobapp-nav-home">
      <Link to={'/'}>
        <img className="jobapp-logo" src={logo} alt="logo" />
      </Link>
      <div className="nav-right">
        <div className='top-desktop-nav-home'>
          <Link style={{ textDecoration: 'none' }} to={'/login'}>
            <p className='top-desktop-nav-links-home' >Login</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/signup'}>
            <p className='top-desktop-nav-links-home' >Signup</p>
          </Link>
        </div>
        <div className="job-candidate">
        </div>
      </div>
    </div>
  )
}

export default HomeNav
