import React, { createContext, useContext, useState } from 'react';

// Create a context
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [isRefresh, setIsRefresh] = useState(false);

  const triggerRefresh = () => {
    setIsRefresh(!isRefresh);
  };

  return (
    <GlobalStateContext.Provider value={{ isRefresh, triggerRefresh }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext);
