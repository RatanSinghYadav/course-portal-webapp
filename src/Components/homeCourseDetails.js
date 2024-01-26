import React, { useEffect, useState } from 'react';
import { url } from './Utils/Constant';
import { useNavigate, useParams } from 'react-router-dom';
import '../Components/Assets/Styles/courseDetails.css';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';

function HomeCourseDetails() {
    const [courseDetail, setCourseDetails] = useState();

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    // console.log(courseDetail);
    const { id } = useParams('');

    const showCourseDetail = async () => {
        const res = await fetch(`${url}/api/v1/user/course/detail/${id}`, {
            method: "GET",
            headers: {
                'token': localStorage.getItem('token'),
                "Content-Type": 'application/json',
            }
        })

        const getOneCourseDetail = await res.json();
        // console.log(getOneCourseDetail.details);

        setCourseDetails(getOneCourseDetail.details)
    }

    useEffect(() => {
        showCourseDetail();
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/courses');
        }
    }, [])


    return (
        <>
            {/* desktop view */}
            <h2 className='course-details-heading-desktop-home'>Course Details</h2>
            <div className='container course-details-container-desktop-home'>
                <div className='row course-details-row'>
                    <div className='col course-details-col-1'>
                        <div>
                            <h4>{courseDetail && courseDetail.courseName ? courseDetail.courseName : "Course Name"}</h4>
                        </div>
                        <div className='course-details-box-2'>
                            <div className='course-details-box-2-1'>
                                <h6>Instructor Name</h6>
                                {courseDetail && courseDetail.author ? courseDetail.author : ""}
                            </div>
                            <div className='course-details-box-2-1'>
                                <h6>Enrollment Status</h6>
                                <span className={`${courseDetail && courseDetail.enrollStatus === 'Open' ?
                                    'statusOpen' : 'statusClosed'}`}>
                                    {courseDetail && courseDetail.enrollStatus ? courseDetail.enrollStatus : ""}
                                </span>
                            </div>
                            <div className='course-details-box-2-1'>
                                <h6>Course Duration</h6>
                                {courseDetail && courseDetail.duration ? courseDetail.duration : ""}
                            </div>
                        </div>
                        <div className='course-details-box-3'>
                            <div>
                                <h6>Pre-Requisites</h6>
                                {courseDetail && courseDetail.preRequisites ?
                                    courseDetail.preRequisites.map(e => <>{e}, </>) : ""}
                            </div>
                            <div>
                                <h6>Location</h6>
                                <span className={`${courseDetail && courseDetail.location === 'Online' ?
                                    'statusOnline' : 'statusOnsite'}`}>
                                    {courseDetail && courseDetail.location ? courseDetail.location : ""}
                                </span>
                            </div>
                        </div>
                        <div className='course-details-box-4 mb-3'>
                            <div>
                                <h6>Schedule</h6>
                                {courseDetail && courseDetail.schedule ?
                                    courseDetail.schedule : ""}
                            </div>
                        </div>
                    </div>
                    <div className='col mt-3'>
                        <div>
                            <h6>About the Course</h6>
                            {courseDetail && courseDetail.description ? courseDetail.description : ""}

                        </div>
                    </div>
                    <div className='col'>
                        <div className="expandable-box">
                            <div className="box-header" onClick={toggleExpansion}>
                                <h5>Syllabus</h5>
                                {isExpanded ? <BiChevronUp style={{ fontSize: '2rem' }} /> : <BiChevronDown style={{ fontSize: '2rem' }} />}
                            </div>
                            {isExpanded && (
                                <div className="box-content">
                                    {courseDetail && courseDetail.syllabus ?
                                        courseDetail.syllabus.map((e) => {
                                            return (
                                                <>
                                                    <div>
                                                        <div>Week - {e.week}
                                                            <button className="btn" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                                <i className="bi bi-chevron-down"></i>
                                                            </button>
                                                        </div>
                                                        <div>

                                                            <div className="collapse" id="collapseExample">
                                                                <div className="card card-body">
                                                                    <li><span className='content-heading'>Week</span>  - {e.week}</li>
                                                                    <li><span className='content-heading'>Content</span>  : {e.content}</li>
                                                                    <li><span className='content-heading'>Topic</span>  : {e.topic}</li>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                        :
                                        ""
                                    }
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            {/* mobile view */}
            <h2 className='course-details-heading-mobile'>Course Details</h2>
            <div className='container course-details-container-mobile'>
                <div className='row course-details-row'>
                    <div className='col course-details-col-1'>
                        <div>
                            <h4>{courseDetail && courseDetail.courseName ? courseDetail.courseName : "Course Name"}</h4>
                        </div>
                        <div className='course-details-box-2'>
                            <div className='course-details-box-2-1'>
                                <h6>Instructor Name</h6>
                                {courseDetail && courseDetail.author ? courseDetail.author : ""}
                            </div>
                            <div className='course-details-box-2-1'>
                                <h6>Enrollment Status</h6>
                                <span className={`${courseDetail && courseDetail.enrollStatus === 'Open' ?
                                    'statusOpen' : 'statusClosed'}`}>
                                    {courseDetail && courseDetail.enrollStatus ? courseDetail.enrollStatus : ""}
                                </span>
                            </div>
                            <div className='course-details-box-2-1'>
                                <h6>Course Duration</h6>
                                {courseDetail && courseDetail.duration ? courseDetail.duration : ""}
                            </div>
                        </div>
                        <div className='course-details-box-3'>
                            <div>
                                <h6>Pre-Requisites</h6>
                                {courseDetail && courseDetail.preRequisites ?
                                    courseDetail.preRequisites.map(e => <>{e}, </>) : ""}
                            </div>
                            <div>
                                <h6>Location</h6>
                                <span className={`${courseDetail && courseDetail.location === 'Online' ?
                                    'statusOnline' : 'statusOnsite'}`}>
                                    {courseDetail && courseDetail.location ? courseDetail.location : ""}
                                </span>
                            </div>
                        </div>
                        <div className='course-details-box-4 mb-3'>
                            <div>
                                <h6>Schedule</h6>
                                {courseDetail && courseDetail.schedule ?
                                    courseDetail.schedule : ""}
                            </div>
                        </div>
                    </div>
                    <div className='col mt-3'>
                        <div>
                            <h6>About the Course</h6>
                            {courseDetail && courseDetail.description ? courseDetail.description : ""}

                        </div>
                    </div>
                    <div className='col'>
                        <div className="expandable-box">
                            <div className="box-header" onClick={toggleExpansion}>
                                <h5>Syllabus</h5>
                                {isExpanded ? <BiChevronUp style={{ fontSize: '2rem' }} /> : <BiChevronDown style={{ fontSize: '2rem' }} />}
                            </div>
                            {isExpanded && (
                                <div className="box-content">
                                    {courseDetail && courseDetail.syllabus ?
                                        courseDetail.syllabus.map((e) => {
                                            return (
                                                <>
                                                    <div>
                                                        <div>Week - {e.week}
                                                            <button className="btn" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                                <i className="bi bi-chevron-down"></i>
                                                            </button>
                                                        </div>
                                                        <div>

                                                            <div className="collapse" id="collapseExample">
                                                                <div className="card card-body">
                                                                    <li><span className='content-heading'>Week</span>  - {e.week}</li>
                                                                    <li><span className='content-heading'>Content</span>  : {e.content}</li>
                                                                    <li><span className='content-heading'>Topic</span>  : {e.topic}</li>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                        :
                                        ""
                                    }
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeCourseDetails