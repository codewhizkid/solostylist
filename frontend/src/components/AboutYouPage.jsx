import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutYouPage = () => {
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Tell Us About You</h2>
        <p className="text-gray-400 mb-8 text-center">This information will be displayed on your public booking page.</p>

        {/* Headshot Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Your Headshot</label>
          <div className="mt-1 flex items-center space-x-4">
            <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-700">
              {/* Placeholder for image preview */}
              <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.993A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <label htmlFor="file-upload" className="cursor-pointer bg-gray-800 rounded-md py-2 px-3 border border-gray-600 text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:border-indigo-500 transition">
              <span>Upload a photo</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
            </label>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Your Bio</label>
          <textarea
            id="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Introduce yourself to your clients..."
          />
        </div>

        <button 
          onClick={() => navigate('/onboarding/services')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default AboutYouPage; 