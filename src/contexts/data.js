"use client";
import APIHandler from "@/api";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const api = new APIHandler();

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData === null) return;

    setData(JSON.parse(savedData));
  }, []);

  function setValue(field, value) {
    if (value === "" || value === undefined || value === null) return;

    setData((oldData) => {
      let newData = oldData === null ? {} : { ...oldData };
      console.log(newData);
      newData[field] = value;
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    });
  }

  function getValue(field, _default = null) {
    if (data !== null && field in data) return data[field];
    return _default;
  }

  return (
    <DataContext.Provider value={{ setValue, getValue, api }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
