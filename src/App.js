import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/User/Auth/Login.js';
import Signup from './Components/User/Auth/Signup.js';
import ProfileEdit from './Components/User/ProfileEdit.js';
import Layout from "./Components/Layout/layout.js";
import MyCourses from './Components/MyCourses.js';
import Profile from "./Components/User/Profile.js";
import Courselisting from './Components/courses.js';
import CourseDetails from './Components/courseDetails.js';
import Home from './Components/Home.js';
import HomeLayout from './Components/Layout/homeLayout.js';
import HomeCourseDetails from './Components/homeCourseDetails.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomeLayout />}>
            <Route exact index element={<Home />}></Route>
          </Route>
          <Route path="/home/course/details/:id" element={<HomeLayout />}>
            <Route exact index element={<HomeCourseDetails />}></Route>
          </Route>

          {/* User Auth Routes   */}
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>

          <Route path="user/profile/editProfile" element={<Layout />}>
            <Route index exact element={<ProfileEdit />}></Route>
          </Route>

          <Route path="/user/profile" element={<Layout />}>
            <Route index exact element={<Profile />}></Route>
          </Route>

          <Route path="/courses" element={<Layout />}>
            <Route exact index element={<Courselisting />} />
          </Route>
          <Route path="courses/course/details/:id" element={<Layout />}>
            <Route exact index element={<CourseDetails />} />
          </Route>
          <Route path="/myCourses/course/details/:id" element={<Layout />}>
            <Route exact index element={<CourseDetails />} />
          </Route>

          <Route path="/myCourses" element={<Layout />}>
            <Route exact index element={<MyCourses />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
