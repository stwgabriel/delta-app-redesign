"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useClientNotificationContext } from "@/contexts/client_notification";

export default function OverviewDoctorPage() {
  const { notifyError } = useClientNotificationContext();
  const { get_my_charts, create_chart } = useAPIContext();
  const router = useRouter();

  const [myCharts, setMyCharts] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    get_my_charts().then(setMyCharts).catch(console.error);
  }, []);

  const setActiveElementOnHover = (id) => {
    setActiveId(id);
  };

  const resetActiveElementOnLeave = () => {
    setActiveId(null);
  };

  return (
    <React.Fragment>
      <section className="mt-5 justify-content-center">
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
      <section className="flex-column mt-5">
        <span className="fs-3">Meus prontuários</span>
        {myCharts === null ? (
          <Spinner />
        ) : (
          myCharts.map((chart, i) => (
            <div
              key={chart.id}
              className={`card p-3 my-2 ${activeId === chart.id ? "bg-secondary" : ""}`}
              onMouseEnter={() => setActiveElementOnHover(chart.id)}
              onMouseLeave={resetActiveElementOnLeave}
              onClick={() => router.push(`/prontuario/overview?chart_id=${chart.id}`)}
              style={{ cursor: "pointer" }}
            >
              <span>ID: {chart.id}</span>
              <span>Criado em: {new Date(chart.logged_at).toLocaleString()}</span>
              <span>Nome: {chart.name?.value}</span>
            </div>
          ))
        )}
      </section>
    </React.Fragment>
  );
}
