import Spinner from "@/components/spinner";
import { isEmpty } from "@/utils/funcs";
import { comorbidities_template } from "@/utils/templates";
import React, { useEffect, useState } from "react";

export default function SectionComorbidades({ myForm }) {
  return (
    <section className="d-flex flex-column mb-4">
      <span className="d-flex fw-bold fs-4 mb-2">Comorbidades</span>
      <div className="d-flex list-group">
        {comorbidities_template.map((op, i) => (
          <div key={`cm-${i}`} className="d-flex list-group-item flex flex-row">
            {op.text_input === true ? (
              <React.Fragment>
                <span className="d-flex">{op.text}</span>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={myForm.getFormValue(op.field) || ""}
                  onChange={(x) => myForm.setFormValue(op.field, x.target.value)}
                />
              </React.Fragment>
            ) : (
              <label className="d-flex">
                <input
                  type="checkbox"
                  className="form-check-input me-1 mt-0"
                  name={op.id}
                  onChange={(x) => myForm.setFormValue(op.field, x.target.checked)}
                />
                {op.text}
              </label>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
