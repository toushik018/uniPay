import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const TourDetailsPage = () => {
  const tour = useLoaderData();
  const [userOrder, setUserOrder] = useState([]);
  const { user } = useAuth();
  console.log(tour);

  useEffect(() => {
    fetch("http://localhost:5000/tourorders")
      .then((res) => res.json())
      .then((data) => {
        setUserOrder(data);
      });
  }, []);

  function isUserRegistered(tourId, email) {
    const userOrderEntry = userOrder.find(
      (order) => order.tour._id === tourId && order.order.email === email
    );

    return userOrderEntry ? userOrderEntry.paidStatus : false;
  }



  return (
    <div className="bg-gray-100 min-h-screen pt-8">
      <div className="max-w-screen-lg w-full mx-auto px-4 py-8">
        <div className="mx-auto bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          <img
            className="w-full h-auto lg:h-[600px] object-cover hover:scale-105 duration-300"
            src={tour.image}
            alt={tour.destination}
          />
          <div className="px-6 py-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{tour.destination}</h2>
            <p className="text-gray-600 mb-8">{tour.location}</p>

          </div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-8">
          <div className="px-6 py-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Overview</h3>
            <p className="text-gray-600 mb-2">{tour.overview}</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Itinerary</h3>

            <ul className="text-gray-600 list-none pl-6">
              {tour.itinerary.split('\n').map((item, index) => {
                if (item.startsWith("Day")) {
                  const day = item.split(":")[0];
                  const description = item.split(":")[1].trim();
                  return (
                    <li key={index}>
                      <h5 className="font-bold mb-2">{`${day}. ${description}`}</h5>
                    </li>
                  );
                } else {
                  return <li key={index}>{item}</li>;
                }
              })}
            </ul>
          </div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mt-8">
          <div className="px-6 py-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Details</h3>
            <ul className="text-gray-600 space-y-4">
              <li>
                <strong>Destination:</strong> {tour.destination}
              </li>
              <li>
                <strong>Departure Date:</strong> {tour.departureDate}
              </li>
              <li>
                <strong>Duration:</strong> {tour.duration}
              </li>
              <li>
                <strong>Accommodation:</strong> {tour.accommodation}
              </li>
              <li>
                <strong>Transportation:</strong> {tour.transportation}
              </li>
              <li>
                <strong>Inclusions:</strong> {tour.inclusions}
              </li>
              <li>
                <strong>Exclusions:</strong> {tour.exclusions}
              </li>
              <li>
                <strong>Group Size:</strong> {tour.groupSize}
              </li>
              <li>
                <strong>Tour Guides:</strong> {tour.tourGuides}
              </li>
              <li>
                <strong>Health and Safety Measures:</strong> {tour.healthSafety}
              </li>
              <li>
                <strong>Payment and Cancellation Policies:</strong> {tour.paymentCancellation}
              </li>
            </ul>
            <div className="flex justify-end mt-4">
              <Link to={`/tours-checkout/${tour._id}`}>
                <button
                  className={`px-4 py-2 rounded-full ${isUserRegistered(tour._id, user?.email)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                    } text-white font-medium`}
                  disabled={isUserRegistered(tour._id, user?.email)}
                >
                  {isUserRegistered(tour._id, user?.email) ? "Registered" : "Register"}
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>


    </div>

  );
};

export default TourDetailsPage;
