import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold mb-4">
        Build your brand. Book your clients. Be Simply Independent.
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl">
        Welcome to Simply Independent, the all-in-one platform to power your business. 
        Let's get you set up in just a few minutes.
      </p>
      <button 
        onClick={() => navigate('/onboarding/branding')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage; 