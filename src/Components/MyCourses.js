import React, { useEffect, useState } from 'react';
import './Assets/Styles/MyCourses.css';
import { url } from './Utils/Constant';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Img from './Assets/Media/Images/nodata.png'

const MyApplication = () => {
  const [myCourses, setMyCourses] = useState([]);


  const fetchMyCourses = async () => {
    try {
      const response = await fetch(`${url}/api/v1/user/getEnrolledCourses`, {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      const getResponse = await response.json();
      // console.log(getResponse);

      setMyCourses(getResponse.enrolledCourses.courses);
    } catch (e) {
      console.log('Error in verifying token:', e);
    }
  };

  // Show a Yes/No dialog on before Delete

  const showDeleteEnrollCourseModal = (id) => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Enrolled Course!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your Enrolled Course has been deleted!", {
          icon: "success",
        });
        deleteEnrollCourse(id);
      } else {
        swal("Your Enrolled Course is safe!");
      }
    });
  }


  const deleteEnrollCourse = async (id) => {

    try {
      const res = await fetch(`${url}/api/v1/user/course/delete/${id}`, {
        method: "GET",
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })

      const getRes = await res.json();
      // console.log(getRes);
      fetchMyCourses();

    } catch (error) {
      console.log("Error while deleting courses", error);
    }
  }

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <>
      {/* desktop view */}
      <div className="container table-container-desktop">
        <div className='mycourses-main-heading'>
          My Enrolled Courses
        </div>
        <div className='mycoruse-table-container'>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Location</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody className='table-body'>
              {
                myCourses.length === 0 ?
                  <>
                    <tr>
                      <td colSpan="7" className="image-row">
                        <img src={Img} className='noData' alt='nodata' />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="7" className="noDataText">
                        No Data Found!
                      </td>
                    </tr>
                  </>
                  :
                  myCourses.map((e) => (
                    <tr key={e._id}>
                      <td>{e.courseName}</td>
                      <td>{e.author}</td>
                      <td>
                        <span className={`${e.location === 'Online' ? 'statusOnline' : 'statusOnsite'}`}>{e.location}</span>
                      </td>
                      <td>
                        <span className={`${e.enrollStatus === 'Open' ? 'statusOpen' : 'statusClosed'}`}>{e.enrollStatus}</span>
                      </td>
                      <td>{e.duration}</td>
                      <td>
                        <i onClick={() => showDeleteEnrollCourseModal(e._id)} class="bi bi-trash-fill"></i>
                      </td>
                      <td>
                        <Link to={`course/details/${e._id}`}>
                          <button className='viewDetailsOnMyCourse'>View Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))

              }
            </tbody>
          </table>
        </div>
      </div>

      {/* mobile view */}
      <div className="container table-container-mobile">
        <div className='mycourses-main-heading-mobile'>
          My Enrolled Courses
        </div>
        <div className='mycoruse-table-container'>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Location</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody className='table-body'>

              {
                myCourses.length === 0 ?

                  <>
                    <tr>
                      <td colSpan="7" className="image-row">
                        <img src={Img} className='noData' alt='nodata' />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="7" className="noDataText">
                        No Data Found!
                      </td>
                    </tr>
                  </>
                  :
                  myCourses.map((e) => (
                    <tr key={e._id}>
                      <td>{e.courseName}</td>
                      <td>{e.author}</td>
                      <td>
                        <span className={`${e.location === 'Online' ? 'statusOnline' : 'statusOnsite'}`}>{e.location}</span>
                      </td>
                      <td>
                        <span className={`${e.enrollStatus === 'Open' ? 'statusOpen' : 'statusClosed'}`}>{e.enrollStatus}</span>
                      </td>
                      <td>{e.duration}</td>
                      <td>
                        <i onClick={() => showDeleteEnrollCourseModal(e._id)} class="bi bi-trash-fill"></i>
                      </td>
                      <td>
                        <Link to={`course/details/${e._id}`}>
                          <button className='viewDetailsOnMyCourse'>View Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))

              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MyApplication;


