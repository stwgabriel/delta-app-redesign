"use client";
import { useAPIContext } from "@/contexts/api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function FilledCard({ detail }) {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">Card title - {detail}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-primary ms-2">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default function ConsultorOverviewPage() {
  const { isTokensLoaded, isLoggedConsultor } = useAPIContext();
  const router = useRouter();

  useEffect(() => {
    if (isTokensLoaded && !isLoggedConsultor) router.push("/");
  }, [isLoggedConsultor]);

  return (
    <React.Fragment>
      <section className="flex-column">
        <span className="p-3 fs-3">Em preenchimento</span>

        <div className="flex-column">
          {[1, 2].map((itm, i) => (
            <FilledCard key={`cd-${i}`} detail={itm} />
          ))}
        </div>
      </section>

      <section className="flex-column">
        <span className="p-3 fs-3">Aguardando atendimento</span>

        <div className="flex-column">
          {[1, 2, , 9].map((itm, i) => (
            <FilledCard key={`cd-${i}`} detail={itm} />
          ))}
        </div>
      </section>

      <section className="flex-column">
        <span className="p-3 fs-3">Em atendimento</span>
        <div className="flex-column">
          {[1, 2, 8, 9].map((itm, i) => (
            <FilledCard key={`cd-${i}`} detail={itm} />
          ))}
        </div>
      </section>

      <section className="flex-column">
        <span className="p-3 fs-3">Em standby</span>

        <div className="flex-column">
          {[1, 28, 9].map((itm, i) => (
            <FilledCard key={`cd-${i}`} detail={itm} />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}
