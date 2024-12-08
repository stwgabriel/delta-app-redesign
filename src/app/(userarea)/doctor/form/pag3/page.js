"use client";
import { useAPIContext } from "@/contexts/api";
import { useChart } from "@/contexts/chart";
import { useForm } from "@/contexts/form";
import { ROUTES } from "@/utils/variables";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export default function ProntuarioPage3Page() {
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart_update_attributes } = useAPIContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  // ---------------------------------------------------------------------------

  const myForm = useForm({ page3_status: "COMPLETO" });
  const { refreshChart } = useChart(chart_id, true);

  // ---------------------------------------------------------------------------

  function send_form() {
    setErrorMessage(null);
    chart_update_attributes(chart_id, myForm.values)
      .then(() => {
        // refreshChart();
        router.push(`${ROUTES.PRONTUARIO}?chart_id=${chart_id}`);
      })
      .catch((e) => setErrorMessage(e.message));
  }

  return (
    <>
      <section className="flex-column my-4 align-items-center">
        <span className="fs-1">Prontuário: Exames</span>
      </section>

      <section className="container flex-column mb-3">
        <div className="form-control">
          <label htmlFor="formFileMultiple" className="form-label">
            Tomografia
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <div className="form-control mt-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Outros exames
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <div className="form-control mt-3">
          <label htmlFor="formFileMultiple" className="form-label">
            INR
          </label>
          <input
            className="form-control"
            type="number"
            value={myForm.getFormValue("inr") || ""}
            onChange={(e) =>
              myForm.setFormValue(
                "inr",
                e.target.value === "" ? null : e.target.value
              )
            }
          />
        </div>
      </section>

      <section className="flex-column mb-5">
        <button className="btn btn-primary" onClick={send_form}>
          Chamar atendente
        </button>
      </section>
    </>
  );
}
