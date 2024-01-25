import React from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_MUTATION } from '../typeDefs.js';
import { isAuthenticatedAtom, emailAtom, passwordAtom, errorAtom, loadingAtom } from '../Atoms.js';
import { useAtom, useSetAtom } from "jotai";





export default function SignIn() {
 

  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [error, setError] = useAtom(errorAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const navigate = useNavigate();

  const [signInMutation] = useMutation(SIGN_IN_MUTATION);
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(""); 
    try {
      setLoading(true);
      const { data } = await signInMutation({
        variables: {
          email: email,
          password: password
        },
      });
      console.log(data.signIn.user);
      console.log(data.signIn.user.id);
      localStorage.setItem('token', data.signIn.token);  
      localStorage.setItem('userId', data.signIn.user.id);  

      console.log(localStorage.getItem('token'));
      if (data.signIn.success) {
        setIsAuthenticated(true);
        navigate('/userpage');
      } else {
        setError(data.signIn.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An error occurred while signing in.");
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
          Sign in to your account
        </h2>
        <form className="mt-6 space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                aria-label="Email address"
                aria-describedby="email-error"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                aria-label="Password"
                aria-describedby="password-error"
              />
            </div>
          </div>
          <div>
            {error && (
              <p id="email-error" className="text-red-600 text-center">{error}</p>
            )}
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className={`w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${loading && 'opacity-50 cursor-not-allowed'}`}
              disabled={loading}
              aria-label="Sign in"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <div className="text-center">
            <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
