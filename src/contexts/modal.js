"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

function DeviateConfirmModal() {
  return (
    <>
      <span className="fs-3">Deseja marcar todos como </span>
      <div className="d-flex text-center align-items-center justify-content-around mt-3">
        <span className="mx-1 text-danger">Confirmar</span>
        <button className="btn btn-primary mx-1">Cancelar</button>
      </div>
    </>
  );
}

export const ModalContextProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  function createDeviateConfirmModal() {
    const newModal = {
      component: DeviateConfirmModal,
    };

    setModals((oldModals) => {
      return [...oldModals, newModal];
    });
  }

  return (
    <ModalContext.Provider value={{ createDeviateConfirmModal }}>
      {children}
      {/* <section
        className="card position-fixed start-50 top-50 translate-middle p-5 shadow"
        style={{ zIndex: 1000 }}
      >
        <DeviateConfirmModal />
      </section> */}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
