import React from 'react';


function ToursPage() {
  const toursData = [
    {
      destination: 'Beach Paradise',
      itinerary: 'Relax on sandy beaches, explore underwater life, and enjoy water sports.',
      cost: '$500',
      registration: 'Open',
    },
    {
      destination: 'Mountain Expedition',
      itinerary: 'Hike through breathtaking trails, camp under the stars, and enjoy stunning views.',
      cost: '$800',
      registration: 'Closed',
    },
    {
      destination: 'City Discovery',
      itinerary: 'Explore vibrant city life, visit iconic landmarks, and experience local culture.',
      cost: '$600',
      registration: 'Open',
    },
  ];

  const renderTours = () => {
    return toursData.map((tour, index) => (
      <div key={index} className="p-6 bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{tour.destination}</h2>
        <p className="text-gray-600 mb-4">{tour.itinerary}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-gray-700 font-medium mr-2">Cost:</span>
            <span className="text-blue-600">{tour.cost}</span>
          </div>
          <button
            className={`px-4 py-2 rounded-full ${
              tour.registration === 'Open' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
            } text-white font-medium`}
            disabled={tour.registration !== 'Open'}
          >
            {tour.registration === 'Open' ? 'Register' : 'Registration Closed'}
          </button>
        </div>
        <button className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium">
          Details
        </button>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Upcoming Tours</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderTours()}
        </div>
      </div>
    </div>
  );
}

export default ToursPage;
