import React from 'react';

const PayFees = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Tour Page</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                        <input id="name" type="text" autoComplete="off" className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 hover:shadow-md transition duration-300" />
                    </div>
                    <div>
                        <label htmlFor="id" className="block text-lg font-medium text-gray-700">ID</label>
                        <input id="id" type="text" autoComplete="off" className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 hover:shadow-md transition duration-300" />
                    </div>
                    <div>
                        <label htmlFor="batch" className="block text-lg font-medium text-gray-700">Batch</label>
                        <select id="batch" className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 hover:shadow-md transition duration-300">
                            <option value="">Select Batch</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                            <option value="12th">12th</option>
                            <option value="13th">13th</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fee" className="block text-lg font-medium text-gray-700">Fee</label>
                        <input id="fee" type="text" autoComplete="off" className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 hover:shadow-md transition duration-300" />
                    </div>
                    <div>
                        <button type="submit" className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default PayFees;