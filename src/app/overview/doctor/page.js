"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OverviewDoctorPage() {
  const { isTokensLoaded, isLoggedDoctor, get_my_charts } = useAPIContext();
  const router = useRouter();

  const [myCharts, setMyCharts] = useState(null);

  useEffect(() => {
    if (isTokensLoaded && !isLoggedDoctor) router.push("/");
    if (isTokensLoaded) onLoaded();
  }, [isLoggedDoctor]);

  function onLoaded() {
    get_my_charts().then(setMyCharts).catch(console.error);
  }

  return (
    <React.Fragment>
      <section>
        <button
          className="btn btn-primary"
          onClick={() => router.push("/prontuario/pag1")}
        >
          Novo atendimento
        </button>
      </section>
      <section className="flex-column">
        {myCharts === null ? (
          <Spinner />
        ) : (
          myCharts.map((chart, i) => (
            <React.Fragment key={i}>
              <div className="card">
                <span>{chart.id}</span>
                <span>{new Date(chart.logged_at).toLocaleString()} </span>
              </div>
            </React.Fragment>
          ))
        )}
      </section>
    </React.Fragment>
  );
}
