"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "@/contexts/form";
import SectionInformacoesBasicas from "./section_informacoes_basicas";
import SectionContraindicacoesAbsolutas from "./section_contraindicacoes_absolutas";
import SectionRankin from "./section_rankin";
import SectionComorbidades from "./section_comorbidades";
import SectionMedicamentosAnticoagulantes from "./section_medicamentos_anticoagulantes";
import SectionMedicamentos from "./section_medicamentos";
import { useAPIContext } from "@/contexts/api";
import { useChart } from "@/contexts/chart";
import Spinner from "@/components/spinner";
import { useClientNotificationContext } from "@/contexts/client_notification";

export default function ProntuarioPage2Page() {
  const { notifyError } = useClientNotificationContext();
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes } = useAPIContext();

  // ---------------------------------------------------------------------------

  const myForm = useForm({ page2_status: "COMPLETO" });
  const { chart, refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  function send_form() {
    chart_update_attributes(chart_id, myForm.values)
      .then(() => refreshChart(false))
      .catch((e) => notifyError(e.message));
  }

  return (
    <>
      <section className="flex-column my-4 align-items-center">
        <span className="fs-1">Prontuário</span>
      </section>

      {chart === null ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <SectionInformacoesBasicas myForm={myForm} />
          <SectionContraindicacoesAbsolutas myForm={myForm} />
          <SectionRankin myForm={myForm} />
          <SectionMedicamentosAnticoagulantes myForm={myForm} />
          <SectionMedicamentos myForm={myForm} />
          <SectionComorbidades myForm={myForm} />
          <section className="flex-column mb-5">
            <button className="btn btn-primary" onClick={send_form}>
              Enviar
            </button>
          </section>
        </React.Fragment>
      )}
    </>
  );
}
