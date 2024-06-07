import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { signIn, logOut } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { reset, register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    console.log(data);

    setLoading(true); // Set loading to true when submitting

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (user.emailVerified === false) {
          logOut();
          setError("Email is not verified");
        } else {
          setError('');
          reset();
          navigate('/');
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when done or when there's an error
      });
  };



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg border border-gray-300 hover:border hover:border-orange-500 duration-700 w-full max-w-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Sign in to your account</h2>
          <p className="text-sm text-gray-600 mb-6">
            <span className="block mb-2">Or</span>
            <Link
              to="/register"
              className="text-orange-600 font-medium hover:text-orange-500 transition duration-300"
            >
              Create a Student account
            </Link>
            <span className="mx-2 text-gray-500">|</span>
            <Link
              to="/teacher-register"
              className="text-orange-600 font-medium hover:text-orange-500 transition duration-300"
            >
             Teacher account
            </Link>
          </p>
        </div>


        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                {...register("email", { required: true })}
                type="email"
                autoComplete="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              {errors.email && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                {...register("password", { required: true })}
                type="password"
                autoComplete="current-password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              {errors.password && <span>This field is required</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                {...register("remember_me")}
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to='/forget-password' className="font-medium text-orange-600 hover:text-orange-500">
                Forgot your password?
              </Link>
            </div>

          </div>
          <div className='w-96'>
          <p className="text-xs px-1 font-semibold text-red-600 ">{error}</p>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-wait' : ''}`} // Apply opacity and cursor style when loading
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Signing in...' : 'Sign in'} {/* Show loader or text */}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
