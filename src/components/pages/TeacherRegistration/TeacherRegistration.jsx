import React from 'react';
import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { sendEmailVerification } from "firebase/auth";
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const TeacherRegistration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, logOut } = useContext(AuthContext);

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                logOut();
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registration Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
                sendVerificationEmail(loggedUser);

                // Save user data to your server
                const saveUser = {
                    name: data.name,
                    teacherId: data.teacherId,
                    email: data.email,
                    role: "teacher",
                    photoURL: "",
                    phone: "",

                };

                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("User data saved to the server.");
                        } else {
                            console.error("Failed to save user data:", response.statusText);
                        }
                    })
                    .catch((error) => {
                        console.error("Error saving user data:", error);
                    });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then((result) => {
                console.log(result);
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Before login Your email Verify Please',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
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

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full p-4 bg-gray-100 rounded-lg shadow-lg border border-orange-100">
                <h2 className="text-2xl font-semibold mb-4 text-center">Teacher Registration</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">
                            Teacher ID
                        </label>
                        <Controller
                            name="teacherId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Teacher ID is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="teacherId"
                                    type="number"
                                    autoComplete="off"
                                    required
                                    className={`mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.teacherId ? 'border-red-500' : ''
                                        }`}
                                />
                            )}
                        />
                        {errors.teacherId && (
                            <span className="text-red-500 text-sm mt-1">{errors.teacherId.message}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="name"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    className={`mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${errors.name ? 'border-red-500' : ''
                                        }`}
                                />
                            )}
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
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
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm pr-10"
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

                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-orange-200"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherRegistration;
