"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

function DeviateConfirmModal(content) {
  const { text, dismissModal, id, onConfirm, onCancel } = content;
  if (!onConfirm) console.warn("onConfirm not informed");
  if (!onCancel) console.warn("onCancel not informed");

  return (
    <div className="d-flex flex-column">
      <span className="fs-4 text-center">{text}</span>
      <div className="d-flex text-center align-items-center justify-content-around mt-3">
        <span
          className="mx-1 text-danger clickable"
          onClick={() => {
            if (onConfirm) onConfirm(content);
            dismissModal(id);
          }}
        >
          Confirmar
        </span>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            if (onCancel) onCancel(content);
            dismissModal(id);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export const ModalContextProvider = ({ children }) => {
  const [modals, setModals] = useState([]);
  function createDeviateConfirmModal(data) {
    const newModal = {
      Component: DeviateConfirmModal,
      id: new Date().getTime(),
      ...data,
    };

    setModals((oldModals) => {
      return [...oldModals, newModal];
    });
  }

  function dismissModal(id) {
    setModals((oldModals) => {
      let newModals = [...oldModals];
      for (let i = newModals.length - 1; i >= 0; i--) {
        const { id: cid } = newModals[i];
        if (cid === id) {
          newModals.splice(i, 1);
        }
      }
      return newModals;
    });
  }

  function ModalComponent({}) {
    if (modals.length === 0) return <></>;
    const currentModal = modals[0];
    const { Component } = currentModal;
    return (
      <section
        className="d-flex position-fixed vh-100 vw-100 align-items-center justify-content-center translate-middle start-50 top-50"
        style={{ zIndex: 1000, backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <section className="card bg-white p-4 shadow">
          <Component dismissModal={dismissModal} {...currentModal} />
        </section>
      </section>
    );
  }

  return (
    <ModalContext.Provider value={{ createDeviateConfirmModal }}>
      {children}
      <ModalComponent />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
