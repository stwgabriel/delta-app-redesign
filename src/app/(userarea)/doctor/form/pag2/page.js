"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "@/contexts/form";
import SectionInformacoesBasicas from "./section_informacoes_basicas";
import SectionContraindicacoes from "./section_contraindicacoes";
import SectionRankin from "./section_rankin";
import SectionComorbidades from "./section_comorbidades";
import SectionMedicamentosAnticoagulantes from "./section_medicamentos_anticoagulantes";
import SectionMedicamentos from "./section_medicamentos";
import { useAPIContext } from "@/contexts/api";
import { useChart } from "@/contexts/chart";
import Spinner from "@/components/spinner";
import { useClientNotificationContext } from "@/contexts/client_notification";
import { contraindication_template, medicines_anticoagulant_template } from "@/utils/templates";

export default function ProntuarioPage2Page() {
  const { notifyError } = useClientNotificationContext();
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes } = useAPIContext();

  // ---------------------------------------------------------------------------

  const myForm = useForm({ avc_page2_complete: true });
  const { chart, refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  function send_form() {
    if (myForm.getFormValue("name").trim() === "") {
      notifyError("Nome não preenchido");
      return;
    }

    const only_age = myForm.getFormValue("only_age", false);
    if (only_age) {
      const age = myForm.getFormValue("age", "");
      if (age.trim() === "") {
        notifyError("Idade não preenchida");
        return;
      }
    } else {
      const birth_date = myForm.getFormValue("birth_date", "");
      if (birth_date.trim() === "") {
        notifyError("Data de nascimento não preenchida");
        return;
      }
    }

    const known_event_time = myForm.getFormValue("known_event_time", false);
    if (known_event_time) {
      const ictus = myForm.getFormValue("ictus", "");
      if (ictus.trim() === "") {
        notifyError("ICTUS não preenchido");
        return;
      }
    } else {
      const last_seen_well_at = myForm.getFormValue("last_seen_well_at", "");
      if (last_seen_well_at.trim() === "") {
        notifyError("Data de última vez visto bem não preenchida");
        return;
      }
    }

    for (const question of contraindication_template) {
      const { field, text, case_yes } = question;
      const field_value = myForm.getFormValue(field, "");
      if (field_value.trim() === "") {
        notifyError(`Pergunta de contraindicação não respondida: ${text}`);
        return;
      }

      if (case_yes && field_value.trim() === "Sim") {
        for (const subquestion of case_yes) {
          const { field: subfield, field_other: subfield_other, text: subtext } = subquestion;
          const subfield_value = myForm.getFormValue(subfield, "");
          if (subfield_value.trim() === "") {
            notifyError(`Pergunta de contraindicação não respondida: ${subtext}`);
            return;
          }
          if (subfield_value.trim() === "Outro") {
            const subfield_other_value = myForm.getFormValue(subfield_other, "");
            if (subfield_other_value === null || subfield_other_value.trim() === "") {
              notifyError(`Pergunta de contraindicação não respondida: ${subtext}`);
              return;
            }
          }
        }
      }
    }

    const rankin_score = myForm.getFormValue("rankin_score", null);
    if (rankin_score === null || rankin_score === "") {
      notifyError("Rankin não preenchido");
      return;
    }

    for (const med of medicines_anticoagulant_template) {
      const { text, field, field_timestamp, text_input } = med;
      if (text_input) continue;

      const field_value = myForm.getFormValue(field, "");
      if (field_value.trim() === "") {
        notifyError(`Anticoagulante não preenchido: ${text}`);
        return;
      }
      if (field_value.trim() === "Sim") {
        const field_timestamp_value = myForm.getFormValue(field_timestamp, "");
        if (field_timestamp_value === null || field_timestamp_value.trim() === "") {
          notifyError(`Data do anticoagulante não preenchido: ${text}`);
          return;
        }
      }
    }

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
          <SectionInformacoesBasicas myForm={myForm} />
          <SectionContraindicacoes myForm={myForm} />
          <SectionRankin myForm={myForm} />
          <SectionMedicamentosAnticoagulantes myForm={myForm} />
          <SectionMedicamentos myForm={myForm} />
          <SectionComorbidades myForm={myForm} />
          <section className="d-flex flex-column mb-5">
            <button className="btn btn-primary" onClick={send_form}>
              Enviar
            </button>
          </section>
        </React.Fragment>
      )}
    </>
  );
}
