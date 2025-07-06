import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylistContext } from '../context/StylistContext';

export default function SocialLinksPage() {
  const { stylist, setStylist } = useContext(StylistContext);
  const navigate = useNavigate();

  // Local state for the inputs
  const [instagram, setInstagram] = useState(stylist.socials?.instagram || '');
  const [facebook, setFacebook]   = useState(stylist.socials?.facebook  || '');
  const [website,  setWebsite]    = useState(stylist.socials?.website   || '');

  // Persist to context on change
  useEffect(() => {
    const socials = { instagram, facebook, website };
    setStylist(prev => ({ ...prev, socials }));
  }, [instagram, facebook, website, setStylist]);


  const handleFinish = async () => {
    // Construct the final payload from the complete context
    const finalPayload = {
      // The user is now identified by the JWT, so these are no longer needed.
      // email: 'stylist@example.com',
      // password: 'temporary-password',
      // name: stylist.brandName || 'The Stylist',

      // Data from context
      bio: stylist.bio,
      headshotUrl: stylist.headshot, // Corrected from stylist.logo
      font: stylist.font?.name,
      colors: {
        primary: stylist.colors?.colors?.[0],
        secondary: stylist.colors?.colors?.[1],
        tertiary: stylist.colors?.colors?.[2],
      },
      logoUrl: stylist.logo,
      socials: stylist.socials,
      services: stylist.services,
      availability: stylist.availability,
      brandName: stylist.brandName,
      tagline: stylist.tagline, // Ensure tagline is included
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch('http://localhost:3001/api/stylists/onboarding', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const result = await response.json();
      console.log('Stylist created successfully:', result);

      // Clear localStorage and navigate to a success/dashboard page
      localStorage.removeItem('stylist-onboarding');
      navigate('/dashboard'); // TODO: Create this page

    } catch (err) {
      console.error('Failed to create stylist:', err);
      alert(`Something went wrong: ${err.message}`);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Connect Your Socials</h2>
        <p className="text-gray-400 mb-8 text-center">
          Add links to your social media and website (optional).
        </p>

        {/* Instagram */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Instagram Handle</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">@</span>
            </div>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="pl-7 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="yourusername"
            />
          </div>
        </div>

        {/* Facebook */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Facebook Page</label>
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="TheGoldenShears"
          />
        </div>
        
        {/* Website */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300">Website URL</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <button 
          onClick={handleFinish}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Finish Onboarding
        </button>
      </div>
    </div>
  );
}