import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_UP_MUTATION } from '../typeDefs.js';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const [signUpMutation] = useMutation(SIGN_UP_MUTATION);
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      setError(""); 
      try {
        setLoading(true);
        const { data } = await signUpMutation({
          variables: {
            email,
            password,
          },
        });
  
        if (data.signIn.success) {
          navigate('/signin');
        } else {
          setError(data.signIn.errorMessage);
        }
      } catch (error) {
        console.error("Error signing up:", error);
        setError("An error occurred while signing up.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <div className="flex min-h-screen items-center justify-center bg-indigo-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-center">
                    <svg className=" w-8 h-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                </div>
                <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">
                    Sign up
                </h2>
                <form className="mt-6 space-y-6" action="#" method="POST">
                    {/* <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
             Full name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="name"
                required
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div> */}
                    {/* Email input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                              onChange={(e)=> setEmail(e.target.value)}

                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>

                    {/* Password input */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm password
                            </label>
                        </div>
                        <div className="mt-1">
                            <input
                            onChange={(e)=> setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div>
            {error && (
              <p id="email-error" className="text-red-600 text-center">{error}</p>
            )}
          </div>


                    <div>
                        <button onClick={handleSubmit}
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            Sign up
                        </button >
                    </div>

                    <div className="text-center">
                        <p>    </p>
                        <Link to="/signin" className="text-indigo-600 hover:text-indigo-500 font-semibold" style={{ color: 'white' }}>
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                already have an account? Sign in                </a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
