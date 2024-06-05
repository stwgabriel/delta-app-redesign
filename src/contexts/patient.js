"use client";
import { createContext, useContext, useEffect, useState } from "react";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
  const [response, setResponse] = useState({});
  const [dbData, setDbData] = useState({});
  const [myCharts, setMyCharts] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 2000);
    return () => clearInterval(interval);
  }, []);

  function getPatient(id) {
    console.log(dbData, dbData === null, dbData == {}, id);

    if (dbData === null || dbData == {}) return null;
    for (let patient of dbData?.patients || []) {
      if (patient.id == id) return patient;
    }
    return null;
  }

  function getChart(id) {
    console.log(dbData, dbData === null, dbData == {});

    if (dbData === null || dbData == {}) return null;
    for (let chart of dbData?.charts || []) {
      if (chart.id == id) return chart;
    }
    return null;
  }

  function getPatientCharts(id) {
    if (dbData === null || dbData == {}) return [];
    const patientCharts = [];
    for (let chart of dbData?.charts || []) {
      if (chart.patient_id == id) patientCharts.push(chart);
    }
    return patientCharts;
  }

  function searchPatientCPF(cpf) {
    if (dbData === null) return null;

    for (let patient of dbData.patients) {
      if (patient.cpf === cpf) return patient;
    }
    return null;
  }

  function saveDb() {
    console.log("hey");
    localStorage.setItem("dbData", JSON.stringify(dbData));
    loadDb();
  }

  function loadDb() {
    console.log("hey");
    const data = JSON.parse(localStorage.getItem("dbData"));
    setDbData(data);
    console.log(data);
  }

  function createPatient(cpf) {
    console.log("New patient", arguments);
    const patient = {
      id: uuidv4(),
    };

    if (cpf !== undefined && cpf !== null && cpf !== "") {
      patient[cpf] = cpf;

      const oldPatient = searchPatientCPF(cpf);
      if (oldPatient !== null) return oldPatient;
    }

    dbData.patients.push(patient);
    saveDb();
    return patient;
  }

  function createChart(patientId) {
    console.log("New chart", arguments);
    const newChart = {
      id: uuidv4(),
      patient_id: patientId,
      start_time: new Date().toISOString(),
    };
    dbData.charts.push(newChart);
    saveDb();

    return newChart;
  }

  function updatePatient(id, updates) {
    const newPatient = getPatient(id);

    for (let key in updates) {
      newPatient[key] = updates[key];
    }

    for (let i = 0; i < dbData.patients.length; i++) {
      if (dbData.patients[i].id == id) {
        dbData.patients[i] = newPatient;
        saveDb();
        return newPatient;
      }
    }

    throw Error(`Patient not found: ${id}`);
  }

  useEffect(() => {
    console.log("hey");
    setMyCharts(dbData.charts || null);
  }, [dbData]);

  useEffect(() => {
    console.log("hey");
    loadDb();
  }, []);

  return (
    <PatientContext.Provider
      value={{
        now,
        getPatient,
        getChart,
        searchPatientCPF,
        myCharts,
        response,
        setResponse,
        createPatient,
        dbData,
        createChart,
        updatePatient,
        getPatientCharts,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => useContext(PatientContext);
