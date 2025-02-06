"use client";
import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ChartCard({ detail }) {
  const router = useRouter();
  const { id, name, status, page1_status, page2_status, page3_status, open_reason } = detail;

  return (
    <div
      className="d-flex card my-1"
      onClick={() => router.push(`/prontuario/overview?chart_id=${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex card-body flex-column">
        <p className="d-flex card-text">Paciente: {name?.value}</p>
        <p className="d-flex card-text">Motivo: {open_reason?.value}</p>

        <div className="d-flex flex-wrap">
          <span className="d-flex badge bg-primary me-2 mt-1">{status?.value}</span>
          {page1_status?.value && (
            <span className="d-flex badge bg-primary me-2 mt-1">Página 1: {page1_status?.value}</span>
          )}
          {page2_status?.value && (
            <span className="d-flex badge bg-primary me-2 mt-1">Página 2: {page2_status?.value}</span>
          )}
          {page3_status?.value && <span className="d-flex badge bg-primary mt-1">Página 3: {page3_status?.value}</span>}
        </div>
      </div>
    </div>
  );
}

function ChartsList({ charts }) {
  if (charts === null || charts === undefined) return <Spinner />;
  return (
    <div className="d-flex flex-column mt-2">
      {charts.map((itm, i) => (
        <ChartCard key={`cd-${i}`} detail={itm} />
      ))}
    </div>
  );
}

export default function ConsultorOverviewPage() {
  const { isTokenLoaded, isLoggedConsultor, get_charts_by_status } = useAPIContext();
  const router = useRouter();

  const [chartsIniciado, setChartsIniciado] = useState(null);
  const [chartsEmAtendimento, setChartsEmAtendimento] = useState(null);

  useEffect(() => {
    atualizar_lists();
    const intervalId = setInterval(atualizar_lists, 5000);
    return () => clearInterval(intervalId);
  }, [isTokenLoaded]);

  function atualizar_lists() {
    get_charts_by_status("INICIADO").then((results) => {
      setChartsIniciado({ last_update: new Date(), results });
    });
    get_charts_by_status("EM_ATENDIMENTO").then((results) => {
      setChartsEmAtendimento({ last_update: new Date(), results });
    });
  }

  return (
    <React.Fragment>
      {[
        {
          title: "Em preenchimento",
          last_update: chartsIniciado?.last_update || null,
          results: chartsIniciado?.results || null,
        },
        {
          title: "Em atendimento",
          last_update: chartsEmAtendimento?.last_update || null,
          results: chartsEmAtendimento?.results || null,
        },
      ].map((itm, i) => (
        <section key={`list-${i}`} className="d-flex flex-column">
          <span className="d-flex mt-5 fs-3">{itm.title}</span>
          <div className="d-flex align-items-center">
            <span className="d-flex pt-1 text-secondary">
              Última atualização: {itm.last_update && itm.last_update.toLocaleString()}
            </span>

            <button className="btn btn-sm btn-secondary ms-2" onClick={atualizar_lists}>
              Atualizar
            </button>
          </div>
          <ChartsList charts={itm.results} />
        </section>
      ))}
    </React.Fragment>
  );
}
