import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandingPage = () => {
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Customize Your Brand</h2>
        <p className="text-gray-400 mb-8 text-center">Add your logo and brand name to make it yours.</p>

        {/* Logo Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Your Logo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-500">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="mb-4">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-300">Brand Name</label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., The Golden Shears"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-300">Tagline (Optional)</label>
          <input
            type="text"
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., A cut above the rest"
          />
        </div>

        <button 
          onClick={() => navigate('/onboarding/style')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default BrandingPage; 