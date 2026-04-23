/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react';

export const CaptainContext = createContext();

export const CaptainContextProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  const value = {
    captain,
    setCaptain,
  };

  return (
    <CaptainContext.Provider value={value}>
      {children}
    </CaptainContext.Provider>
  );
};

