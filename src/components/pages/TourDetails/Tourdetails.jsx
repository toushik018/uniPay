import { useLoaderData } from 'react-router-dom';

const TourDetailsPage = () => {
  const tour = useLoaderData();



  return (
    <div className="bg-gray-100 min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="w-full h-auto lg:h-[600px] object-"
            src={tour.image}
            alt={tour.destination}
          />
          <div className="px-6 py-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{tour.destination}</h2>
            <p className="text-gray-600 mb-8">{tour.location}</p>

          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
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
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
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
          </div>
        </div>
      </div>
    </div>

  );
};

export default TourDetailsPage;
