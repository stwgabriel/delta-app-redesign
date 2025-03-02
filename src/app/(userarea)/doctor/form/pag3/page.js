"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { interpolateColour } from "@/utils/colorf";
import { useForm } from "@/contexts/form";
import { useChart } from "@/contexts/chart";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { getMaxNIHCount } from "@/utils/funcs";
import { useClientNotificationContext } from "@/contexts/client_notification";
export default function ProntuarioPage3Page() {
  const { notifyError, notifyWarn, notifyConfirm } = useClientNotificationContext();
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes, get_nih_template } = useAPIContext();
  const [NIHTemplate, setNIHTemplate] = useState(null);
  // ---------------------------------------------------------------------------

  const myForm = useForm({ page3_status: "COMPLETO" });
  const { refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  useEffect(() => {
    get_nih_template().then(setNIHTemplate).catch(console.error);
  }, []);

  function send_form() {
    for (const { description, field, items } of NIHTemplate) {
      const field_value = myForm.getFormValue(field, "");
      if (field_value.trim() === "") {
        notifyError(`NIH não preenchido: ${description}`);
        return;
      }

      for (const itm of items) {
        if (itm.id === field_value) {
          if (itm.require_text_input) {
            console.log("fOUND I");
            const field_value_other = myForm.getFormValue(`${field}_other`, "");
            if (field_value_other.trim() === "") {
              notifyError(`Descrioção de NIH não preenchido: ${description}`);
              return;
            }
          }
        }
      }
    }

    const blood_pressure_systolic = myForm.getFormValue("blood_pressure_systolic", "");
    if (blood_pressure_systolic === null || blood_pressure_systolic === "") {
      notifyError("Pressão arterial sistólica não preenchida");
      return;
    }

    const blood_pressure_diastolic = myForm.getFormValue("blood_pressure_diastolic", "");
    if (blood_pressure_diastolic === null || blood_pressure_diastolic === "") {
      notifyError("Pressão arterial diastólica não preenchida");
      return;
    }

    const dextro = myForm.getFormValue("dextro", "");
    if (dextro === null || dextro === "") {
      notifyError("Dextro não preenchido");
      return;
    }

    const dextrovalue = parseFloat(myForm.getFormValue("dextro"));
    if (dextrovalue >= 400 || dextrovalue <= 70) {
      notifyConfirm("Considere correção glicêmica");
    }

    const blood_pressure_systolic_value = parseFloat(myForm.getFormValue("blood_pressure_systolic"));
    const blood_pressure_diastolic_value = parseFloat(myForm.getFormValue("blood_pressure_diastolic"));
    if (blood_pressure_diastolic_value >= 120 || blood_pressure_systolic_value >= 220) {
      notifyConfirm("Considere redução pressórica");
    }

    chart_update_attributes(chart_id, { ...myForm.values, clock_form_end: new Date().toISOString() })
      .then(() => refreshChart(false))
      .catch((e) => notifyError(e.message));
  }

  function getNIHCount() {
    let cnt = 0;
    for (const section of NIHTemplate) {
      const itemId = myForm.getFormValue(section.field);
      for (const item of section.items) {
        if (item.id == itemId) {
          console.log(item.description, item.score);
          cnt += item.score;
        }
      }
    }
    return cnt;
  }

  return (
    <>
      <section className="d-flex flex-column my-4 align-items-center">
        <span className="d-flex fs-1">Prontuário: Beira-leito</span>
      </section>

      <section className="d-flex flex-column mb-4">
        <span className="d-flex fw-bold fs-4 mb-2">NIH</span>
        {NIHTemplate === null ? (
          <Spinner />
        ) : (
          <div className="d-flex flex-column">
            <div className="d-flex input-group mb-2">
              <span className="d-flex input-group-text ">NIH</span>
              <span
                className="d-flex input-group-text "
                style={{
                  backgroundColor: interpolateColour("#198754", "#dc3545", getNIHCount() / getMaxNIHCount(NIHTemplate)),
                }}
              >
                {getNIHCount()} pontos
              </span>
            </div>
            {NIHTemplate.map((section, i) => (
              <div key={`sc-${i}`} className="d-flex flex-column mb-3">
                <span className="d-flex fw-bold">{section.description}</span>
                {section.items.map((item, j) => (
                  <div key={`qst-${j}`} className="d-flex flex-column form-check">
                    <div>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`sc-${i}-qst-${j}`}
                        name={`sc-${i}`}
                        checked={myForm.getFormValue(section.field) === item.id}
                        onChange={() => {
                          console.log("Popping", `${section.field}_other`);
                          myForm.popFormValue(`${section.field}_other`);
                          myForm.setFormValue(section.field, item.id);
                        }}
                      />
                      <label className="d-flex form-check-label mt-1" htmlFor={`sc-${i}-qst-${j}`}>
                        {item.description} ({item.score} pontos)
                      </label>
                    </div>
                    {item.require_text_input === true && (
                      <div className="d-flex form-floating mt-2" id={`sc-${i}-qst-${j}-txt`}>
                        <input
                          type="text"
                          className="form-control"
                          id={`sc-${i}-qst-${j}-txt`}
                          placeholder="Explique"
                          value={myForm.getFormValue(`${section.field}_other`) || ""}
                          onChange={(e) => {
                            const newVal = {
                              [section.field]: item.id,
                              [`${section.field}_other`]: e.target.value,
                            };
                            myForm.setMultipleFormValue(newVal);
                          }}
                        />
                        <label className="d-flex" htmlFor={`sc-${i}-qst-${j}-txt`}>
                          Explique
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="d-flex flex-column mb-4">
        <span className="d-flex fw-bold fs-4 mb-2">Sinais vitais e Outros</span>

        <div className="d-flex input-group mb-2 mt-2">
          <span className="d-flex input-group-text">Peso aproximado (kg)</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("weight") || ""}
            onChange={(e) => myForm.setFormValue("weight", e.target.value)}
          />
        </div>

        <div className="d-flex input-group mb-2">
          <span className="d-flex input-group-text">Pressão arterial (mm/Hg)</span>
          <input
            type="number"
            className="form-control"
            placeholder="Sistólica"
            value={myForm.getFormValue("blood_pressure_systolic") || ""}
            onChange={(e) => myForm.setFormValue("blood_pressure_systolic", e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Diastólica"
            value={myForm.getFormValue("blood_pressure_diastolic") || ""}
            onChange={(e) => myForm.setFormValue("blood_pressure_diastolic", e.target.value)}
          />
        </div>
        <div className="d-flex input-group mb-2">
          <span className="d-flex input-group-text">Dextro</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("dextro") || ""}
            onChange={(e) => myForm.setFormValue("dextro", e.target.value)}
          />
        </div>

        <div className="d-flex input-group mb-2">
          <span className="d-flex input-group-text">Saturação O2</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("saturation") || ""}
            onChange={(e) => myForm.setFormValue("saturation", e.target.value)}
          />
        </div>

        <div className="d-flex input-group mb-2">
          <span className="d-flex input-group-text">Frequência cardíaca</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("heart_rate") || ""}
            onChange={(e) => myForm.setFormValue("heart_rate", e.target.value)}
          />
        </div>

        <div className="d-flex input-group mb-2">
          <span className="d-flex input-group-text">INR</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("inr") || ""}
            onChange={(e) => myForm.setFormValue("inr", e.target.value)}
          />
        </div>
      </section>

      <section className="d-flex flex-column mb-5">
        <button className="btn btn-primary" onClick={send_form}>
          Enviar
        </button>
      </section>
    </>
  );
}
