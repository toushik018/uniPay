import React from 'react';
import { useForm } from 'react-hook-form';

const AddClub = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
          const response = await fetch('http://localhost:5000/clubs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            // Club data posted
            console.log('Club data posted successfully!');
          } else {
            console.error('Error posting club data to the database.');
          }
        } catch (error) {
          console.error('Error posting club data:', error);
        }
    };

    return (
        <div className="w-full lg:w-2/4 md:w-3/4 mt-16 mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Add a Club</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2" htmlFor="name">
                        Club Name
                    </label>
                    <input
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        type="text"
                        {...register('name', { required: true })}
                    />
                    {errors.name && (
                        <p className="text-red-500 mt-1">Club name is required</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2" htmlFor="fee">
                        Fee
                    </label>
                    <input
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        type="number"
                        {...register('fee', { required: true })}
                    />
                    {errors.fee && (
                        <p className="text-red-500 mt-1">Fee is required</p>
                    )}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    type="submit"
                >
                    Add Club
                </button>
            </form>
        </div>
    );
};

export default AddClub;
