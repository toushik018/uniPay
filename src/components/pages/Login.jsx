import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        console.log('User logged in successfully');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Failed to log in:', error);
        // Handle login error
      });
  };



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            <span className='mr-2'>Or</span>
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <div className="mt-1">
              <input
                id="id"
                {...register("id", { required: true })}
                type="text"
                autoComplete="off"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.id && <span>This field is required</span>}
            </div>
          </div>

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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
