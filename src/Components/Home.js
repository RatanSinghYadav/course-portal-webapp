import React, { useEffect, useState } from 'react';
import './Assets/Styles/courses.css';
import { url } from './Utils/Constant';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import swal from 'sweetalert';

function Home() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    let debounceTimer;

    const debouncedSearch = (value) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            setSearch(value)
        }, 100);
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        debouncedSearch(value);
    }

    //  api call for fetch all courses data

    const fetchAllCourses = async (page) => {
        try {
            const res = await fetch(`${url}/api/v1/user/getcourses?page=${page}&search=${search}`, {
                method: "GET",
                headers: {
                    'token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                }
            })

            const getResponse = await res.json();
            // console.log(getResponse);
            setTotalPages(getResponse.pagination.pageCount)
            setCourses(getResponse.courses);
        } catch (error) {
            console.error("Error while fething the courses:", error);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {

        fetchAllCourses(currentPage);
    }, [currentPage, search, debounceTimer]);




    const pleaseLoginFirst = () => {
        swal({
            title: "Oops",
            text: `You are not LoggedIn! Please login First.`,
            icon: "error",
            button: "Ok",
        });
    }


    return (
        <>
            {/*  desktop view */}
            <div className='container'>
                <h2 className='allCourses-heading-desktop-home'>All Courses</h2>
                <div className='row course-desktop-view-home '>
                    <div className='col search-box'>
                        <div><input value={search} onChange={handleSearch} className='search-input-box' placeholder='Search by Courses, Instructor' /></div>
                        <div>Search</div>
                    </div>
                    <div className='col'>
                        {
                            courses.map((e, id) => {
                                return (

                                    <div key={e._id} className='course-card-box'>
                                        <div className='card-row-1'>
                                            <span>Course Name: {e.courseName}</span>
                                            <span>Instructor: {e.author}</span>
                                        </div>
                                        <div className='card-row-2'>
                                            <span>Status: {e.enrollStatus}</span>
                                            <span>Duration: {e.duration}</span>
                                        </div>
                                        <div className='card-row-3'>
                                            <Link to={`home/course/details/${e._id}`}>
                                                <button className='viewDetails'>View Details</button>
                                            </Link>
                                            <button onClick={pleaseLoginFirst} className='enrollNow'> Enroll Now</button>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className='container course-mobile-view'>
                <h2 className='allCourses-heading-mobile'>All Courses</h2>
                <div className='row'>
                    <div className='col search-box'>
                        <div><input className='search-input-box' placeholder='Search by Courses, Instructor' /></div>
                        <div>Search</div>
                    </div>
                    <div className='col'>
                        {
                            courses.map((e, id) => {
                                return (
                                    <>
                                        <div key={e._id} className='course-card-box'>
                                            <div className='card-row-1'>
                                                <span>Course Name: {e.courseName}</span>
                                                <span>Instructor: {e.author}</span>
                                            </div>
                                            <div className='card-row-2'>
                                                <span>Status: {e.enrollStatus}</span>
                                                <span>Duration: {e.duration}</span>
                                            </div>
                                            <div className='card-row-3'>
                                                <Link to={`home/course/details/${e._id}`}>
                                                    <button className='viewDetails'>View Details</button>
                                                </Link>
                                                <button onClick={pleaseLoginFirst} className='enrollNow'> Enroll Now</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <Pagination className='coursePagination'>
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                />
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                        className='pageItem'
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                />
            </Pagination>
        </>
    )
}

export default Home;