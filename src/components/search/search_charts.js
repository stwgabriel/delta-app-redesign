import { useState } from "react";
import Spinner from "../spinner";
import { useAPIContext } from "@/contexts/api";
import { useClientNotificationContext } from "@/contexts/client_notification";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Input } from "../ui/input";
import { formatStatus, getStatusStyle } from "@/app/(userarea)/doctor/overview/page";

export default function SearchChartsComponent() {
  const router = useRouter();

  const [isGoingToSearch, setIsGoingToSearch] = useState(false);

  const { search_chart } = useAPIContext();
  const { notifyError } = useClientNotificationContext();
  const [selectedFilterType, setSelectedFilterType] = useState(null);
  const [selectedFilterText, setSelectedFilterText] = useState("");
  const [searchChartResults, setSearchChartResults] = useState(null);
  const [searchingChart, setSearchingChart] = useState(false);

  const search_options = {
    patient_name: {
      title: "Nome do paciente",
      text_placeholder: "Insira o nome do paciente",
    },
  };

  function handleFilterTypeChange(elt) {

    const filterType = elt;
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

  const { open } = useSidebar();
  return (
    <div className="flex gap-2 items-center">
      {!open && <SidebarTrigger />}

      <Button
        variant="ghost"
        className="flex w-full md:w-65 items-start justify-center gap-2 !rounded-full bg-black/10 h-fit py-3 px-4"
        onClick={() => setIsGoingToSearch((is) => !is)}
      >
        <Search className="size-4" />
        <span className="">Pesquisar Prontuário</span>
      </Button>

      <div
        className={cn(
          !isGoingToSearch
            ? "hidden"
            : "rounded-lg !absolute bg-white border border-black/10 top-10 left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] shadow p-4 mt-5 z-[2000] flex flex-col"
        )}
      >
        <h4 className="font-semibold">Pesquisar Prontuário</h4>

        <div className="mt-3">
          <div className="mb-3">
            <Select
              onValueChange={handleFilterTypeChange}
              placeholder="Selecione um"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o campo pelo qual se deseja filtrar:" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  key={"Selecione"}
                  value={"Selecione"}
                  disabled
                  selected
                >
                  Selecione um
                </SelectItem>

                {Object.entries(search_options).map(([eName, eDict]) => (
                  <SelectItem key={eName} value={eName}>
                    {eDict.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedFilterType !== null &&
            selectedFilterType.text_placeholder && (
              <div className="mb-3">
                <Input
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
              <Button className="w-full" onClick={handleSearchChartClick}>
                Pesquisar
              </Button>
            )
          )}

          {!searchingChart && searchChartResults !== null && (
            <div className="mt-3">
              <h4 className="font-base">Resultados</h4>

              <table className="table-auto w-full">
                <thead>
                  <tr className="text-center font-base">
                    <th className="px-2 pt-2">Nome</th>
                    <th className="px-2 pt-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {searchChartResults.map((r) => (
                    <tr
                      className="pointer hover:bg-gray-100 border-b border-gray-200"
                      key={`cr-${r.id}`}
                      onClick={() =>
                        router.push(`${ROUTES.USER.PRONTUARIO}?chart_id=${r.id}`)
                      }
                    >
                      <td className="p-2 text-center font-semibold">{r.name?.value}</td>
                      <td className="p-2 text-center">
                        <span className={cn(getStatusStyle(r.status.value), "px-2 rounded-lg")}> {formatStatus(r.status.value)} </span>
                        <span className="sr-only"> {r.status.value} </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isGoingToSearch && (
        <div
          className="fixed inset-0 bg-black/30 z-50"
          onClick={() => setIsGoingToSearch(false)}
        ></div>
      )}
    </div>
  );
}
