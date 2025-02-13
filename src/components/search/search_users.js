import { useEffect, useState } from "react";
import Spinner from "../spinner";
import { useAPIContext } from "@/contexts/api";
import { useClientNotificationContext } from "@/contexts/client_notification";

export default function SearchUsersComponent() {
  const { search_user, change_user } = useAPIContext();
  const { notifyError } = useClientNotificationContext();
  const [selectedFilterType, setSelectedFilterType] = useState(null);
  const [selectedFilterText, setSelectedFilterText] = useState("");
  const [searchUserResults, setSearchUserResults] = useState(null);
  const [searchingUser, setSearchingUser] = useState(false);

  const search_options = {
    user_name: { title: "Nome do usuário", text_placeholder: "Insira o nome do usuário" },
  };

  function handleFilterTypeChange(elt) {
    const filterType = elt.target.value;
    const filterSelected = search_options[filterType];
    filterSelected["type"] = filterType;
    setSelectedFilterType(filterSelected);
  }

  function handleSearchUserClick() {
    setSearchingUser(true);
    search_user(selectedFilterType.type, selectedFilterText)
      .then(setSearchUserResults)
      .catch((e) => notifyError(e.message))
      .finally(() => {
        setSearchingUser(false);
      });
  }

  function _change_user(data) {
    change_user(data)
      .then(() => {
        handleSearchUserClick();
      })
      .catch((e) => notifyError(e.message));
  }

  return (
    <div className="card shadow p-4">
      <h4 className="fw-bold">Pesquisar Usuário</h4>

      <div className="mt-3">
        <div className="mb-3">
          <label htmlFor="user" className="form-label">
            Selecione o campo pelo qual se deseja filtrar:
          </label>
          <select className="form-control" onChange={handleFilterTypeChange} defaultValue={0}>
            <option disabled value={0}>
              Selecione uma opção
            </option>
            {Object.entries(search_options).map(([eName, eDict]) => (
              <option key={eName} value={eName}>
                {eDict.title}
              </option>
            ))}
          </select>
        </div>

        {selectedFilterType !== null && selectedFilterType.text_placeholder && (
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder={selectedFilterType.text_placeholder}
              onChange={(e) => setSelectedFilterText(e.target.value)}
            />
          </div>
        )}

        {searchingUser ? (
          <Spinner />
        ) : (
          selectedFilterText && (
            <button className="btn btn-primary" onClick={handleSearchUserClick}>
              Pesquisar
            </button>
          )
        )}

        {!searchingUser && searchUserResults !== null && (
          <table className="table">
            <thead>
              <tr className="text-center">
                <th className="px-2 pt-2">Nome</th>
                <th className="px-2 pt-2">Telefone</th>
                <th className="px-2 pt-2">CPF</th>
                <th className="px-2 pt-2">CRM</th>
                <th className="px-2 pt-2">E-mail</th>
                <th className="px-2 pt-2">Consultor</th>
                <th className="px-2 pt-2">Administração</th>
                <th className="px-2 pt-2">Ativo / Desativado</th>
              </tr>
            </thead>
            <tbody>
              {searchUserResults.map((usr) => (
                <tr
                  //   className="clickable hover-highlight"
                  key={`ur-${usr.id}`}
                  //   onClick={() => router.push(`${ROUTES.PRONTUARIO}?chart_id=${usr.id}`)}
                >
                  <td className="p-2 text-center">
                    {usr.name} {usr.surname}
                  </td>
                  <td className="p-2 text-center">{usr.phone}</td>
                  <td className="p-2 text-center">{usr.cpf}</td>
                  <td className="p-2 text-center">
                    {usr.crm_state} {usr.crm_number}
                  </td>
                  <td className="p-2 text-center">{usr.email}</td>

                  <td className="p-2 text-center">
                    <button
                      onClick={() => {
                        _change_user({ id: usr.id, is_consultor: !usr.is_consultor });
                      }}
                      className={`btn ${usr.is_consultor ? "btn-danger" : "btn-success"}`}
                    >
                      {usr.is_consultor ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => {
                        _change_user({ id: usr.id, is_admin: !usr.is_admin });
                      }}
                      className={`btn ${usr.is_admin ? "btn-danger" : "btn-success"}`}
                    >
                      {usr.is_admin ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                  <td className="p-2 text-center">
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
    </div>
  );
}
