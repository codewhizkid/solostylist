import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all the onboarding components
import WelcomePage from './components/WelcomePage';
import BrandingPage from './components/BrandingPage';
import StyleSelectionPage from './components/StyleSelectionPage';
import AboutYouPage from './components/AboutYouPage';
import ServicesPage from './components/ServicesPage';
import AvailabilityPage from './components/AvailabilityPage';
import SocialLinksPage from './components/SocialLinksPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/onboarding/branding" element={<BrandingPage />} />
          <Route path="/onboarding/style" element={<StyleSelectionPage />} />
          <Route path="/onboarding/about" element={<AboutYouPage />} />
          <Route path="/onboarding/services" element={<ServicesPage />} />
          <Route path="/onboarding/availability" element={<AvailabilityPage />} />
          <Route path="/onboarding/socials" element={<SocialLinksPage />} />
          {/* Add more routes here for dashboard, booking page etc. later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
