import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaCalendarCheck, FaTimes, FaUsersCog } from "react-icons/fa";
import { MdCastForEducation, MdEventAvailable } from "react-icons/md";
import useUsersData from '../../hooks/useUserData';
import useTours from '../../hooks/useTours';
import useClubs from '../../hooks/useClubs';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import logo_title from '../../assets/logo-title.png'


const Home = () => {

    const { user } = useContext(AuthContext);
    const { users } = useUsersData();
    const { tours } = useTours();
    const { clubs } = useClubs();




    const [showCalendar, setShowCalendar] = useState(false);

    const handleCalendarToggle = () => {
        setShowCalendar(!showCalendar);
    };

    const handleCloseCalendar = () => {
        setShowCalendar(false);
    };


    return (
        <div className='w-full lg:w-4/5 mx-auto mt-16'>
            <img src={logo_title} alt="" className='object-cover lg:px-0 px-4 w-full mx-auto' />


            <div className="bgGradient py-10 rounded-2xl mt-4 m-2">
                <div className="container mx-auto px-4">
                    {!user ? (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                                Welcome to <span className="bg-yellow-500 text-white px-2 py-1 rounded-lg">UPMS</span>,
                                a Payment System App for CSE Students
                            </h1>

                            <p className="text-xl text-gray-600 mb-8">
                                Please log in to explore and make payments.
                            </p>
                            <Link
                                to="/login"
                                className="text-white bg-blue-500 py-3 px-6 rounded-lg font-semibold hover:bg-blue-600"
                            >
                                Log In
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row justify-around">
                            <div className="md:w-1/2 text-center mb-4">
                                <h1 className="md:text-3xl text-4xl font-bold text-gray-700 mb-2">
                                    Welcome back, {user?.displayName}
                                </h1>
                                <p>Stay up-to-date with important payment deadlines and never miss a payment again.</p>
                            </div>

                            <div className="flex justify-center gap-4 items-center text-2xl">
                                <div className="text-2xl font-semibold">
                                    {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <FaCalendarCheck onClick={handleCalendarToggle} className='text-green-600 hover:text-green-900 cursor-pointer' />
                                {showCalendar && (
                                    <div className="absolute lg:right-80 mt-16">
                                        <div className="relative z-50">
                                            <Calendar onClickDay={handleCalendarToggle} className='shadow-2xl z-50' />
                                            <FaTimes className="absolute -top-2 -right-2 text-white rounded-full cursor-pointer bg-red-400 hover:bg-red-600" onClick={handleCloseCalendar} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                <div className="bg-gray-100 shadow-4xl shadow-gray/40 rounded-md px-3 group">
                    <div className="flex items-center justify-between ">
                        <div className="w-16 h-16 bg-[#FF9671] text-white flex items-center justify-center rounded-lg shadow-xl shadow-[#FF9671]/50 -mt-10 group-hover:-mt-14 duration-300">
                            <FaUsersCog size={40} />
                        </div>
                        <div className="text-right pt-1 pb-2">
                            <span className="text-[#FF9671] font-bold text-4xl drop-shadow-xl count__up">
                                <span>{users?.length || 0}</span>
                            </span>
                            <h3 className="text-dark tracking-wider drop-shadow-xl">Total Students</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 shadow-4xl shadow-gray/40 rounded-md px-3 group">
                    <div className="flex items-center justify-between ">
                        <div className="w-16 h-16 bg-green-700 text-white flex items-center justify-center rounded-lg shadow-xl shadow-green-800/50 -mt-10 group-hover:-mt-14 duration-300">
                            <MdCastForEducation size={40} />
                        </div>
                        <div className="text-right pt-1 pb-2">
                            <span className="text-green-700 text-4xl drop-shadow-xl font-bold count__up">
                                <span>{clubs?.length || 0}</span>
                            </span>
                            <h3 className="text-dark tracking-wider drop-shadow-xl">Total Clubs</h3>
                        </div>
                    </div>

                </div>

                <div className="bg-gray-100 shadow-4xl shadow-gray/40 rounded-md px-3 group">
                    <div className="flex items-center justify-between">
                        <div className="w-16 h-16 bg-blue-700 text-white flex items-center justify-center rounded-lg shadow-xl shadow-blue-800/50 -mt-10 group-hover:-mt-14 duration-300">
                            <MdEventAvailable size={40} />
                        </div>
                        <div className="text-right pt-1 pb-2">
                            <span className="text-blue-700 text-4xl drop-shadow-xl font-bold count__up">
                                <span>{tours?.length || 0}</span>
                            </span>
                            <h3 className="text-dark tracking-wider drop-shadow-xl">Total Events</h3>
                        </div>
                    </div>
                </div>
            </div>






        </div>


    );
};

export default Home;