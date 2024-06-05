"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const [startAssessmentTime, setStartAssessmentTime] = useState();

  function setSaverWrapper(name, func, val, json = false) {
    const cval = json ? JSON.stringify(val) : val;
    localStorage.setItem(name, cval);
    func(val);
  }

  function loadFunc(name, func, json = false) {
    const val = localStorage.getItem(name);
    if (val !== null) {
      const nval = json ? JSON.parse(val) : val;
      func(nval);
    }
  }

  useEffect(() => {
    loadFunc("authData", setAuthData, true);
    loadFunc("startAssessmentTime", setStartAssessmentTime);
    return () => {};
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData: (v) => setSaverWrapper("authData", setAuthData, v, true),
        startAssessmentTime,
        setStartAssessmentTime: (v) =>
          setSaverWrapper("startAssessmentTime", setStartAssessmentTime, v),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
