import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { CgDetailsMore } from "react-icons/cg";
import { RiErrorWarningFill } from "react-icons/ri";


function ToursPage() {
  const [toursData, setToursData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userOrder, setUserOrder] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(""); // State for modal content
  const { user } = useAuth(); // login user data is here.


  useEffect(() => {
    fetch("http://localhost:5000/tours")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setToursData(data);
        setIsLoading(false);
      });
  }, []);



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

  // Function to show modal with relevant content
  function openModal(content) {
    setModalContent(content);
    setShowModal(true);
  }

  // Function to close the modal
  function closeModal() {
    setShowModal(false);
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center px-2 z-50">
          <div className="bg-orange-100 p-10 shadow-2xl  shadow-gray-700 rounded-md lg:w-2/5 relative lg:bottom-72 lg:left-60">
            <button
              className="absolute top-2 right-2 mt-2 mr-2 text-white bg-red-600 hover:bg-red-700 rounded-full"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p className="text-lg font-semibold">{modalContent}</p>
          </div>
        </div>
      )}


      <div className="w-full max-w-7xl mx-auto py-8 md:pl-16 lg:pl-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 px-4 flex items-center gap-4">
          Upcoming Events{" "}
          <RiErrorWarningFill
            className="text-orange-500 cursor-pointer"
            onClick={() => openModal("Before registering for the events, it's essential to review all the details provided below. Make sure you have a clear understanding of the event's itinerary, requirements, and any special instructions. If you have any questions or need further clarification, please don't hesitate to reach out to our department.")}
          />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toursData.map((tour, index) => (
            <div
              key={index}
              className="max-w-sm mx-auto bg-white border-2 border-orange-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                      Fee:
                    </span>
                    <span className="text-gray-700">{tour.cost} TK</span>
                  </div>

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
                <Link to={`/tours/${tour._id}`}>
                  <button className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium flex items-center gap-2">
                    Details <CgDetailsMore />
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
