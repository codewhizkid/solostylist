import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Onboarding components
import WelcomePage        from './components/WelcomePage';
import BrandingPage       from './components/BrandingPage';
import StyleSelectionPage from './components/StyleSelectionPage';
import AboutYouPage       from './components/AboutYouPage';
import ServicesPage       from './components/ServicesPage';
import AvailabilityPage   from './components/AvailabilityPage';
import SocialLinksPage    from './components/SocialLinksPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"                        element={<WelcomePage />} />
        <Route path="/onboarding/branding"     element={<BrandingPage />} />
        <Route path="/onboarding/style"        element={<StyleSelectionPage />} />
        <Route path="/onboarding/about"        element={<AboutYouPage />} />
        <Route path="/onboarding/services"     element={<ServicesPage />} />
        <Route path="/onboarding/availability" element={<AvailabilityPage />} />
        <Route path="/onboarding/socials"      element={<SocialLinksPage />} />
        {/* TODO: add /dashboard, /booking pages later */}
      </Routes>
    </div>
  );
}

export default App;