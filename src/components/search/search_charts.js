import { useEffect, useState } from "react";
import Spinner from "../spinner";
import { useAPIContext } from "@/contexts/api";
import { useClientNotificationContext } from "@/contexts/client_notification";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";

export default function SearchChartsComponent() {
  const router = useRouter();
  const { search_chart } = useAPIContext();
  const { notifyError } = useClientNotificationContext();
  const [selectedFilterType, setSelectedFilterType] = useState(null);
  const [selectedFilterText, setSelectedFilterText] = useState("");
  const [searchChartResults, setSearchChartResults] = useState(null);
  const [searchingChart, setSearchingChart] = useState(false);

  const search_options = {
    patient_name: { title: "Nome do paciente", text_placeholder: "Insira o nome do paciente" },
  };

  function handleFilterTypeChange(elt) {
    const filterType = elt.target.value;
    const filterSelected = search_options[filterType];
    filterSelected["type"] = filterType;
    setSelectedFilterType(filterSelected);
  }

  function handleSearchChartClick() {
    setSearchingChart(true);

    search_chart(selectedFilterType.type, selectedFilterText)
      .then(setSearchChartResults)
      .catch((e) => notifyError(e.message))
      .finally(() => {
        setSearchingChart(false);
      });
  }

  return (
    <div className="card shadow p-4 mt-5">
      <h4 className="fw-bold">Pesquisar Prontuário</h4>

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

        {searchingChart ? (
          <Spinner />
        ) : (
          selectedFilterText && (
            <button className="btn btn-primary" onClick={handleSearchChartClick}>
              Pesquisar
            </button>
          )
        )}

        {!searchingChart && searchChartResults !== null && (
          <table className="table">
            <thead>
              <tr className="text-center">
                <th className="px-2 pt-2">Nome</th>
                <th className="px-2 pt-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {searchChartResults.map((r) => (
                <tr
                  className="clickable hover-highlight"
                  key={`cr-${r.id}`}
                  onClick={() => router.push(`${ROUTES.USER.PRONTUARIO}?chart_id=${r.id}`)}
                >
                  <td className="p-2 text-center">{r.name?.value}</td>
                  <td className="p-2 text-center">{r.status.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
