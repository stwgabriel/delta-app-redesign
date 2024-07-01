"use client";
import { createContext, useContext } from "react";

const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
  return (
    <PatientContext.Provider value={{}}>{children}</PatientContext.Provider>
  );
};

export const usePatientContext = () => useContext(PatientContext);
