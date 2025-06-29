import React, { StrictMode } from 'react';           // add React import
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StylistProvider } from './context/StylistContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StylistProvider>
        <App />
      </StylistProvider>
    </BrowserRouter>
  </StrictMode>     {/* ← removed the trailing comma */}
);