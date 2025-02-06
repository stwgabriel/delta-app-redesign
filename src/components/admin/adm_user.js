"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import React, { useEffect, useState } from "react";
import { useClientNotificationContext } from "@/contexts/client_notification";

export default function AdminUserComponent() {
  const { notifyError } = useClientNotificationContext();

  const [users, setUsers] = useState(null);
  const { list_users, change_user } = useAPIContext();

  useEffect(() => {
    refreshUsers();
  }, []);

  function refreshUsers() {
    list_users()
      .then(setUsers)
      .catch((e) => notifyError(e.message));
  }

  function _change_user(data) {
    change_user(data)
      .then(() => {
        refreshUsers();
      })
      .catch((e) => notifyError(e.message));
  }

  return (
    <section className="d-flex flex-column flex-fill">
      <span className="d-flex fs-1">Usuários cadastrados</span>

      <div className="d-flex justify-content-center mt-4">
        {users === null ? (
          <Spinner />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Nome
                </th>
                <th scope="col" className="text-center">
                  Telefone
                </th>
                <th scope="col" className="text-center">
                  CPF
                </th>
                <th scope="col" className="text-center">
                  CRM
                </th>
                <th scope="col" className="text-center">
                  E-mail
                </th>
                <th scope="col" className="text-center">
                  Consultor
                </th>
                <th scope="col" className="text-center">
                  Administração
                </th>
                <th scope="col" className="text-center">
                  Ativo / Desativado
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr, i) => (
                <tr key={`hs-${i}`}>
                  <td className="align-middle">
                    {usr.name} {usr.surname}
                  </td>
                  <td className="align-middle text-center">{usr.phone}</td>
                  <td className="align-middle text-center">{usr.cpf}</td>
                  <td className="align-middle text-center">
                    {usr.crm_state} {usr.crm_number}
                  </td>
                  <td className="align-middle text-center">{usr.email}</td>

                  <td className="align-middle text-center">
                    <button
                      onClick={() => {
                        _change_user({ id: usr.id, is_consultor: !usr.is_consultor });
                      }}
                      className={`btn ${usr.is_consultor ? "btn-danger" : "btn-success"}`}
                    >
                      {usr.is_consultor ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                  <td className="align-middle text-center">
                    <button
                      onClick={() => {
                        _change_user({ id: usr.id, is_admin: !usr.is_admin });
                      }}
                      className={`btn ${usr.is_admin ? "btn-danger" : "btn-success"}`}
                    >
                      {usr.is_admin ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                  <td className="align-middle text-center">
                    <button
                      onClick={() => {
                        _change_user({ id: usr.id, is_active: !usr.is_active });
                      }}
                      className={`btn ${usr.is_active ? "btn-danger" : "btn-success"}`}
                    >
                      {usr.is_active ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
