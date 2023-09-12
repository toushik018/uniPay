import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiTimeFive } from 'react-icons/bi';
import { HiCurrencyBangladeshi } from 'react-icons/hi';
import { AuthContext } from '../../../Providers/AuthProvider';

const ClubPage = () => {
  const [clubData, setClubData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userOrder, setUserOrder] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    fetch("http://localhost:5000/clubs")
      .then((res) => res.json())
      .then((data) => {
        setClubData(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        setUserOrder(data);
      });
  }, []);

  // Function to calculate the time left in days, hours, minutes, and seconds
  const getTimeLeft = (deadlineTimestamp) => {
    const currentTime = new Date().getTime();
    const timeLeft = Math.max(0, deadlineTimestamp - currentTime) / 1000; // Convert to seconds

    const daysLeft = Math.floor(timeLeft / (24 * 3600));
    const hoursLeft = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutesLeft = Math.floor((timeLeft % 3600) / 60);
    const secondsLeft = Math.floor(timeLeft % 60);

    return { daysLeft, hoursLeft, minutesLeft, secondsLeft };
  };

  // Update the time left every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Update the state with the new time left
      setUserOrder((prevUserOrder) => {
        return prevUserOrder.map((userOrder) => {
          const clubId = userOrder.order.clubId.id;
          const email = userOrder.order.email;
          const clubIndex = clubData.findIndex((club) => club._id.toString() === clubId && user?.email === email);
          if (clubIndex !== -1) {
            const orderTimestamp = Number(userOrder.order.timestamp);
            const deadlineTimestamp = orderTimestamp + (userOrder.order.paymentType === 'yearly' ? 365 * 24 * 3600 * 1000 : 30 * 24 * 3600 * 1000); // Dynamic based on payment type
            const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = getTimeLeft(deadlineTimestamp);
            console.log(deadlineTimestamp);
            return { ...userOrder, timeLeft: { daysLeft, hoursLeft, minutesLeft, secondsLeft } };
          }
          // If the club is not found in clubData, return the original userOrder
          return userOrder;
        });
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [clubData, user]);

  const handlePayment = (clubName, clubId, paymentType) => {
    // Logic for handling the payment
    console.log(`Payment for ${clubName} (${paymentType}) processed successfully!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container w-full max-w-7xl mx-auto px-4 py-8 md:pl-16 lg:pl-16">
      <h1 className="text-2xl font-bold mt-8 mb-8">Make Your Monthly Club Payment</h1>
      <div>
        {clubData.map((club, index) => {
          const userClubOrder = userOrder.find(
            (order) => order.order.clubId.id === club._id.toString() && order.order?.email === user?.email
          );

          // Ensure that timeLeft is defined for all user orders
          const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = userClubOrder?.timeLeft || {};

          // Check if the user has made an order
          if (userClubOrder) {
            // Calculate the total remaining seconds
            const totalRemainingSeconds = daysLeft * 24 * 3600 + hoursLeft * 3600 + minutesLeft * 60 + secondsLeft;

            return (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-2 flex justify-between items-center space-x-4"
              >
                <img
                  src={club.image}
                  alt="Club Image"
                  className="w-24 h-24 object-cover rounded-md transition-transform duration-300 transform hover:scale-110"
                />
                <div>
                  <p className="text-gray-900 font-bold text-2xl">{club.clubName}</p>
                  <p className="text-lg leading-8 text-gray-600">{club.clubRole} <span className='font-semibold'>{club.roleName}</span></p>
                </div>
                <div className='flex items-center gap-2 bg-slate-200 p-2 rounded-xl w-[300px]'>
                  <BiTimeFive size={30} className='text-orange-500' />{' '}
                  <p className="text-gray-900 font-extrabold font-Lexend text-2xl">
                    {daysLeft}d {hoursLeft}h {minutesLeft}m <span className='text-green-600'>{secondsLeft}s</span>
                  </p>
                </div>
                <div className="bg-orange-100 hover:bg-gray-100 duration-300 p-3 rounded-lg">
                  <div className='flex items-center space-x-2'>
                    <p className='font-semibold'>{userClubOrder.order.paymentType === 'yearly' ? 'You paid for Yearly' : 'You paid for Monthly'}: </p>
                    <p className='text-lg font-MontserratAlternates font-bold text-green-500'>
                      {userClubOrder.order.paymentType === 'yearly' ? club.yearlyPrice : club.monthlyPrice}
                    </p>
                    <HiCurrencyBangladeshi className='text-green-500 text-xl' />
                  </div>
                </div>
                <div className='pr-4'>
                  <Link to={`/checkout/${club._id}`}>
                    <button
                      className={`ml-auto border-2 hover:bg-orange-500 hover:text-white border-black hover:border-orange-500 text-black text-base px-2 py-2 rounded-lg transition duration-300 ${totalRemainingSeconds > 0 ? 'disabled:text-red-500 font-bold' : ''
                        }`} // Disable the button if time is left and apply text-red-500
                      disabled={totalRemainingSeconds > 0} // Disable the button if time is left
                      onClick={() => handlePayment(club.clubName, club._id, userClubOrder.order.paymentType)}
                    >
                      {totalRemainingSeconds > 0 ? 'Paid' : 'Pay Now'}
                    </button>
                  </Link>
                </div>
              </div>
            );
          } else {
            // User hasn't made an order yet
            return (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-2 flex justify-between items-center space-x-4"
              >
                <img
                  src={club.image}
                  alt="Club Image"
                  className="w-24 h-24 object-cover rounded-md transition-transform duration-300 transform hover:scale-110"
                />
                <div>
                  <p className="text-gray-900 font-bold text-2xl">{club.clubName}</p>
                  <p className="text-lg leading-8 text-gray-600">{club.clubRole}  <span className='font-semibold'>{club.roleName}</span></p>
                </div>
                <div className="bg-orange-100 hover:bg-gray-100 duration-300 p-3 rounded-lg">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-lg">Monthly: </p>
                      <div className="flex items-center">
                        <p className="text-lg font-MontserratAlternates font-bold text-green-500">{club.monthlyPrice}</p>
                        <HiCurrencyBangladeshi className="text-green-500 text-xl ml-1" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-lg">Yearly: </p>
                      <div className="flex items-center">
                        <p className="text-lg font-MontserratAlternates font-bold text-green-500">{club.yearlyPrice}</p>
                        <HiCurrencyBangladeshi className="text-green-500 text-xl ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pr-4'>
                  <Link to={`/checkout/${club._id}`}>
                    <button
                      className="ml-auto border-2 hover:bg-orange-500 hover:text-white border-black hover:border-orange-500 text-black text-base px-2 py-2 rounded-lg transition duration-300 "
                      disabled={false} // Enable the button since no order has been made
                      onClick={() => {
                        // Check if the user is logged in
                        if (!user) {
                          // Redirect to the login page
                          history.push('/login');
                        } else {
                          // Handle the payment if the user is logged in
                          handlePayment(club.clubName, club._id, selectedPaymentType[club._id]);
                        }
                      }}
                    >
                      Pay Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ClubPage;
