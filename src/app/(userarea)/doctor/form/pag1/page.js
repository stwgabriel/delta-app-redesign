"use client";
import React from "react";
import { useForm } from "@/contexts/form";
import { useAPIContext } from "@/contexts/api";
import { useSearchParams } from "next/navigation";
import { criterio_protocolo_avc } from "@/utils/templates";
import Spinner from "@/components/spinner";
import { useChart } from "@/contexts/chart";
import { useClientNotificationContext } from "@/contexts/client_notification";

export default function ProntuarioPage1Page() {
  const { notifyError } = useClientNotificationContext();
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes } = useAPIContext();

  // ---------------------------------------------------------------------------

  const myForm = useForm({ avc_page1_complete: true, clock_form_start: new Date().toISOString() });
  const { chart, refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  function send_form() {
    chart_update_attributes(chart_id, myForm.values)
      .then(() => refreshChart(false))
      .catch((e) => notifyError(e.message));
  }

  return (
    <>
      <section className="d-flex flex-column my-4 align-items-center">
        <span className="d-flex fs-1">Prontuário</span>
      </section>

      {chart === null ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <h1 className="d-flex fs-4 my-1">Motivo de ter iniciado o protocolo de AVC</h1>
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

          <section className="d-flex flex-column my-5">
            <button className="btn btn-primary" onClick={send_form}>
              Enviar
            </button>
          </section>
        </React.Fragment>
      )}
    </>
  );
}
