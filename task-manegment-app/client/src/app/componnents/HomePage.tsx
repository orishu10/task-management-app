import React from 'react';
import { Link } from 'react-router-dom';

const backgroundImageUrl = 'https://st.depositphotos.com/1897095/1619/i/450/depositphotos_16199427-stock-photo-textured-fog-with-gradient.jpg';
const logoUrl = '../../../logo.png'

function HomePage() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
    <div className="text-center">
      <div className="flex justify-center items-center mb-4">
        <img className="h-40 w-40 rounded-full" src={logoUrl} alt="ProjectPulse Logo" />
      </div>
      <h1 className="text-5xl font-semibold text-white mb-4">Welcome to Project Pulse</h1>
      <h2 className="text-xl text-white mb-4">Project Pulse is a website for project management</h2>
      <h2 className="text-xl text-white mb-8">Please sign in to continue</h2>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
        <Link to="/signin" style={{ textDecoration: 'none' }}>
          Get started
        </Link>
      </button>
    </div>
  </div>
);
}


export default HomePage;

