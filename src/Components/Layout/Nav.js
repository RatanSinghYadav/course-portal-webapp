import React, { useEffect, useState } from 'react'
import logo from "../Assets/Media/Images/logo.jpg"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../Utils/Constant.js';
import '../Assets/Styles/userNav.css'

const Nav = () => {
  const navigate = useNavigate();

  // const[user, setUser] = useState();

  const checkToken = async () => {
    try {
      const response = await fetch(`${url}/verifyuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
      });
      const data = await response.json();
      // console.log(data.data.avatar.filename);
      // setUser(data);
      // console.log(response);
    }
    catch (e) {
      console.log('error in verifying token:', e);
    }
  }


  //  fetch user profile 

  const [profile, setProfile] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${url}/api/v1/user/getUserData`, {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      const getResponse = await response.json();
      // console.log(getResponse);
      setProfile(getResponse.user);
    }
    catch (e) {
      console.log('error in verifying token:', e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      } else {
        await checkToken();
      }
    };

    fetchProfile();
    fetchData();
  }, []);

  const userLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.clear();
      navigate('/login');
    }
  }

  return (
    <div className="jobapp-nav">
      <Link to={'/courses'}>
        <img className="jobapp-logo" src={logo} alt="logo" />
      </Link>
      <div className="nav-right">
        <div className='top-desktop-nav'>
          <Link style={{ textDecoration: 'none' }} to={'/courses'}>
            <p className='top-desktop-nav-links'>Courses</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/user/profile'}>
            <p className='top-desktop-nav-links' >Profile</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/myCourses'}>
            <p className='top-desktop-nav-links' >My Courses</p>
          </Link>
        </div>
        <p className='profileLogoName'>{profile && profile.fname ? profile.fname[0] : ""}</p>
        <div className="job-candidate">
          <div style={{ fontWeight: "500" }}> {profile ? `${profile.fname} ${profile.lname === null ? "" : profile.lname}` : ""}</div>
          <button onClick={userLogout} className="job-btn">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Nav
