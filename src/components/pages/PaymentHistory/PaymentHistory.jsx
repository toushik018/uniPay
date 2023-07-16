import React, { useEffect, useState } from 'react';

const PaymentHistory = () => {
  const [clubPayments, setClubPayments] = useState([]);
  const [tourPayments, setTourPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        setClubPayments(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/tourorders")
      .then((res) => res.json())
      .then((data) => {
        setTourPayments(data);
      });
  }, []);

  console.log(tourPayments);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:max-w-7xl md:max-w-4xl mx-auto py-8 px-4 sm:px-6 md:pl-16 lg:pl-16">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-16">
          {clubPayments.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 ml-4 mt-2">Club Payments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Student ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Club Name
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
                    {clubPayments.map((payment) => {
                      const club = payment.club;
                      const order = payment.order;
                      return (
                        <tr key={payment._id}>
                          <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
                            {order?.id}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                            {club?.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                            {club?.fee}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                            {order?.batch}
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
            </div>
          )}

          {tourPayments.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 ml-4">Tour Payments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Student ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Destination
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
                    {tourPayments.map((payment) => {
                      const tour = payment.tour;
                      const order = payment.order;
                      return (
                        <tr key={payment._id}>
                          <td className="px-4 py-3 whitespace-nowrap text-base font-medium text-gray-900">
                            {order?.id}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                            {tour?.destination}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                            {tour?.fee}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-base text-gray-600">
                            {order?.batch}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
