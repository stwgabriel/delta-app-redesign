"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import React, { useEffect, useState } from "react";

export default function AdminHospitaisComponent() {
  const [hospitais, setHospitais] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { list_hospitals, change_hospital } = useAPIContext();

  function refreshHospitals() {
    list_hospitals()
      .then(setHospitais)
      .catch((e) => setErrorMessage(e.message));
  }

  useEffect(() => {
    refreshHospitals();
  }, []);

  function change_hospital_active(id, is_active) {
    change_hospital({
      id,
      is_active,
    })
      .then(() => {
        refreshHospitals();
      })
      .catch((e) => setErrorMessage(e.message));
  }

  return (
    <section className="flex-column flex-fill">
      <span className="fs-1">Hospitais cadastrados</span>

      <div className="justify-content-center mt-4">
        {hospitais === null ? (
          <Spinner />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Nome
                </th>
                <th scope="col" className="text-center">
                  Nome de usuário
                </th>
                <th scope="col" className="text-center">
                  Ativar / Desativar
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitais.map((hospital, i) => (
                <tr key={`hs-${i}`}>
                  <td className="align-middle">{hospital.name}</td>
                  <td className="align-middle text-center">{hospital.username}</td>
                  <td className="d-flex justify-content-center text-align-center align-items-center">
                    <button
                      onClick={() => {
                        change_hospital_active(hospital.id, !hospital.is_active);
                      }}
                      className={`btn ${hospital.is_active ? "btn-danger" : "btn-success"}`}
                    >
                      {hospital.is_active ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <span className="text-danger">{errorMessage}</span>
    </section>
  );
}
