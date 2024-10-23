"use client";

import { useAPIContext } from "@/contexts/api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function OverviewDoctorPage() {
  const { isTokensLoaded, isLoggedDoctor } = useAPIContext();
  const router = useRouter();

  useEffect(() => {
    if (isTokensLoaded && !isLoggedDoctor) router.push("/");
  }, [isLoggedDoctor]);

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
    </React.Fragment>
  );
}
