
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const { tranId } = useParams();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full lg:w-2/4 px-2 lg:px-0">
        <div className="relative flex items-center h-10">
          <div className="absolute inset-0 flex-grow h-2 bg-gray-300">
            <div className="h-2 bg-green-500 rounded-lg" style={{ width: '100%' }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-between">
            <div className="absolute left-0 ml-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white mt-6"></div>
                <p className=" text-gray-600 font-semibold text-xl mt-6">Confirmation</p>
              </div>
            </div>
            <div className="absolute right-0 mr-6">
              <div className="flex items-center">
                <p className="text-gray-600 font-semibold text-xl mt-6">Payment</p>
                <div className="flex-shrink-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mt-4" style={{ border: "2px solid #12C29F" }}>
        <div className='space-y-2'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 font-semibold">
            Thank you for the registration. Check your email for the invoice. <br />
          <span className='bg-orange-200 px-2 rounded-md mt-2'>Stay tuned for more updates.</span>
          </p>
          <p className="text-gray-800 font-semibold mb-2">Transaction ID:  <span className="bg-green-200 px-2 rounded-md">{tranId}</span></p>
         
        </div>

        <Link to="/" className="mt-4">
          <button
            className=" px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-4"
          >
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
