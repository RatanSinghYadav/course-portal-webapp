import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Assets/Styles/sidebar.css'

function Sidebar() {
  const navigate = useNavigate();

  const userLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.clear();
      navigate('/login');
    }
  }

  return (
    <div >
      <div className="desktop-sidebar">
        <div className='desktop-sidebar-container'>
          <Link style={{ textDecoration: 'none' }} to={'/courses'}>
            <p className="desktop-links">Courses</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/myCourses'}>
            <p className='desktop-links'>My Courses</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/user/profile'}>
            <p className='desktop-links' >Profile</p>
          </Link>
          <p className='desktop-links' onClick={userLogout}>Logout</p>
        </div>
      </div>
      <div className="mobile-navbar">
        <div className='mobile-navbar-container'>
          <Link style={{ textDecoration: 'none' }} to={'/courses'}>
            <p className="mobile-links">Courses</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/user/profile'}>
            <p className='mobile-links'>Profile</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/myCourses'}>
            <p className='mobile-links'>My Courses</p>
          </Link>
          <p className='mobile-links' onClick={userLogout}>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar