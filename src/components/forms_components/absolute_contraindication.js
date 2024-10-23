import { useEffect, useState } from "react";
import React from "react";

export default function AbsoluteContraindicationsForm({
  setResponses,
  question,
  i,
}) {
  const [response, setResponse] = useState({});
  const [systemResponse, setSystemResponse] = useState({});
  const [treatmentResponse, setTreatmentResponse] = useState({});

  useEffect(() => {
    // console.log("response", response);
    // console.log("treatmentResponse", treatmentResponse);
    // console.log("systemResponse", systemResponse);

    setResponses((old) => {
      return {
        ...old,
        [question.id]: {
          absolute_contraindication_template_id: question.id,
          response: response["response"] || null,
          system_response: systemResponse["system_response"] || null,
          system_response_free_text:
            systemResponse["system_response_free_text"] || null,
          treatment_response: treatmentResponse["treatment_response"] || null,
        },
      };
    });
  }, [response, systemResponse, treatmentResponse]);

  return (
    <div className="flex-column">
      <span>
        {i + 1}. {question.description}
      </span>
      <div className="d-flex mb-3 justify-content-around mt-3">
        {question.response_group_template.response_templates.map((op) => (
          <div
            key={`ca-qst-${question.id}-op-${op.id}`}
            className="d-flex btn-group"
            role="group"
          >
            <input
              type="radio"
              className="btn-check"
              name={question.id}
              id={`ca-${question.id}-op-${op.id}`}
              autoComplete="off"
              onChange={() => {
                setSystemResponse({});
                setTreatmentResponse({});

                setResponse({
                  absolute_contraindication_template_id: question.id,
                  response_id: op.id,
                  response: op.name,
                });
              }}
            />
            <label
              className="btn btn-outline-primary"
              htmlFor={`ca-${question.id}-op-${op.id}`}
            >
              {op.name}
            </label>
          </div>
        ))}
      </div>

      {question.system_response_required_when !== null &&
        question.system_response_required_when.includes(
          response["response"]
        ) && (
          <div className="flex-column my-2 ms-4">
            <span>Qual sistema?</span>
            <div className="d-flex mb-3 mt-3 justify-content-around">
              {question.system_response_group_template.response_templates.map(
                (op) => (
                  <React.Fragment key={`${question.id}-system-${op.id}`}>
                    <input
                      type="radio"
                      className="btn-check"
                      name={`${question.id}-system`}
                      id={`${question.id}-system-${op.id}`}
                      autoComplete="off"
                      onChange={() =>
                        setSystemResponse({
                          template: op,
                          absolute_contraindication_template_id: question.id,
                          response_id: op.id,
                          system_response: op.name,
                          system_response_free_text: null,
                        })
                      }
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`${question.id}-system-${op.id}`}
                    >
                      {op.name}
                    </label>
                  </React.Fragment>
                )
              )}
            </div>
            {systemResponse.template?.is_free_text && (
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                value={systemResponse.system_response_free_text || ""}
                onChange={(x) => {
                  setSystemResponse((old) => {
                    return {
                      ...old,
                      system_response_free_text: x.target.value,
                    };
                  });
                }}
              />
            )}
          </div>
        )}

      {question.treatment_response_required_when !== null &&
        question.treatment_response_required_when.includes(
          response["response"]
        ) && (
          <div className="flex-column my-2 ms-4">
            <span>Em tratamento?</span>
            <div className="d-flex mb-3 mt-3 justify-content-around">
              {question.treatment_response_group_template.response_templates.map(
                (op) => (
                  <React.Fragment key={`${question.id}-treatment-${op.id}`}>
                    <input
                      type="radio"
                      className="btn-check"
                      name={`${question.id}-treatment`}
                      id={`${question.id}-treatment-${op.id}`}
                      autoComplete="off"
                      onChange={() =>
                        setTreatmentResponse(() => {
                          return {
                            template: op,
                            absolute_contraindication_template_id: question.id,
                            response_id: op.id,
                            treatment_response: op.name,
                          };
                        })
                      }
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`${question.id}-treatment-${op.id}`}
                    >
                      {op.name}
                    </label>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
}
