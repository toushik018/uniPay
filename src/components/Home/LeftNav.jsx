import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Profile from './Profile';
import logo from '../../../public/logo.svg'
import useAdmin from '../../hooks/useAdmin';
import { FaHome, FaMapSigns, FaMoneyCheck, FaRobot, FaUsers, } from 'react-icons/fa';
import { MdAddLocationAlt, MdOutlineLogin, MdOutlineLogout, MdPayment, MdPostAdd } from "react-icons/md";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { AiOutlineCloseCircle } from "react-icons/ai";

const LeftNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {/* Hamburger menu button */}
      {!isOpen && (
        <div className="md:hidden fixed top-0 left-4 m-3 z-50">
          <button
            className="text-gray-800 hover:text-gray-900 focus:outline-none backdrop-blur-md rounded-md"
            onClick={toggleNav}
          >
            <HiOutlineBars3CenterLeft className='text-2xl text-black' />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-60 bg-gray-400 shadow-lg z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto backdrop-blur-md`}
      >
        <div className="flex justify-between items-center px-4 py-6">
          <button
            className="p-2 text-white focus:outline-none md:hidden"
            onClick={toggleNav}
          >
            <AiOutlineCloseCircle className='text-3xl' />
          </button>
        </div>

        <div className="text-center -mt-6 lg:mt-2">
          <Link to='/'>
            <h1 className="text-3xl font-bold text-white w-3/5 mx-auto hover:scale-110 duration-500 font-TitilliumWeb" >DPMS </h1>
          </Link>
        </div>
        <div className='text-center mt-8'>
          <Profile />
          <h2 className='mt-4 font-bold text-lg text-white'>{user?.name}</h2>
          <hr className='w-4/5 mx-auto mt-2' />
        </div>

        <nav className="px-4 py-2 text-start mt-4">
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 py-2 pl-4 text-lg text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
              >
                <FaHome />
                Home
              </Link>
            </li>
            {!isAdmin && (
              <>
                <li>
                  <Link
                    to="/tours"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <FaMapSigns />
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clubs"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <FaRobot />
                    Clubs
                  </Link>
                </li>
                {user && (
                  <>
                    <li>
                      <Link
                        to="/my-payments"
                        className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                      >
                        <MdPayment />
                        My Payments
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/my-profile"
                        className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                      >
                        <MdPayment />
                        My Profile
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/students"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <FaUsers />
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tours"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <FaMapSigns />
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clubs"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <FaRobot />
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addtour"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <MdAddLocationAlt />
                    Add Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addclub"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <MdPostAdd />
                    Add Clubs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transaction-history"
                    className="flex items-center gap-2 py-2 pl-4 text-white transition-colors duration-300 hover:bg-orange-600 hover:rounded-lg hover:text-white"
                  >
                    <FaMoneyCheck />
                    Payment History
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Login and Logout Buttons */}

        <div className=" mt-6 ml-4">
          {user ? (
            <>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 flex gap-2 justify-between items-center border-2 border-orange-400 text-gray-200 font-semibold rounded-md hover:rounded-full bg-orange-500 hover:text-white transition-transform duration-500 ease-in-out"
              >
                <MdOutlineLogout /> Log Out
              </button>
            </>
          ) : (
            <>

              <Link to='/login'>
                <button className="px-4 py-2 flex gap-2 justify-between items-center border-2 border-orange-400 text-gray-200 font-semibold rounded-md hover:rounded-full bg-orange-500 hover:text-white transition-all duration-500 ease-in-out"
                >
                  <MdOutlineLogin /> Login
                </button>
              </Link>

            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-screen w-screen backdrop-blur-sm z-30"
          onClick={toggleNav}
        ></div>
      )}
    </div>
  );
};

export default LeftNav;
