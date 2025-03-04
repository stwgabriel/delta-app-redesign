"use client";

import {
  AgeInputComponent,
  CPFInputComponent,
  HistoryInputComponent,
  NameInputComponent,
} from "@/components/forms_components/basic_info";
import { useAPIContext } from "@/contexts/api";
import { useChart } from "@/contexts/chart";
import { useForm } from "@/contexts/form";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ParecerPage() {
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes } = useAPIContext();

  const myForm = useForm({ opinion_page1_complete: true });
  const { chart, refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  function send_form() {
    chart_update_attributes(chart_id, myForm.values)
      .then(() => refreshChart(false))
      .catch((e) => notifyError(e.message));
  }

  https: return (
    <React.Fragment>
      <span className="d-flex fw-bold fs-1 mb-2">Parecer</span>
      <span className="d-flex fs-4 mb-2">Sub-tipo: {chart?.subtype?.value}</span>
      <span className="d-flex fw-bold fs-4 mb-2">Informações básicas</span>
      <NameInputComponent myForm={myForm} className="mb-3" />
      <CPFInputComponent myForm={myForm} className="mb-3" />
      <AgeInputComponent myForm={myForm} className="mb-3" />

      <HistoryInputComponent myForm={myForm} className="mb-3" />

      <section className="d-flex flex-column mb-5">
        <button className="btn btn-primary" onClick={send_form}>
          Enviar
        </button>
      </section>
    </React.Fragment>
  );
}
