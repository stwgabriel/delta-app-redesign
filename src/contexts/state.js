"use client";

import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  return (
    <StateContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
