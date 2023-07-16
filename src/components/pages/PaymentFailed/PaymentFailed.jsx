import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white w-4/5 lg:max-w-md mx-auto p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
          <p className="text-gray-800 text-lg mb-6">
            Try again
          </p>
          <Link to='/'>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Go back to main page
          </button>
          </Link>
        </div>
      </div>
    );
};

export default PaymentFailed;