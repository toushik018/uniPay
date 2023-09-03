import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function ToursPage() {
  const [toursData, setToursData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userOrder, setUserOrder] = useState([]);
  const {user} = useAuth();  //login user data is here. 

  console.log(userOrder);

  useEffect(() => {
    fetch("https://unipay-server-toushik018.vercel.app/tours")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setToursData(data);
        setIsLoading(false);
      });
  }, []);



  useEffect(() => {
    fetch("https://unipay-server-toushik018.vercel.app/tourorders")
      .then((res) => res.json())
      .then((data) => {
        setUserOrder(data);
      });
  }, []);

  function isUserRegistered(tourId, email) {
    return userOrder.some((order) => order.tour._id === tourId && order.order.email === email);
  }


  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ); 
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-8">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:pl-16 lg:pl-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Upcoming Tours
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toursData.map((tour, index) => (
            <div
              key={index}
              className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                className="h-48 w-full object-cover"
                src={tour.image}
                alt={tour.destination}
              />
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {tour.destination}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {tour.overview}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium mr-2">
                      Cost:
                    </span>
                    <span className="text-blue-600">{tour.cost}</span>
                  </div>
                  
                  <Link to={`/tours-checkout/${tour._id}`}>
                    <button
                      className={`px-4 py-2 rounded-full ${
                        isUserRegistered(tour._id, user?.email)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white font-medium`}
                      disabled={isUserRegistered(tour._id, user?.email)}
                    >
                      {isUserRegistered(tour._id, user?.email) ? "Registered" : "Register"}
                    </button>
                  </Link>

                </div>
                <Link to={`/tours/${tour._id}`}>
                  <button className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToursPage;
