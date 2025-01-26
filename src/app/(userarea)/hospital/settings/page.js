"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { isEmpty } from "@/utils/funcs";
import React, { useEffect, useState } from "react";

export default function HospitalSettingsPage() {
  const { get_hospital, put_hospital } = useAPIContext();
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState(null);
  const [hospitalChanges, setHospitalChanges] = useState({});
  const [hospitalChangesLoading, setHospitalChangesLoading] = useState(false);

  useEffect(() => {
    setError(null);
    get_hospital()
      .then(setHospital)
      .catch((e) => setError(e.message));
  }, []);

  function set_change(field, newValue) {
    setHospitalChanges((oldHospital) => {
      const newHospital = { ...oldHospital, [field]: newValue.trim() };
      if (newHospital[field] === hospital[field] || newHospital[field] === "") {
        delete newHospital[field];
      }
      return newHospital;
    });
  }

  function send_changes() {
    setHospitalChangesLoading(true);
    setError(null);
    put_hospital(hospitalChanges)
      .then((u) => {
        setHospital(u);
        setHospitalChanges({});
      })
      .catch((e) => setError(e.message))
      .finally(() => setHospitalChangesLoading(false));
  }

  return (
    <React.Fragment>
      <section className="mt-5 justify-content-center">
        {hospital === null ? (
          <>
            <span className="text-danger my-3">{error}</span>
            <Spinner />
          </>
        ) : (
          <div className="flex-column justify-content-center align-items-center">
            <span className="align-self-start fs-3 my-2">Perfil do Hospital</span>

            <div className="input-group my-2">
              <div className="input-group-text">Nome</div>
              <input
                className="form-control"
                value={hospitalChanges?.name || hospital.name || ""}
                onChange={(e) => set_change("name", e.target.value)}
              />
            </div>

            <div className="input-group my-2">
              <div className="input-group-text">Username</div>
              <input
                className="form-control"
                value={hospitalChanges?.username || hospital.username || ""}
                onChange={(e) => set_change("username", e.target.value)}
              />
            </div>

            <div className="input-group mt-2">
              <div className="input-group-text">Senha atual</div>
              <input
                className="form-control"
                type="password"
                onChange={(e) => set_change("old_password", e.target.value)}
              />
            </div>
            <div className="input-group mb-2">
              <div className="input-group-text">Senha nova</div>
              <input
                className="form-control"
                type="password"
                onChange={(e) => set_change("new_password", e.target.value)}
              />
            </div>

            <span className="text-danger">{error}</span>

            {!isEmpty(hospitalChanges) && (
              <div className="align-self-end">
                {hospitalChangesLoading ? (
                  <Spinner />
                ) : (
                  <button className="btn btn-primary" onClick={send_changes}>
                    Salvar
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </React.Fragment>
  );
}
