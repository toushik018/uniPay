// import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';


// const PaymentHistory = () => {
//   const [clubPayments, setClubPayments] = useState([]);
//   const [tourPayments, setTourPayments] = useState([]);
//   const [activeTab, setActiveTab] = useState('events');
//   const [currentPage, setCurrentPage] = useState(0);

//   const paymentsPerPage = 5;

//   useEffect(() => {
//     fetch("http://localhost:5000/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setClubPayments(data);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:5000/tourorders")
//       .then((res) => res.json())
//       .then((data) => {
//         setTourPayments(data);
//       });
//   }, []);

//   // Handle page change
//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   // Calculate the slice range for displaying payments on the current page
//   const startIndex = currentPage * paymentsPerPage;
//   const endIndex = startIndex + paymentsPerPage;
//   const displayedPayments = activeTab === 'clubs' ? clubPayments : tourPayments;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-16 p-4">

//           <div className="mb-4">
//             <button
//               className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-l ${activeTab === 'events' ? 'bg-orange-600 text-white' : ''
//                 }`}
//               onClick={() => setActiveTab('events')}
//             >
//               Events
//             </button>
//             <button
//               className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-r ${activeTab === 'clubs' ? 'bg-orange-600 text-white' : ''
//                 }`}
//               onClick={() => setActiveTab('clubs')}
//             >
//               Clubs
//             </button>
//           </div>

//           {activeTab === 'clubs' && clubPayments.length > 0 && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">Club Payments</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Student ID
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Club Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Fee(Tk)
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Batch
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Phone Number
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Paid Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {displayedPayments
//                       .slice(startIndex, endIndex)
//                       .map((payment) => {
//                         const club = payment.club;
//                         const order = payment.order;
//                         return (
//                           <tr key={payment._id}>
//                             <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
//                               {order?.userId}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {club?.clubName}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.price}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.userBatch}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.name}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.date}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.phoneNumber}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.email}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {payment.paidStatus ? (
//                                 <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
//                                   Paid
//                                 </span>
//                               ) : (
//                                 <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
//                                   Not Paid
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {activeTab === 'events' && tourPayments.length > 0 && (
//             <div className="">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">Tour Payments</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Student ID
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Destination
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Fee(Tk)
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Batch
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Phone Number
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                         Paid Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {tourPayments
//                       .slice(startIndex, endIndex)
//                       .map((payment) => {
//                         const tour = payment.tour;
//                         const order = payment.order;
//                         return (
//                           <tr key={payment._id}>
//                             <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
//                               {order?.userId}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {tour?.destination?.slice(0, 15)}...
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {tour?.cost}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.batch}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.name}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.date}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.phoneNumber}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {order?.email}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
//                               {payment.paidStatus ? (
//                                 <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
//                                   Paid
//                                 </span>
//                               ) : (
//                                 <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
//                                   Not Paid
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           <ReactPaginate
//             previousLabel={<FaAngleDoubleLeft />}
//             nextLabel={<FaAngleDoubleRight />}
//             breakLabel={'...'}
//             pageCount={Math.ceil(displayedPayments.length / paymentsPerPage)}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={5}
//             onPageChange={handlePageChange}
//             containerClassName={'flex justify-center mt-4'}
//             pageClassName={'mx-2 px-2 text-xl py-1 border rounded-full font-bold hover:bg-orange-200 cursor-pointer'}
//             activeClassName={'bg-orange-500 text-white'}
//             previousClassName={'mx-2 text-2xl flex items-center opacity-25 hover:opacity-100 duration-500 rounded-md cursor-pointer font-semibold'}
//             nextClassName={'mx-2 text-2xl flex items-center opacity-25 hover:opacity-100 duration-500 rounded-md cursor-pointer font-semibold'}
//             breakClassName={'mx-2 px-3 py-2 border rounded-md hover:bg-orange-200 cursor-pointer'}
//           />



//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('clubs');
  const [currentPage, setCurrentPage] = useState(0);
  const [groupedPagination, setGroupedPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const paymentsPerPage = 2;

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          activeTab === 'clubs'
            ? 'http://localhost:5000/orders'
            : 'http://localhost:5000/tourorders'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }

        const data = await response.json();
        setPayments(data);

        const initialPagination = data.reduce((pagination, payment) => {
          const eventName = activeTab === 'clubs' ? payment.club?.clubName : payment.tour?.destination;

          if (!pagination[eventName]) {
            pagination[eventName] = {
              currentPage: 0,
            };
          }

          return pagination;
        }, {});
        setGroupedPagination(initialPagination);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [activeTab]);

  const handleGroupPageChange = (selected, groupName) => {
    setGroupedPagination({
      ...groupedPagination,
      [groupName]: {
        currentPage: selected,
      },
    });
  };

  const calculateGroupRange = (groupName) => {
    if (!groupedPagination[groupName]) {
      return [];
    }

    const groupPayments = payments.filter((payment) => {
      const eventName = activeTab === 'clubs' ? payment.club?.clubName : payment.tour?.destination;
      return eventName === groupName;
    });

    const startIndex = groupedPagination[groupName].currentPage * paymentsPerPage;
    const endIndex = startIndex + paymentsPerPage;

    return groupPayments.slice(startIndex, endIndex);
  };

  const groupedPayments = payments.reduce((groups, payment) => {
    const eventName = activeTab === 'clubs' ? payment.club?.clubName : payment.tour?.destination;

    if (!groups[eventName]) {
      groups[eventName] = [];
    }

    groups[eventName].push(payment);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-16 p-4">
          <div className="mb-4">
            <button
              className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-l ${activeTab === 'clubs' ? 'bg-orange-600 text-white' : ''
                }`}
              onClick={() => setActiveTab('clubs')}
            >
              Clubs
            </button>
            <button
              className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-r ${activeTab === 'events' ? 'bg-orange-600 text-white' : ''
                }`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
            </div>
          ) : (
            Object.keys(groupedPayments).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {activeTab === 'clubs' ? 'Club Payments' : 'Event Payments'}
                </h2>
                {Object.entries(groupedPayments).map(([eventName, eventPayments]) => (
                  <div key={eventName} className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">{eventName}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Student ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Fee(Tk)
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Batch
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Phone Number
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Paid Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {calculateGroupRange(eventName).map((payment) => {
                            const order = payment.order;
                            return (
                              <tr key={payment._id}>
                                <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
                                  {order?.userId}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                                  {order?.price}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                                  {order?.userBatch}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                                  {order?.name}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                                  {order?.date}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                                  {order?.phoneNumber}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                                  {order?.email}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                                  {payment.paidStatus ? (
                                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                      Paid
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                                      Not Paid
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <ReactPaginate
                      previousLabel={<FaAngleDoubleLeft />}
                      nextLabel={<FaAngleDoubleRight />}
                      breakLabel={'...'}
                      pageCount={Math.ceil(groupedPayments[eventName].length / paymentsPerPage)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={({ selected }) =>
                        handleGroupPageChange(selected, eventName)
                      }
                      containerClassName={'flex justify-center mt-4'}
                      pageClassName={
                        'mx-2 px-2 text-xl py-1 border rounded-full font-bold hover:bg-orange-200 cursor-pointer'
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
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
