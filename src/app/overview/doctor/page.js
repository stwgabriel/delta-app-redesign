"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/hosts";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OverviewDoctorPage() {
  const { isTokensLoaded, isLoggedDoctor, get_my_charts } = useAPIContext();
  const router = useRouter();

  const [myCharts, setMyCharts] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (isTokensLoaded && !isLoggedDoctor) {
      console.log("Back to main page");
      router.push(ROUTES.HOME);
    }
    if (isTokensLoaded) onLoaded();
    console.log("hey");
  }, [isTokensLoaded, isLoggedDoctor]);

  function onLoaded() {
    console.log("hey");
    get_my_charts().then(setMyCharts).catch(console.error);
  }

  const setActiveElementOnHover = (id) => {
    setActiveId(id);
  };

  const resetActiveElementOnLeave = () => {
    setActiveId(null);
  };

  return (
    <React.Fragment>
      <section>
        <button
          className="btn btn-primary"
          onClick={() => router.push(ROUTES.PRONTUARIO_PAG1)}
        >
          Novo atendimento
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
              className={`card p-3 my-2 ${
                activeId === chart.id ? "bg-secondary" : ""
              }`}
              onMouseEnter={() => setActiveElementOnHover(chart.id)}
              onMouseLeave={resetActiveElementOnLeave}
              onClick={() =>
                router.push(`/prontuario/overview?chart_id=${chart.id}`)
              }
              style={{ cursor: "pointer" }}
            >
              <span>ID: {chart.id}</span>
              <span>
                Criado em: {new Date(chart.logged_at).toLocaleString()}
              </span>
              <span>Nome: {chart.name}</span>
            </div>
          ))
        )}
      </section>
    </React.Fragment>
  );
}
