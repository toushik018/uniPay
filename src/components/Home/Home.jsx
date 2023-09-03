import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaCalendarCheck, FaTimes } from "react-icons/fa";
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
            <div className="bg-gray-200 py-10 rounded-2xl mt-4 m-2" >
                <div className="container mx-auto px-4">
                    {!user ? (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-black mb-6">
                                Welcome to <span className='badge badge-warning text-black text-4xl'>UPMS</span>, A payment system app for CSE students.
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
                                <h1 className="md:text-3xl text-4xl font-bold text-gray-700 mb-2 ">
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
                                        <div className="relative">
                                            <Calendar onClickDay={handleCalendarToggle} />
                                            <FaTimes className="absolute -top-2 -right-2 text-white rounded-full cursor-pointer bg-red-400 hover:bg-red-600" onClick={handleCloseCalendar} />
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>
                    )}
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md m-2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Users</h2>
                    <p className="text-gray-600 text-xl">{users?.length}</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md m-2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Tours</h2>
                    <p className="text-gray-600 text-xl">{tours?.length}</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md m-2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Clubs</h2>
                    <p className="text-gray-600 text-xl">{clubs?.length}</p>
                </div>
            </div>
        </div>


    );
};

export default Home;