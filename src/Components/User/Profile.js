import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Assets/Styles/UserProfile.css";
import { url } from '../Utils/Constant.js';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  // console.log(profile)

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
      // console.log(response);
    }
    catch (e) {
      console.log('error in verifying token:', e);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container">
      <div className="profile-top-details">
        <div className="profile-details-image">

          <div className="profile-details">

            <div className="person-image">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "140px" }}

              ></i>

            </div>

            <div className="person-info">
              <h2>{profile ? `${profile.fname} ${profile.lname === null ? "" : profile.lname}` : ""} </h2>
              <p className="person-info-desc">
                {profile ? `${profile.email}` : ''}
              </p>
              <p className="person-info-desc">
                {profile ? `${profile.number}` : ''}
              </p>
              <p className="person-info-desc">
                <i className="bi bi-geo-alt-fill"></i>
                {profile ? `${profile.currentLocation === null ? "Current Loaction" : profile.currentLocation}` : ""}
              </p>
            </div>



          </div>

          <Link to="editProfile">
            <button className="edit-details-button">Edit Details</button>
          </Link>
        </div>
        <div className="card-containing-details">
          {/* Education details section */}
          <div className="education-details  detailscard">
            <h3>Education Details</h3>
            <p>ABC Institute of Technology:  </p>
            <p className="input-taken">
              Bachelor of Computer Science
            </p>
            <p className="input-taken">
              Specialization:
            </p>
            <p className="input-taken">
              2020 - 2024
            </p>
            <p>End Date:</p>
            <p className="input-taken">
              Achievement
            </p>
            <p className="input-taken">
              CGPA or Percentage
            </p>
            <div className="education-add1">
              <p>ABC Institute of Technology:  </p>
              <p className="input-taken">
                Bachelor of Computer Science
              </p>
              <p className="input-taken">
                Specialization:
              </p>
              <p className="input-taken">
                2020 - 2024
              </p>
              <p>End Date:</p>
              <p className="input-taken">
                Achievement
              </p>
              <p className="input-taken">
                CGPA or Percentage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;