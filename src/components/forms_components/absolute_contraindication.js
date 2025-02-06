import React from "react";

export default function AbsoluteContraindicationsForm({ myForm, question, i }) {
  const { setFormValue, getFormValue, setMultipleFormValue } = myForm;

  return (
    <div className="d-flex flex-column">
      <span className="d-flex">
        {i + 1}. {question.text}
      </span>
      <div className="d-flex mb-3 justify-content-around mt-3">
        {["Sim", "Não", "Não sei"].map((option, j) => (
          <div key={`ac-${i}-op-${j}`} className="d-flex btn-group" role="group">
            <input
              type="radio"
              className="btn-check"
              id={`ac-${i}-op-${j}`}
              name={`ac-${i}`}
              autoComplete="off"
              onChange={() => {
                setFormValue(question.field, option);
              }}
            />
            <label className="d-flex btn btn-outline-primary" htmlFor={`ac-${i}-op-${j}`}>
              {option}
            </label>
          </div>
        ))}
      </div>

      {question.case_yes &&
        getFormValue(question.field) === "Sim" &&
        question.case_yes.map((subquestion, j) => (
          <div className="d-flex flex-column my-2 ms-4" key={`ac-${i}-${j}`}>
            <span className="d-flex">{subquestion.text}</span>
            <div className="d-flex mb-3 mt-3 justify-content-around">
              {subquestion.options.map((option, k) => (
                <React.Fragment key={`ac-${i}-${j}-${k}`}>
                  <input
                    type="radio"
                    className="btn-check"
                    name={`ac-${i}-${j}`}
                    id={`ac-${i}-${j}-${k}`}
                    autoComplete="off"
                    onChange={() => {
                      let newVal = {
                        [subquestion.field]: option.text,
                      };
                      if (subquestion.field_other) {
                        newVal[subquestion.field_other] = null;
                      }

                      setMultipleFormValue(newVal);
                    }}
                  />
                  <label className="d-flex btn btn-outline-primary" htmlFor={`ac-${i}-${j}-${k}`}>
                    {option.text}
                  </label>
                </React.Fragment>
              ))}
            </div>
            {getFormValue(subquestion.field) === "Outro" && (
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                value={getFormValue(subquestion.field_other) || ""}
                onChange={(x) => {
                  setFormValue(subquestion.field_other, x.target.value);
                }}
              />
            )}
          </div>
        ))}
    </div>
  );
}
