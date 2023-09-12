import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useUsersData from '../../../hooks/useUserData';

const MyPayments = () => {
  const { user } = useContext(AuthContext);
  const { users } = useUsersData()
  const [payments, setPayments] = useState({ events: [], clubs: [] });
  const [selectedTab, setSelectedTab] = useState('events');
  const [isLoading, setIsLoading] = useState(true);






  useEffect(() => {
    // Fetch data from your API endpoints for both 'events' and 'clubs' payments
    // For example, fetching event payments
    fetch('http://localhost:5000/tourOrders')
      .then((response) => response.json())
      .then((data) => {
        setPayments((prevPayments) => ({ ...prevPayments, events: data }));
        setIsLoading(false); // Set isLoading to false when data is fetched
      });

    // Similarly, fetch club payments
    fetch('http://localhost:5000/orders')
      .then((response) => response.json())
      .then((data) => {

        setPayments((prevPayments) => ({ ...prevPayments, clubs: data }));

      });
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const filteredPayments = payments[selectedTab]?.filter(
    (payment) => payment.order.email === user?.email
  );

  console.log(filteredPayments);

  return (
    <div className="md:pl-16 lg:pl-16">
      <div className="mb-4 mt-16 flex flex-row w-full px-2 mx-auto">
        <button
          className={`w-full sm:w-auto bg-gray-200 text-gray-700 py-2 px-4 rounded-t sm:rounded-l ${selectedTab === 'events' ? 'bg-orange-600 text-white' : ''
            }`}
          onClick={() => handleTabChange('events')}
        >
          Events
        </button>
        <button
          className={`w-full sm:w-auto bg-gray-200 text-gray-700 py-2 px-4 rounded-t sm:rounded-r ${selectedTab === 'clubs' ? 'bg-orange-600 text-white' : ''
            }`}
          onClick={() => handleTabChange('clubs')}
        >
          Clubs
        </button>
      </div>

      <div className='max-h-[400px] overflow-y-auto px-2'>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-orange-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                {selectedTab === 'events' ? 'Event Name' : 'Club Name'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                {selectedTab === 'events' ? 'Event Fee(Tk)' : 'Club Fee(Tk)'}
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
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <span className="loading loading-spinner loading-lg"></span>
                </td>
              </tr>
            ) : (
              /* ... Table rows */
              filteredPayments?.map((payment) => {
                const { club, tour, order } = payment;
                return (
                  <tr key={payment._id}>
                    <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
                      {order?.userId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                      {selectedTab === 'events' ? tour?.destination : club?.clubName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                      {selectedTab === 'events' ? tour?.cost : order?.price}
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
                      {order?.mobile}
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
                    {/* Add more table data fields here */}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default MyPayments;