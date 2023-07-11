import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ClubPage = () => {

  const [clubData, setClubData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/clubs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClubData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ); 
  }

  const handlePayment = (clubName) => {
    // Logic for handling the payment 
    console.log(`Payment for ${clubName} processed successfully!`);
  };

  return (
    <div className="container w-full max-w-7xl mx-auto px-4 py-8 md:pl-16 lg:pl-16">
      <h1 className="text-2xl font-bold mt-8">Make Your Monthly Club Payment</h1>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Club</th>
                <th className="py-2 px-4 border-b text-left">Fee</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {clubData.map((club, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-left">{club.name}</td>
                  <td className="py-2 px-4 border-b text-left">{club.fee}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handlePayment(club.name)}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClubPage;
