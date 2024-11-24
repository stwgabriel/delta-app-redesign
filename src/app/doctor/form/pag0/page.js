"use client";
import React, { useState } from "react";
import { useForm } from "@/contexts/form";
import { useAPIContext } from "@/contexts/api";
import { useSearchParams } from "next/navigation";
import { criterio_protocolo_avc } from "@/utils/templates";
import Spinner from "@/components/spinner";
import { useChart } from "@/contexts/chart";

export default function ProntuarioPage0Page() {
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes } = useAPIContext();
  const [errorMessage, setErrorMessage] = useState(null);

  // ---------------------------------------------------------------------------

  const myForm = useForm({ page0_status: "COMPLETO" });
  const { chart, refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  function send_form() {
    setErrorMessage(null);
    chart_update_attributes(chart_id, myForm.values)
      .then(() => {
        refreshChart();
      })
      .catch((e) => setErrorMessage(e.message));
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
          <h1 className="fs-4 my-1">
            Motivo de ter iniciado o protocolo de AVC
          </h1>
          <select
            className="form-control"
            onChange={(x) => {
              myForm.setFormValue("open_reason", x.target.value);
            }}
            defaultValue={"Selecione o motivo"}
          >
            <option disabled>Selecione o motivo</option>
            {criterio_protocolo_avc.map((itm, i) => (
              <option key={`opt-${i}`}>{itm}</option>
            ))}
          </select>

          <section className="flex-column my-5">
            <button className="btn btn-primary" onClick={send_form}>
              Enviar
            </button>
          </section>
          <p className="text-danger">{errorMessage}</p>
        </React.Fragment>
      )}
    </>
  );
}
