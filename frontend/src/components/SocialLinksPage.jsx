import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylistContext } from '../context/StylistContext';

export default function SocialLinksPage() {
  const { stylist, setStylist } = useContext(StylistContext);

  const [instagram, setInstagram] = useState(stylist.socials?.instagram || '');
  const [facebook, setFacebook]   = useState(stylist.socials?.facebook  || '');
  const [website,  setWebsite]    = useState(stylist.socials?.website   || '');

  const navigate = useNavigate();

  /* ---- persist socials + submit ---- */
  const handleFinish = async () => {
    // 1. update context
    const socials = { instagram, facebook, website };
    const payload = { ...stylist, socials };
    setStylist(payload);

    // 2. POST to backend (temp email/password until auth added)
    try {
      await fetch('http://localhost:3001/api/stylists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'placeholder@later.com',
          name:  payload.brandName,
          password: 'temp',
          bio: payload.bio,
          font: payload.font,
          colors: payload.colors,
          services: payload.services,
          availability: payload.availability,
          socials,
        }),
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create stylist:', err);
      alert('Something went wrong. Please try again.');
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