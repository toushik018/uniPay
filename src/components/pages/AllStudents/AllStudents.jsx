// import React, { useState, useEffect } from 'react';
// import { MdAdminPanelSettings, MdDeleteForever } from 'react-icons/md';
// import useUsersData from '../../../hooks/useUserData';
// import ReactPaginate from 'react-paginate';
// import 'tailwindcss/tailwind.css';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

// const AllStudents = () => {
//     const { users, refetch } = useUsersData();
//     const [currentPage, setCurrentPage] = useState(0);
//     const [activeTab, setActiveTab] = useState('students');
//     const usersPerPage = 5;
//     const pageCount = Math.ceil(users.length / usersPerPage);

//     const handlePageChange = ({ selected }) => {
//         setCurrentPage(selected);
//     };

//     const displayedUsers = users.slice(
//         currentPage * usersPerPage,
//         (currentPage + 1) * usersPerPage
//     );

//     const makeAdmin = async (user) => {
//         fetch(`http://localhost:5000/users/admin/${user._id}`, {
//             method: 'PATCH',
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 if (data.modifiedCount) {
//                     refetch();
//                     alert('User promoted to admin');
//                 }
//             });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="lg:max-w-7xl mx-auto py-8 px-4 sm:px-6 md:pl-16 lg:pl-16">
//                 <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-16 pb-4">

//                     <div className="mb-4">
//                         <button
//                             className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-l ${activeTab === 'students' ? 'bg-orange-600 text-white' : ''
//                                 }`}
//                             onClick={() => setActiveTab('students')}
//                         >
//                             All Students
//                         </button>
//                         <button
//                             className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-r ${activeTab === 'adminRequests' ? 'bg-orange-600 text-white' : ''
//                                 }`}
//                             onClick={() => setActiveTab('adminRequests')}
//                         >
//                             Admin Requests
//                         </button>
//                     </div>
//                     <h2 className="text-center text-3xl my-4">All Students</h2>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-orange-200">
//                                 <tr>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                                         ID
//                                     </th>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                                         Name
//                                     </th>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                                         Role
//                                     </th>
//                                     <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {displayedUsers.map((user) => (
//                                     <tr key={user._id}>
//                                         <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
//                                             {user.id}
//                                         </td>
//                                         <td className="px-4 py-3 whitespace-nowrap text-base text-gray-500">
//                                             {user.name}
//                                         </td>
//                                         <td className="px-4 py-3 whitespace-nowrap text-base text-gray-500">
//                                             {user.role === 'admin' ? (
//                                                 <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
//                                                     Admin
//                                                 </span>
//                                             ) : (
//                                                 <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
//                                                     Student
//                                                 </span>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
//                                             <button
//                                                 onClick={() => makeAdmin(user)}
//                                                 disabled={user?.role === 'admin'}
//                                                 className="text-green-600 hover:text-green-900 text-3xl"
//                                             >
//                                                 <MdAdminPanelSettings />
//                                             </button>
//                                             <button className="text-red-600 hover:text-red-900 ml-2 text-3xl">
//                                                 <MdDeleteForever />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     <ReactPaginate
//                         previousLabel={<FaAngleDoubleLeft />}
//                         nextLabel={<FaAngleDoubleRight />}
//                         pageCount={pageCount}
//                         marginPagesDisplayed={2}
//                         pageRangeDisplayed={5}
//                         onPageChange={handlePageChange}
//                         containerClassName={'flex justify-center mt-4'}
//                         pageClassName={'mx-2 px-2 text-xl py-1 border rounded-full font-bold hover:bg-orange-200 cursor-pointer transition duration-300 ease-in-out'}
//                         activeClassName={'bg-orange-500 text-white'}
//                         previousClassName={'mx-2 text-2xl flex items-center opacity-25 hover:opacity-100 duration-500 rounded-md cursor-pointer font-semibold'}
//                         nextClassName={'mx-2 text-2xl flex items-center opacity-25 hover:opacity-100 duration-500 rounded-md cursor-pointer font-semibold'}
//                         breakClassName={'mx-2 px-3 py-2 border rounded-md hover:bg-orange-200 cursor-pointer'}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllStudents;


import React, { useState } from 'react';
import { MdAdminPanelSettings, MdDeleteForever } from 'react-icons/md';
import useUsersData from '../../../hooks/useUserData';
import ReactPaginate from 'react-paginate';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllStudents = () => {
  const { users, refetch } = useUsersData();
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState('students');
  const usersPerPage = 5;


  const students = users.filter((user) => !user.role);
  const teacherAdmins = users.filter((user) => user.role === 'teacher');
  const admins = users.filter((user) => user.role === 'admin');
  const pageCount =
    activeTab === 'students'
      ? Math.ceil(students.length / usersPerPage)
      : activeTab === 'adminRequests'
        ? Math.ceil(teacherAdmins.length / usersPerPage)
        : Math.ceil(admins.length / usersPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedUsers =
    activeTab === 'students'
      ? students.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage)
      : activeTab === 'adminRequests'
        ? teacherAdmins.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage)
        : admins.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

  const makeAdmin = async (user) => {
    // Check if the user has the teacher role before promoting to admin
    if (user.role === 'teacher') {
      // Show a confirmation dialog
      Swal.fire({
        title: 'Approval',
        html: `Are you sure you want to approve <strong>${user.name}</strong>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, approve!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Make the API call to promote user to admin
          fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH',
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.modifiedCount) {
                // Refetch the user data and update the UI
                refetch();
                // Show a success alert
                Swal.fire(
                  'Promoted!',
                  'User has been promoted to admin.',
                  'success'
                );
              }
            })
            .catch((error) => {
              // Handle any errors with an error alert
              Swal.fire(
                'Error!',
                'An error occurred while promoting the user to admin.',
                'error'
              );
            });
        }
      });
    } else {
      // If the user doesn't have the teacher role, show an error message
      Swal.fire(
        'Error!',
        'Only teachers can be promoted to admin.',
        'error'
      );
    }
  };

  const deleteUser = (user) => {
    // Show a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes," make the API call to delete the user
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              // Refetch the user data and update the UI
              refetch();
              // Show a success alert
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              );
            }
          })
          .catch((error) => {
            // Handle any errors with an error alert
            Swal.fire(
              'Error!',
              'An error occurred while deleting the user.',
              'error'
            );
          });
      }
    });
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:max-w-7xl mx-auto py-8 px-4 sm:px-6 md:pl-16 lg:pl-16">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-16 pb-4">
          <div className="mb-4 mt-4 lg:mx-4 lg:text-left text-center">
            <button
              className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-l ${activeTab === 'students' ? 'bg-orange-600 text-white' : ''
                }`}
              onClick={() => setActiveTab('students')}
            >
              All Students
            </button>
            <button
              className={`bg-gray-200 text-gray-700 py-2 px-4 ${activeTab === 'adminRequests' ? 'bg-orange-600 text-white' : ''
                }`}
              onClick={() => setActiveTab('adminRequests')}
            >
              Admin Requests
            </button>
            <button
              className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-r ${activeTab === 'admins' ? 'bg-orange-600 text-white' : ''
                }`}
              onClick={() => setActiveTab('admins')}
            >
              Admins
            </button>
          </div>
          <h2 className="text-center text-3xl my-4">
            {activeTab === 'students'
              ? 'All Students'
              : activeTab === 'adminRequests'
                ? 'Admin Requests'
                : 'Admins'}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
                      {activeTab === 'adminRequests' || activeTab === 'admins'
                        ? user.teacherId || 'N/A'
                        : user.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-base text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-base text-gray-500">
                      {user.role === 'admin' ? (
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          Admin
                        </span>
                      ) : user.role === 'teacher' ? (
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          Teacher
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-50 rounded-full">
                          Student
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {activeTab === 'adminRequests' && (
                        <button
                          onClick={() => makeAdmin(user)}
                          disabled={user.role === 'admin'}
                          className="text-green-600 hover:text-green-900 text-3xl"
                        >
                          <MdAdminPanelSettings />
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(user)}
                        className="text-red-600 hover:text-red-900 ml-2 text-3xl"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={<FaAngleDoubleLeft />}
            nextLabel={<FaAngleDoubleRight />}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'flex justify-center mt-4'}
            pageClassName={
              'mx-2 px-2 text-xl py-1 border rounded-full font-bold hover:bg-orange-200 cursor-pointer transition duration-300 ease-in-out'
            }
            activeClassName={'bg-orange-500 text-white'}
            previousClassName={
              'mx-2 text-2xl flex items-center opacity-25 hover:opacity-100 duration-500 rounded-md cursor-pointer font-semibold'
            }
            nextClassName={
              'mx-2 text-2xl flex items-center opacity-25 hover:opacity-100 duration-500 rounded-md cursor-pointer font-semibold'
            }
            breakClassName={'mx-2 px-3 py-2 border rounded-md hover:bg-orange-200 cursor-pointer'}
          />
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
