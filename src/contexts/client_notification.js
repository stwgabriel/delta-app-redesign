"use client";
import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const ClientNotificationContext = createContext();

function ConfirmNotificationContainer({ toastProps, closeToast, data }) {
  const { msg, onConfirm } = data;
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm({ toastId: toastProps.toastId, ...data });
    }
    closeToast(true);
  };

  return (
    <div className="d-flex flex-column w-100">
      <span className="my-2">{msg}</span>
      <button className="btn btn-primary" onClick={handleConfirm}>
        Confirmar
      </button>
    </div>
  );
}

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

  function notifyConfirm(data) {
    console.log(data.toastId, data.toastId || undefined);
    toast(ConfirmNotificationContainer, {
      autoClose: false,
      toastId: data.toastId || undefined,
      closeButton: false,
      ...data,
      data,
    });
  }

  return (
    <ClientNotificationContext.Provider
      value={{ notifyInfo, notifySuccess, notifyWarn, notifyError, notify, notifyConfirm }}
    >
      <ToastContainer stacked />
      {children}
    </ClientNotificationContext.Provider>
  );
};

export const useClientNotificationContext = () => useContext(ClientNotificationContext);
