import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fonts = [
  { name: 'Modern Sans', className: 'font-sans' },
  { name: 'Classic Serif', className: 'font-serif' },
  { name: 'Elegant Script', className: 'font-cursive' }, // Placeholder, needs a real script font
];

const palettes = [
  { name: 'Indigo & Slate', colors: ['#4F46E5', '#64748B', '#F8FAFC'] },
  { name: 'Mint & Charcoal', colors: ['#34D399', '#374151', '#F9FAFB'] },
  { name: 'Rose & Stone', colors: ['#F43F5E', '#78716C', '#FEF2F2'] },
];

const StyleSelectionPage = () => {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Define Your Style</h2>
        <p className="text-gray-400 mb-8 text-center">Choose a font and color palette that reflects your brand's personality.</p>

        {/* Font Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-left">Choose your font</h3>
          <div className="flex justify-center space-x-4">
            {fonts.map((font) => (
              <button
                key={font.name}
                onClick={() => setSelectedFont(font)}
                className={`px-6 py-3 rounded-lg text-lg transition-all border-2 ${
                  selectedFont.name === font.name
                    ? 'bg-indigo-600 border-indigo-500'
                    : 'bg-gray-800 border-gray-600 hover:border-indigo-500'
                }`}
              >
                <span className={font.className}>{font.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-left">Select a color palette</h3>
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
                <p className="text-center mt-3 text-sm font-medium text-gray-300">{palette.name}</p>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => navigate('/onboarding/about')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

// A simple font-family definition for the placeholder script font
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
  .font-cursive { font-family: 'Dancing Script', cursive; }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default StyleSelectionPage; 