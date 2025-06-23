import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialLinksPage = () => {
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [website, setWebsite] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Connect Your Socials</h2>
        <p className="text-gray-400 mb-8 text-center">Add links to your social media and website (optional).</p>

        {/* Instagram Input */}
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-300">Instagram Handle</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">@</span>
            </div>
            <input
              type="text"
              id="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="pl-7 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="yourusername"
            />
          </div>
        </div>

        {/* Facebook Input */}
        <div className="mb-4">
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-300">Facebook Page</label>
          <input
            type="text"
            id="facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., TheGoldenShears"
          />
        </div>
        
        {/* Website Input */}
        <div className="mb-8">
          <label htmlFor="website" className="block text-sm font-medium text-gray-300">Website URL</label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Finish Onboarding
        </button>
      </div>
    </div>
  );
};

export default SocialLinksPage; 