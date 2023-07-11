import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Profile from './Profile';

const LeftNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };


  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  }


  return (
    <div>
      {/* Hamburger menu button */}
      {!isOpen && (
        <div className="md:hidden fixed top-0 left-0 m-4 z-50">
          <button
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleNav}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-60 bg-gray-400 shadow-lg z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out `}
      >
        <div className="flex justify-between items-center px-4 py-6">
          <button
            className="p-2 text-white focus:outline-none md:hidden"
            onClick={toggleNav}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex -mt-6 justify-center items-center gap-6 lg:mt-2">
            <Profile></Profile>
            <span className="text-2xl font-bold text-white">UniPay</span>
          </div>

        <nav className="px-4 py-2">
          <ul>
            <li>
              <Link
                to="/"
                className="block py-2 pl-4 text-lg text-white transition-colors duration-300 hover:bg-blue-700 hover:rounded-lg hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/students"
                className="block py-2 pl-4 text-white transition-colors duration-300 hover:bg-blue-700 hover:rounded-lg hover:text-white"
              >
                Students
              </Link>
            </li>

            <li>
              <Link
                to="/club"
                className="block py-2 pl-4 text-white transition-colors duration-300 hover:bg-blue-700 hover:rounded-lg hover:text-white"
              >
                Clubs
              </Link>
            </li>

            <li>
              <Link
                to="/tours"
                className="block py-2 pl-4 text-white transition-colors duration-300 hover:bg-blue-700 hover:rounded-lg hover:text-white"
              >
                Tours
              </Link>
            </li>


            <li>
              <Link
                to="/addtour"
                className="block py-2 pl-4 text-white transition-colors duration-300 hover:bg-blue-700 hover:rounded-lg hover:text-white"
              >
                Add Tour
              </Link>
            </li>
            <li>
              <Link
                to="/addclub"
                className="block py-2 pl-4 text-white transition-colors duration-300 hover:bg-blue-700 hover:rounded-lg hover:text-white"
              >
                Add Clubs
              </Link>
            </li>
            
          </ul>
        </nav>

        {/* Login and Logout Buttons */}

        <div className="absolute bottom-6 left-4">
          {user ? (
            <>
              <button onClick={handleLogOut} className="block px-4 py-2 text-white rounded-lg bg-red-700 hover:bg-red-800">LogOut</button>
            </>
          ) : (
            <>
              <li className="list-none">
                <Link className='block px-4 py-2 text-white rounded-lg bg-blue-700 hover:bg-blue-800 mr-2' to="/login">Login</Link>
              </li>
            </>
          )}
        </div>



      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-screen w-screen bg-black opacity-25 z-30"
          onClick={toggleNav}
        ></div>
      )}
    </div>
  );
};

export default LeftNav;
