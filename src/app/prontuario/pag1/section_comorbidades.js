import Spinner from "@/components/spinner";
import { useDataContext } from "@/contexts/data";
import { isEmpty } from "@/utils/funcs";
import React, { useEffect, useState } from "react";

export default function SectionComorbidades({ myForm }) {
  const { api } = useDataContext();
  const [template, setTemplate] = useState(null);
  const { setFormValue } = myForm;
  const [responses, setResponses] = useState({});

  useEffect(() => {
    api.get_comorbity_template().then(setTemplate);
  }, []);

  useEffect(() => {
    setFormValue(
      "comorbidities",
      Object.values(responses).filter((x) => !isEmpty(x))
    );
  }, [responses]);

  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4 mb-2">Comorbidades</span>
      <div className="list-group">
        {template === null ? (
          <Spinner />
        ) : (
          template.map((op, i) => (
            <div key={`c-${op.id}`} className="list-group-item flex flex-row">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input me-1 mt-0"
                  name={op.id}
                  onChange={(x) =>
                    setResponses((old) => {
                      return {
                        ...old,
                        [op.id]: {
                          comorbity_template_id: op.id,
                          response: x.target.checked,
                        },
                      };
                    })
                  }
                />
                {op.name}
              </label>
              {op.is_free_text && (
                <input
                  type="text"
                  className="form-control mt-2"
                  disabled={!(responses[op.id]?.response === true)}
                  value={responses[op.id]?.response_text || ""}
                  onChange={(x) =>
                    setResponses((old) => {
                      return {
                        ...old,
                        [op.id]: {
                          ...old[op.id],
                          response_text: x.target.value,
                        },
                      };
                    })
                  }
                />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
