import { useEffect, useState } from "react";

export default function Anticoagulants({ medicine, i, setResponses }) {
  const [response, setResponse] = useState({});

  useEffect(() => {
    setResponses((old) => {
      return { ...old, [medicine.id]: response };
    });
  }, [response]);

  return (
    <div className="input-group">
      {/* <div className="form-control flex-row d-flex">
        <span className="d-flex align-items-center">{medicine.name}</span>
        {medicine?.should_collect_inr === true && response === "Sim" && (
          <span className="badge text-bg-warning d-flex ms-2 align-items-center">
            Coletar INR
          </span>
        )}
      </div> */}

      <div
        className="form-control flex-column justify-content-around"
        role="group"
      >
        <div className="flex justify-content-around">
          <span className="d-flex align-items-center pb-1">
            {medicine.name}
          </span>
        </div>
        <div className="flex justify-content-around">
          {medicine.is_free_text === true ? (
            <input
              type="text"
              className="form-control"
              // placeholder={medicine.name}
              onChange={(x) =>
                setResponse({
                  anticoagulant_template_id: medicine.id,
                  response: x.target.value,
                })
              }
            />
          ) : (
            ["Sim", "Não", "Não sei"].map((op, j) => (
              <div key={`${medicine.id}-${j}`}>
                <input
                  type="radio"
                  className="btn-check"
                  name={medicine.id}
                  autoComplete="off"
                  id={`ma-${i}-${j}`}
                  onChange={(x) =>
                    setResponse({
                      anticoagulant_template_id: medicine.id,
                      response: op,
                    })
                  }
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor={`ma-${i}-${j}`}
                  key={`macl-${i}-${j}`}
                >
                  {op}
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="form-control">
        Última aplicação/ingestão
        <input
          type="datetime-local"
          className="form-control"
          disabled={!(response["response"] === "Sim")}
          value={response.taken_at || ""}
          onChange={(x) =>
            setResponse((old) => {
              return {
                ...old,
                taken_at: x.target.value,
              };
            })
          }
        />
      </div>
    </div>
  );
}
