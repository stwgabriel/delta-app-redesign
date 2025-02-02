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
  const { notifyError } = useClientNotificationContext();
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes, get_nih_template } = useAPIContext();
  const [template, setTemplate] = useState(null);
  // ---------------------------------------------------------------------------

  const myForm = useForm({ page3_status: "COMPLETO" });
  const { refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  useEffect(() => {
    get_nih_template().then(setTemplate).catch(console.error);
  }, []);

  function send_form() {
    chart_update_attributes(chart_id, { ...myForm.values, clock_form_end: new Date().toISOString() })
      .then(() => refreshChart(false))
      .catch((e) => notifyError(e.message));
  }

  function getNIHCount() {
    let cnt = 0;
    for (const section of template) {
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
      <section className="flex-column my-4 align-items-center">
        <span className="fs-1">Prontuário: Beira-leito</span>
      </section>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">NIH</span>
        {template === null ? (
          <Spinner />
        ) : (
          <div className="flex-column">
            <div className="input-group mb-2">
              <span className="input-group-text ">NIH</span>
              <span
                className="input-group-text "
                style={{
                  backgroundColor: interpolateColour("#198754", "#dc3545", getNIHCount() / getMaxNIHCount(template)),
                }}
              >
                {getNIHCount()} pontos
              </span>
            </div>
            {template.map((section, i) => (
              <div key={`sc-${i}`} className="flex-column mb-3">
                <span className="fw-bold">{section.description}</span>
                {section.items.map((item, j) => (
                  <div key={`qst-${j}`} className="form-check">
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
                    <label className="form-check-label mt-1" htmlFor={`sc-${i}-qst-${j}`}>
                      {item.description} ({item.score} pontos)
                    </label>

                    {item.require_text_input === true && (
                      <div className="form-floating" id={`sc-${i}-qst-${j}-txt`}>
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
                        <label htmlFor={`sc-${i}-qst-${j}-txt`}>Explique</label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">Sinais vitais e Outros</span>

        <div className="input-group mb-2 mt-2">
          <span className="input-group-text">Peso aproximado (kg)</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("weight") || ""}
            onChange={(e) => myForm.setFormValue("weight", e.target.value)}
          />
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">Pressão arterial</span>
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
        <div className="input-group mb-2">
          <span className="input-group-text">Dextro</span>
          <input
            type="text"
            className="form-control"
            value={myForm.getFormValue("dextro") || ""}
            onChange={(e) => myForm.setFormValue("dextro", e.target.value)}
          />
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">Saturação O2</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("saturation") || ""}
            onChange={(e) => myForm.setFormValue("saturation", e.target.value)}
          />
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">Frequência cardíaca</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("heart_rate") || ""}
            onChange={(e) => myForm.setFormValue("heart_rate", e.target.value)}
          />
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">INR</span>
          <input
            type="number"
            className="form-control"
            value={myForm.getFormValue("inr") || ""}
            onChange={(e) => myForm.setFormValue("inr", e.target.value)}
          />
        </div>
      </section>

      <section className="flex-column mb-5">
        <button className="btn btn-primary" onClick={send_form}>
          Enviar
        </button>
      </section>
    </>
  );
}
