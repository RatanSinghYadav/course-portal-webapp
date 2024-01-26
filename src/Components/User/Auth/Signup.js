import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcGoogle } from "react-icons/fc";
import ".././../Assets/Styles/UserLogin.css";
import UserSignup from "../../../Components/Assets/Media/Images/UserSignup.png";
import { url } from '../../Utils/Constant.js';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: name,
          email: email,
          password: password,
          number: phone,
          // confirmPassword: confirmPassword,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Login Status:", data.message);
        swal({
          title: "Success",
          text: "You have Successfully Registered!",
          icon: "success",
          button: "Ok",
      });
        navigate("/login");
      }

      // console.log("Signup successful", data);

    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleGoogleSignUp = () => {
 
    console.log("Signing up with Google...");
  };

  const candidateLogin = () => {
    navigate('/login')
  }

  useEffect(() => { 
    if (localStorage.getItem('token')) {
      navigate('/courses');
    }
  }, [])

  return (
    <div className="card-container">
      <div className="login-box">
        <form className="log-form">
          <label className="form-label">
            Name
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="user name"
            />
          </label>
          <br />

          <label className="form-label">
            Email:
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="user@gmail.com"
            />
          </label>
          <br />

          <label className="form-label">
            Phone Number
            <br />
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="phone number"
            />
          </label>
          <br />

          <label className="form-label">
            Password
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="********"
            />
          </label>
          <br />

          <button onClick={handleSignUp} className="login-buttons">Sign Up</button>
          <p className="or-tag">or</p>

       
          <button
            type="button"
            onClick={candidateLogin}
            className="create-button"
          >
            Login
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src={UserSignup} alt="User Signup" className="form-image" />
      </div>
    </div>
  );
};

export default Signup;
