import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLoaderData, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HiCurrencyBangladeshi } from 'react-icons/hi';
import { useEffect } from 'react';
import useUsersData from '../../../hooks/useUserData';

const TourCheckout = () => {
    const { register, handleSubmit, setValue } = useForm();
    const {user} = useAuth();
    const tour = useLoaderData();
    const id = useParams();
  const {users} = useUsersData();
    console.log(id);




    useEffect(() => {
      const currentDate = new Date().toLocaleDateString();
      setValue("date", currentDate);
    }, [setValue]);

// Filter the user based on some condition (e.g., email matching)
const filteredUser = users.find((u) => u.email === user.email);

// Extract user's ID and batch from the filtered user
const userId = filteredUser ? filteredUser.id : null;
const userBatch = filteredUser ? filteredUser.batch : null;
const userName = filteredUser ? filteredUser.name : null;


const onSubmit = (data) => {
  const postData = {
    tourId: id,
    mobile: data.mobile,
    date: data.date,
    email: user.email,
    name: userName,
    userId: userId, // Include user's ID
    userBatch: userBatch, // Include user's batch
  };

  

  console.log(postData);

  fetch('http://localhost:5000/tourOrders', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((result) => {
      window.location.replace(result.url)
      console.log(result);
    });
};



    return (


      <div className="pt-32 css-selector ">
      <div className="w-3/5 mx-auto mb-8">
        <div className="relative flex items-center">
          <div className="flex-grow h-2 bg-gray-300">
            <div
              className="h-2 bg-green-500 rounded-lg"
              style={{ width: "60%" }}
            ></div>
          </div>
          <div className="absolute top-4 left-6 transform -translate-x-1/2">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white"></div>
              <p className="ml-2 text-gray-600 font-semibold">
                Order Confirmation
              </p>
            </div>
          </div>
          <div className="absolute top-4 -right-2 transform translate-x-1/2">
            <div className="flex items-center">
              <p className="mr-2 text-gray-600 font-semibold">Payment</p>
              <div className="flex-shrink-0 bg-gray-300 h-6 w-6 rounded-full border-4 border-white"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start gap-4 h-screen mt-20">
        {/* Left side - club info */}
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          {tour ? (
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center">
              <img
                src={tour?.image}
                alt={tour?.destination}
                className="w-28 md:w-40 rounded-md"
              />
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-700">
                  {tour?.destination}
                </h2>
                <hr className='border border-gray-200' />
                <div className=" ">
                  <div>
                    <p className="font-normal font-Lexend leading-10  text-gray-700 text-2xl ">
                      Cost: <span className='font-bold text-green-600'>{tour?.cost}</span> Tk </p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <p>Loading Tour information...</p>
          )}
        </div>

        {/* Right side - Payment info */}
        <div className="bg-white p-8 rounded-lg border-2 border-gray-200 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Payment Summary
          </h2>

          <div className="flex justify-between text-gray-700 mb-4">
            <p className="text-lg md:text-xl font-semibold">Cost:</p>
            <div className="flex items-center gap-1">
              <HiCurrencyBangladeshi className="text-[#1bbf72fa] text-3xl" />
              <p className="font-bold font-Lexend leading-10 text-gray-700 text-2xl">
                {tour?.cost} Tk
              </p>
              
            </div>
          </div>

          <hr className="border-1 border-gray-400 mb-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium mb-2"
              >
                Mobile Number
              </label>
              <input
                required
                type="text"
                id="mobile"
                name="mobile"
                {...register("mobile")}
                className="border rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>


            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-medium mb-2"
              >
                Date
              </label>
              <input
                type="text"
                id="date"
                name="date"
                readOnly
                {...register("date")}
                className="border rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>



            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 w-full"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>

















    //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
    //     <h2 className="text-2xl font-bold text-gray-800 mb-6">
    //       Pay for{' '}
    //       <span className="text-blue-500">{tour?.destination}</span> <br /> Fee:{' '}
    //       <span className="text-blue-500">{tour?.cost} TK</span>
    //     </h2>

    //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //       <div>
    //         <label htmlFor="id" className="block text-sm font-medium text-gray-700">
    //           ID
    //         </label>
    //         <input
    //           {...register('id')}
    //           defaultValue={user?.id}
    //           type="text"
    //           id="id"
    //           required
    //           className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
    //           Batch
    //         </label>
    //         <select
    //           {...register('batch')}
    //           id="batch"
    //           required
    //           className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    //         >
    //           <option value="8th">8th</option>
    //           <option value="9th">9th</option>
    //           <option value="10th">10th</option>
    //           <option value="12th">12th</option>
    //           <option value="13th">13th</option>
    //           <option value="14th">14th</option>
    //           <option value="15th">15th</option>
    //         </select>
    //       </div>
    //       <div>
    //         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
    //           Name
    //         </label>
    //         <input
    //           {...register('name')}
    //           defaultValue={user?.displayName}
    //           type="text"
    //           id="name"
    //           required
    //           className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="date" className="block text-sm font-medium text-gray-700">
    //           Date
    //         </label>
    //         <input
    //           {...register('date')}
    //           type="date"
    //           id="date"
    //           required
    //           className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
    //           Phone Number
    //         </label>
    //         <input
    //           {...register('phoneNumber')}
    //           type="tel"
    //           id="phoneNumber"
    //           required
    //           className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //           Email
    //         </label>
    //         <input
    //           {...register('email')}
    //           defaultValue={user?.email}
    //           type="email"
    //           id="email"
    //           required
    //           className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
    //           Currency
    //         </label>
    //         <select
    //           {...register('currency')}
    //           id="currency"
    //           required
    //           className="w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    //         >
    //           <option value="BDT">BDT</option>
    //         </select>
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full py-3 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
    //       >
    //         Checkout
    //       </button>
    //     </form>
    //   </div>
    // </div>

    );
};

export default TourCheckout;










// import React, { useEffect, useState } from 'react';
// import { useLoaderData, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import useAuth from '../../../hooks/useAuth';
// import useUsersData from '../../../hooks/useUserData';
// import { HiCurrencyBangladeshi } from 'react-icons/hi';


// const TourCheckout = () => {
//   const { register, handleSubmit, setValue } = useForm();
//   const { user } = useAuth();
//   const { users } = useUsersData();
//   const { tour } = useLoaderData();
//   const id = useParams();


  
//   console.log(tour);
//   useEffect(() => {
//     const currentDate = new Date().toLocaleDateString();
//     setValue('date', currentDate);
//   }, [setValue]);

//     // Filter the user based on some condition (e.g., email matching)
//     const filteredUser = users.find((u) => u.email === user.email);

//     // Extract user's ID and batch from the filtered user
//     const userId = filteredUser ? filteredUser.id : null;
//     const userBatch = filteredUser ? filteredUser.batch : null;
  

//     const onSubmit = (data) => {
//       const postData = {
//         tourId: id,
//         mobile: data.mobile,
//         date: data.date,
//         email: user.email,
//         name: user.displayName,
//         userId: userId, // Include user's ID
//         userBatch: userBatch, // Include user's batch
//       };
  
//       console.log(postData);
  
//       fetch('http://localhost:5000/tourorders', {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify(postData),
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           window.location.replace(result.url);
//           console.log(result);
//         });
//     };
  

//     return (



      // <div className="pt-32 css-selector ">
      //   <div className="w-3/5 mx-auto mb-8">
      //     <div className="relative flex items-center">
      //       <div className="flex-grow h-2 bg-gray-300">
      //         <div
      //           className="h-2 bg-green-500 rounded-lg"
      //           style={{ width: "60%" }}
      //         ></div>
      //       </div>
      //       <div className="absolute top-4 left-6 transform -translate-x-1/2">
      //         <div className="flex items-center">
      //           <div className="flex-shrink-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white"></div>
      //           <p className="ml-2 text-gray-600 font-semibold">
      //             Order Confirmation
      //           </p>
      //         </div>
      //       </div>
      //       <div className="absolute top-4 -right-2 transform translate-x-1/2">
      //         <div className="flex items-center">
      //           <p className="mr-2 text-gray-600 font-semibold">Payment</p>
      //           <div className="flex-shrink-0 bg-gray-300 h-6 w-6 rounded-full border-4 border-white"></div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
  
      //   <div className="flex flex-col md:flex-row justify-center items-start gap-4 h-screen mt-20">
      //     {/* Left side - club info */}
      //     <div className="bg-white p-4 rounded-lg border-2 border-gray-200 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mb-4 md:mb-0">
      //       {tour ? (
      //         <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center">
      //           <img
      //             src={tour?.image}
      //             alt={tour?.destination}
      //             className="w-28 md:w-40 rounded-md"
      //           />
      //           <div>
      //             <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-700">
      //               {tour?.destination}
      //             </h2>
      //             <hr className='border border-gray-200' />
      //             <div className=" ">
      //               <div>
      //                 <p className="font-normal font-Lexend leading-10  text-gray-700 text-2xl ">
      //                   Monthly price: <span className='font-bold text-green-600'>{tour?.cost}</span> Tk </p>
      //               </div>
      //             </div>
  
      //           </div>
      //         </div>
      //       ) : (
      //         <p>Loading Tour information...</p>
      //       )}
      //     </div>
  
      //     {/* Right side - Payment info */}
      //     <div className="bg-white p-8 rounded-lg border-2 border-gray-200 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      //       <h2 className="text-xl md:text-2xl font-semibold mb-4">
      //         Payment Summary
      //       </h2>
  
      //       <div className="flex justify-between text-gray-700 mb-4">
      //         <p className="text-lg md:text-xl font-semibold">Tour Prices:</p>
      //         <div className="flex items-center gap-1">
      //           <HiCurrencyBangladeshi className="text-[#1bbf72fa] text-3xl" />
      //           <p className="font-bold font-Lexend leading-10 text-gray-700 text-2xl">
      //             {tour?.cost} Tk
      //           </p>
                
      //         </div>
      //       </div>
  
      //       <hr className="border-1 border-gray-400 mb-4" />
  
      //       <form onSubmit={handleSubmit(onSubmit)}>
      //         <div className="mb-4">
      //           <label
      //             htmlFor="mobile"
      //             className="block text-gray-700 font-medium mb-2"
      //           >
      //             Mobile Number
      //           </label>
      //           <input
      //             required
      //             type="text"
      //             id="mobile"
      //             name="mobile"
      //             {...register("mobile")}
      //             className="border rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
      //           />
      //         </div>
  
  
      //         <div className="mb-4">
      //           <label
      //             htmlFor="date"
      //             className="block text-gray-700 font-medium mb-2"
      //           >
      //             Date
      //           </label>
      //           <input
      //             type="text"
      //             id="date"
      //             name="date"
      //             readOnly
      //             {...register("date")}
      //             className="border rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
      //           />
      //         </div>
  
  
  
      //         <button
      //           type="submit"
      //           className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 w-full"
      //         >
      //           Pay Now
      //         </button>
      //       </form>
      //     </div>
      //   </div>
      // </div>
  
//     );
//   };
  
//   export default TourCheckout;