import { useState } from "react";
import Spinner from "../spinner";
import { useAPIContext } from "@/contexts/api";
import { useClientNotificationContext } from "@/contexts/client_notification";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";

export default function SearchHospitalComponent() {
  const router = useRouter();
  const { search_hospital, change_hospital } = useAPIContext();
  const { notifyError } = useClientNotificationContext();
  const [selectedFilterType, setSelectedFilterType] = useState(null);
  const [selectedFilterText, setSelectedFilterText] = useState("");
  const [searchHospitalResults, setSearchHospitalResults] = useState(null);
  const [searchingHospital, setSearchingHospital] = useState(false);

  const search_options = {
    hospital_name: { title: "Nome do hospital", text_placeholder: "Insira o nome do hospital" },
  };

  function handleFilterTypeChange(elt) {
    const filterType = elt.target.value;
    const filterSelected = search_options[filterType];
    filterSelected["type"] = filterType;
    setSelectedFilterType(filterSelected);
  }

  function handleSearchHospitalClick() {
    setSearchingHospital(true);
    search_hospital(selectedFilterType.type, selectedFilterText)
      .then(setSearchHospitalResults)
      .catch((e) => notifyError(e.message))
      .finally(() => {
        setSearchingHospital(false);
      });
  }

  function change_hospital_active(id, is_active) {
    change_hospital({
      id,
      is_active,
    })
      .then(() => {
        handleSearchHospitalClick();
      })
      .catch((e) => notifyError(e.message));
  }

  return (
    <div className="card shadow p-4">
      <h4 className="fw-bold">Pesquisar Hospital</h4>
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

        {searchingHospital ? (
          <Spinner />
        ) : (
          selectedFilterText && (
            <button className="btn btn-primary" onClick={handleSearchHospitalClick}>
              Pesquisar
            </button>
          )
        )}

        {!searchingHospital && searchHospitalResults !== null && (
          <table className="table">
            <thead>
              <tr className="text-center">
                <th className="px-2 pt-2">Nome</th>
                <th className="px-2 pt-2">Username</th>
                <th className="px-2 pt-2">Ativo / Desativado</th>
              </tr>
            </thead>
            <tbody>
              {searchHospitalResults.map((hsp) => (
                <tr
                  className="clickable hover-highlight"
                  key={`hsp-${hsp.id}`}
                  onClick={() => router.push(`${ROUTES.USER.SETTINGS_PAGE_HOSPITAL}?hospital_id=${hsp.id}`)}
                >
                  <td className="align-middle">{hsp.name}</td>
                  <td className="align-middle text-center">{hsp.username}</td>
                  <td className="d-flex justify-content-center text-align-center align-items-center">
                    <button
                      onClick={() => {
                        console.log(hsp);
                        change_hospital_active(hsp.id, !hsp.is_active);
                      }}
                      className={`btn ${hsp.is_active ? "btn-danger" : "btn-success"}`}
                    >
                      {hsp.is_active ? "Desativar" : "Ativar"}
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
