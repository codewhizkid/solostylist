import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylistContext } from '../context/StylistContext';

const fonts = [
  { name: 'Modern Sans',   className: 'font-sans'  },
  { name: 'Classic Serif', className: 'font-serif' },
  { name: 'Elegant Script',className: 'font-cursive' }, // Dancing Script
];

const palettes = [
  { name: 'Indigo & Slate',  colors: ['#4F46E5', '#64748B', '#F8FAFC'] },
  { name: 'Mint & Charcoal', colors: ['#34D399', '#374151', '#F9FAFB'] },
  { name: 'Rose & Stone',    colors: ['#F43F5E', '#78716C', '#FEF2F2'] },
];

export default function StyleSelectionPage() {
  const { stylist, setStylist } = useContext(StylistContext);
  const [selectedFont, setSelectedFont]       = useState(stylist.font   || fonts[0]);
  const [selectedPalette, setSelectedPalette] = useState(stylist.colors || palettes[0]);
  const navigate = useNavigate();

  // load Google Dancing Script once
  useEffect(() => {
    const id = 'google-dancing-script';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handleNext = () => {
    setStylist({
      ...stylist,
      font:   selectedFont,
      colors: selectedPalette,
    });
    navigate('/onboarding/services');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Define Your Style</h2>
        <p className="text-gray-400 mb-8 text-center">
          Choose a font and color palette that reflects your brand's personality.
        </p>

        {/* Font selection */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Choose your font</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {fonts.map((font) => (
              <button
                key={font.name}
                onClick={() => setSelectedFont(font)}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  selectedFont.name === font.name
                    ? 'bg-indigo-600 border-indigo-500'
                    : 'bg-gray-800 border-gray-600 hover:border-indigo-500'
                }`}
              >
                <span className={font.className}>{font.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Color palette */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Select a color palette</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {palettes.map((palette) => (
              <div
                key={palette.name}
                onClick={() => setSelectedPalette(palette)}
                className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                  selectedPalette.name === palette.name
                    ? 'bg-gray-700 border-indigo-500'
                    : 'bg-gray-800 border-gray-600 hover:border-indigo-500'
                }`}
              >
                <div className="flex justify-center space-x-2">
                  {palette.colors.map((color) => (
                    <div
                      key={color}
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-center mt-3 text-sm font-medium text-gray-300">
                  {palette.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

/* Tailwind utility for script font */
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
  .font-cursive { font-family: 'Dancing Script', cursive; }
`;
document.head.appendChild(style);