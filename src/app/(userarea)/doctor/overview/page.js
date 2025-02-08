"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useClientNotificationContext } from "@/contexts/client_notification";
import SearchChartsComponent from "@/components/search_charts/search_charts";

export default function OverviewDoctorPage() {
  const { notifyError } = useClientNotificationContext();
  const { get_my_charts, create_chart } = useAPIContext();
  const router = useRouter();

  const [myCharts, setMyCharts] = useState(null);

  useEffect(() => {
    get_my_charts("INICIADO,EM_ATENDIMENTO")
      .then(setMyCharts)
      .catch((e) => notifyError(e.message));
  }, []);

  return (
    <React.Fragment>
      <SearchChartsComponent />

      <section className="d-flex mt-5 justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            create_chart()
              .then((r) => {
                router.push(`${ROUTES.PRONTUARIO_PAG1}?chart_id=${r.id}`);
              })
              .catch((e) => notifyError(e.message));
          }}
        >
          Iniciar novo protocolo de AVC
        </button>
      </section>
      <section className="card shadow p-4 d-flex flex-column mt-5">
        <span className="d-flex fs-3">Meus prontuários em andamento</span>
        {myCharts === null ? (
          <Spinner />
        ) : (
          myCharts.map((chart) => (
            <div
              key={chart.id}
              className="d-flex card clickable hover-highlight p-3 my-2"
              onClick={() => router.push(`${ROUTES.PRONTUARIO_PAG1}?chart_id=${chart.id}`)}
            >
              <span className="d-flex">ID: {chart.id}</span>
              <span className="d-flex">Criado em: {new Date(chart.logged_at).toLocaleString()}</span>
              <span className="d-flex">Nome: {chart.name?.value}</span>
              <div className="d-flex">
                <span className="d-flex badge bg-primary">Status: {chart.status?.value}</span>
              </div>
            </div>
          ))
        )}
      </section>
    </React.Fragment>
  );
}
