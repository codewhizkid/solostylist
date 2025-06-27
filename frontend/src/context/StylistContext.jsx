import { createContext, useState } from 'react';

export const StylistContext = createContext();

export const StylistProvider = ({ children }) => {
  const [stylist, setStylist] = useState({
    brandName: '',
    tagline: '',
    logo: null,
    colors: {},
    bio: '',
    services: [],
    availability: [],
    socials: {},
  });

  return (
    <StylistContext.Provider value={{ stylist, setStylist }}>
      {children}
    </StylistContext.Provider>
  );
}; 