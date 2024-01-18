import React from 'react';
import { Link } from 'react-router-dom';

const Unauthenticated = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        You are not authenticated.
      </h2>
      <p>Please <Link to="/signin" className="text-indigo-600 hover:text-indigo-500 font-semibold">sign in</Link> to access this page.</p>
    </div>
  );
};

export default Unauthenticated;
