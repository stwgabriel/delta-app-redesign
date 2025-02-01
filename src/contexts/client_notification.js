"use client";
import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
const ClientNotificationContext = createContext();

export const ClientNotificationContextProvider = ({ children }) => {
  function notifyInfo(msg) {
    toast.info(msg);
  }

  function notifySuccess(msg) {
    toast.success(msg);
  }

  function notifyWarn(msg) {
    toast.warn(msg);
  }

  function notifyError(msg) {
    toast.error(msg);
  }

  function notify(msg) {
    toast(msg);
  }

  return (
    <ClientNotificationContext.Provider value={{ notifyInfo, notifySuccess, notifyWarn, notifyError, notify }}>
      <ToastContainer />
      {children}
    </ClientNotificationContext.Provider>
  );
};

export const useClientNotificationContext = () => useContext(ClientNotificationContext);
