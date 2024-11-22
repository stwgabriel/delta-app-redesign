"use client";
import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/hosts";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function FilledCard({ detail }) {
  const router = useRouter();
  const { id, name } = detail;

  return (
    <div
      className="card m-2"
      onClick={() => router.push(`/prontuario/overview?chart_id=${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body flex-column">
        <p className="card-text">{name?.value}</p>
        <p className="card-text">{id}</p>
      </div>
    </div>
  );
}

function ChartsList({ charts }) {
  if (charts === null || charts === undefined) return <Spinner />;
  return (
    <div className="flex-column">
      {charts.map((itm, i) => (
        <FilledCard key={`cd-${i}`} detail={itm} />
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
