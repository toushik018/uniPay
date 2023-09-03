import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLoaderData, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const TourCheckout = () => {
    const { register, handleSubmit } = useForm();
    const {user} = useAuth();
    const tour = useLoaderData();
    const id = useParams();
    console.log(id);



    const onSubmit = (data) => {
        console.log(data);
        data.tourId = id;
        fetch('https://unipay-server-toushik018.vercel.app/tourorders', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
          window.location.replace(result.url)
          console.log(result);
        })
    
    
      };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Pay for{' '}
          <span className="text-blue-500">{tour?.destination}</span> <br /> Fee:{' '}
          <span className="text-blue-500">{tour?.cost} TK</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              {...register('id')}
              defaultValue={user?.id}
              type="text"
              id="id"
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
              Batch
            </label>
            <select
              {...register('batch')}
              id="batch"
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="13th">13th</option>
              <option value="14th">14th</option>
              <option value="15th">15th</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register('name')}
              defaultValue={user?.displayName}
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              {...register('date')}
              type="date"
              id="date"
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register('phoneNumber')}
              type="tel"
              id="phoneNumber"
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              defaultValue={user?.email}
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              {...register('currency')}
              id="currency"
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="BDT">BDT</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
    );
};

export default TourCheckout;