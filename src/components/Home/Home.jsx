import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import profileimg from '../../assets/profile.png'
import useUsersData from '../../hooks/useUserData';
import useTours from '../../hooks/useTours';
import useClubs from '../../hooks/useClubs';
import { Link } from 'react-router-dom';


const Home = () => {

    const { user } = useContext(AuthContext);
    const { users } = useUsersData();
    const { tours } = useTours();
    const { clubs } = useClubs();

    console.log(clubs);

    return (
        <div className='w-4/5 mx-auto'>
            <div className="bg-gray-200 py-20 rounded-2xl mt-10">
                <div className="container mx-auto px-4">
                    {!user ? (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-black mb-6">
                                Welcome to <span className='badge badge-accent text-black text-4xl'>UniPay</span>, A payment system app for CSE students.
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
                        <div className="flex flex-col md:flex-row items-center justify-center text-center">
                            <div className="md:w-1/2">
                                <h1 className="md:text-3xl text-4xl font-bold text-black mb-6">
                                    Welcome back, {user?.displayName}
                                </h1>
                            </div>
                            <div className="w-36 h-36">
                                <img
                                    src={user?.photoURL}
                                    alt="Profile Picture"
                                    className="w-full rounded-md"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16">
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