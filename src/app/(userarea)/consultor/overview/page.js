"use client";
import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ChartCard({ detail }) {
  const router = useRouter();
  const {
    id,
    name,
    status,
    page1_status,
    page2_status,
    page3_status,
    open_reason,
  } = detail;

  return (
    <div
      className="card my-1"
      onClick={() => router.push(`/prontuario/overview?chart_id=${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body flex-column">
        <p className="card-text">Paciente: {name?.value}</p>
        <p className="card-text">Motivo: {open_reason?.value}</p>

        <div className="mt-1">
          <span className="badge bg-primary me-1">{status?.value}</span>
          {page1_status?.value && (
            <span className="badge bg-primary mx-1">
              Página 1: {page1_status?.value}
            </span>
          )}
          {page2_status?.value && (
            <span className="badge bg-primary mx-1">
              Página 2: {page2_status?.value}
            </span>
          )}
          {page3_status?.value && (
            <span className="badge bg-primary mx-1">
              Página 3: {page3_status?.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ChartsList({ charts }) {
  if (charts === null || charts === undefined) return <Spinner />;
  return (
    <div className="flex-column">
      {charts.map((itm, i) => (
        <ChartCard key={`cd-${i}`} detail={itm} />
      ))}
    </div>
  );
}

export default function ConsultorOverviewPage() {
  const { isTokenLoaded, isLoggedConsultor, get_charts_by_status } =
    useAPIContext();
  const router = useRouter();

  const [chartsIniciado, setChartsIniciado] = useState(null);
  const [chartsAguardandoAtendimento, setChartsAguardandoAtendimento] =
    useState(null);
  const [chartsEmAtendimento, setChartsEmAtendimento] = useState(null);
  const [chartsEmStandBy, setChartsEmStandBy] = useState(null);

  useEffect(() => {
    if (isTokenLoaded && !isLoggedConsultor) router.push(ROUTES.HOME);
  }, [isLoggedConsultor]);

  useEffect(() => {
    if (!isTokenLoaded) return;

    atualizar_lists();
    const intervalId = setInterval(atualizar_lists, 5000);
    return () => clearInterval(intervalId);
  }, [isTokenLoaded]);

  function atualizar_lists() {
    get_charts_by_status("INICIADO").then((results) => {
      setChartsIniciado({ last_update: new Date(), results });
    });
    get_charts_by_status("AGUARDANDO_ATENDIMENTO").then((results) => {
      setChartsAguardandoAtendimento({ last_update: new Date(), results });
    });
    get_charts_by_status("EM_ATENDIMENTO").then((results) => {
      setChartsEmAtendimento({ last_update: new Date(), results });
    });
    get_charts_by_status("STANDBY").then((results) => {
      setChartsEmStandBy({ last_update: new Date(), results });
    });
  }

  return (
    <React.Fragment>
      <section>
        <button className="btn btn-primary" onClick={atualizar_lists}>
          Atualizar
        </button>
      </section>

      {[
        {
          title: "Iniciado",
          last_update: chartsIniciado?.last_update || null,
          results: chartsIniciado?.results || null,
        },
        {
          title: "Aguardando atendimento",
          last_update: chartsAguardandoAtendimento?.last_update || null,
          results: chartsAguardandoAtendimento?.results || null,
        },
        {
          title: "Em atendimento",
          last_update: chartsEmAtendimento?.last_update || null,
          results: chartsEmAtendimento?.results || null,
        },
        {
          title: "Em standby",
          last_update: chartsEmStandBy?.last_update || null,
          results: chartsEmStandBy?.results || null,
        },
      ].map((itm, i) => (
        <section key={`list-${i}`} className="flex-column">
          <span className="mt-5 fs-3">{itm.title}</span>
          <span className="pt-1 text-secondary">
            Última atualização:{" "}
            {itm.last_update && itm.last_update.toLocaleString()}
          </span>

          <ChartsList charts={itm.results} />
        </section>
      ))}
    </React.Fragment>
  );
}
