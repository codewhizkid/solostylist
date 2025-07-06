import { createContext, useState, useEffect } from 'react';

export const StylistContext = createContext();

const initialStylistState = {
    brandName: '',
    tagline: '',
    logo: null,
    colors: {},
    bio: '',
    services: [],
    availability: [],
    socials: {},
};

export const StylistProvider = ({ children }) => {
  const [stylist, setStylist] = useState(() => {
    try {
      const savedStylist = localStorage.getItem('stylist-onboarding');
      return savedStylist ? JSON.parse(savedStylist) : initialStylistState;
    } catch (error) {
      console.error('Failed to parse stylist data from localStorage', error);
      return initialStylistState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('stylist-onboarding', JSON.stringify(stylist));
    } catch (error) {
      console.error('Failed to save stylist data to localStorage', error);
    }
  }, [stylist]);


  return (
    <StylistContext.Provider value={{ stylist, setStylist }}>
      {children}
    </StylistContext.Provider>
  );
}; 