import React, { useContext, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const imageHostingToken = import.meta.env.VITE_image_hosating;


  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };




  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const imageResponse = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const imageResult = await imageResponse.json();
      if (imageResult.success) {
        const imgURL = imageResult.data.display_url;
        const userData = { ...data, photoURL: imgURL };

        createUser(userData.email, userData.password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            updateUserProfile(userData.name, userData.photoURL);
          })
          .then(() => {
            console.log('User profile updated');
            const saveUser = { name: userData.name, email: userData.email, id: userData.studentId, batch: userData.batch, photoURL: userData.photoURL };

            fetch('http://localhost:5000/users', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  toast.success("You have registered successfully");
                  navigate('/');
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        throw new Error("Failed to get image URL");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };







  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return true;
  };

  const validateConfirmPassword = (value) => {
    const password = watch('password');
    if (value !== password) {
      return 'Passwords do not match';
    }
    return true;
  };



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Register for CSE Department</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to create an account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <div className="mt-1">
              <input
                id="studentId"
                {...register('studentId', { required: true })}
                type="text"
                autoComplete="off"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>


          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                {...register('name', { required: true })}
                type="text"
                autoComplete="off"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
              Batch Name
            </label>
            <div className="mt-1">
              <select
                id="batch"
                {...register('batch', { required: true })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Batch</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">Please enter a valid email address</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                {...register('password', { validate: validatePassword })}
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                id="confirmPassword"
                {...register('confirmPassword', { validate: validateConfirmPassword })}
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Image upload */}

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Upload an Image</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full max-w-lg"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>

          <div className="text-sm">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
