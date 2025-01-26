"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { isEmpty } from "@/utils/funcs";
import { STATES } from "@/utils/generic";
import React, { useEffect, useState } from "react";

export default function UserSettingsPage() {
  const { get_me, put_me } = useAPIContext();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userChanges, setUserChanges] = useState({});
  const [userChangesLoading, setUserChangesLoading] = useState(false);

  useEffect(() => {
    setError(null);
    get_me()
      .then(setUser)
      .catch((e) => setError(e.message));
  }, []);

  function set_change(field, newValue) {
    setUserChanges((oldUser) => {
      const newUser = { ...oldUser, [field]: newValue.trim() };
      if (newUser[field] === user[field] || newUser[field] === "") {
        delete newUser[field];
      }
      return newUser;
    });
  }

  function send_changes() {
    setUserChangesLoading(true);
    setError(null);
    put_me(userChanges)
      .then((u) => {
        setUser(u);
        setUserChanges({});
      })
      .catch((e) => setError(e.message))
      .finally(() => setUserChangesLoading(false));
  }

  return (
    <React.Fragment>
      <section className="flex-column mt-5 justify-content-center">
        {user === null ? (
          <>
            <span className="text-danger my-3">{error}</span>
            <Spinner />
          </>
        ) : (
          <div className="flex-column justify-content-center align-items-center">
            <span className="align-self-start fs-3 my-2">Perfil</span>

            <div className="input-group my-2">
              <div className="input-group-text">Nome</div>
              <input
                className="form-control"
                value={userChanges?.name || user.name || ""}
                onChange={(e) => set_change("name", e.target.value)}
              />
              <div className="input-group-text">Sobrenome</div>
              <input
                className="form-control"
                value={userChanges?.surname || user.surname || ""}
                onChange={(e) => set_change("surname", e.target.value)}
              />
            </div>

            <div className="input-group my-2">
              <div className="input-group-text">Telefone</div>
              <input
                className="form-control"
                value={userChanges?.phone || user.phone || ""}
                onChange={(e) => set_change("phone", e.target.value)}
              />
            </div>

            <div className="input-group my-2">
              <div className="input-group-text">CPF</div>
              <input
                className="form-control"
                value={userChanges?.cpf || user.cpf || ""}
                onChange={(e) => set_change("cpf", e.target.value)}
              />
            </div>

            <div className="input-group my-2">
              <div className="input-group-text">E-mail</div>
              <input
                className="form-control"
                value={userChanges?.email || user.email || ""}
                onChange={(e) => set_change("email", e.target.value)}
              />
            </div>

            <div className="input-group my-2">
              <div className="input-group-text">CRM Estado</div>

              <select
                className="form-select"
                defaultValue={userChanges?.crm_state || user.crm_state || "Estado CRM"}
                style={{ maxWidth: "150px" }}
                onChange={(e) => set_change("crm_state", e.target.value)}
              >
                <option disabled>Estado CRM</option>
                {Object.entries(STATES).map(([state_letter, state_name]) => (
                  <option key={state_letter} value={state_letter}>
                    {state_name}
                  </option>
                ))}
              </select>
              <div className="input-group-text">CRM Número</div>
              <input
                className="form-control"
                value={userChanges?.crm_number || user.crm_number || ""}
                onChange={(e) => set_change("crm_number", e.target.value)}
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
            {!isEmpty(userChanges) && (
              <div className="align-self-end">
                {userChangesLoading ? (
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
