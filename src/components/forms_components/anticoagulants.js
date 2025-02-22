import { useClientNotificationContext } from "@/contexts/client_notification";

export default function Anticoagulants({ medicine, i, myForm }) {
  const { notifyConfirm } = useClientNotificationContext();

  return (
    <div className="d-flex input-group">
      <div className="d-flex form-control flex-column justify-content-around" role="group">
        <div className="d-flex justify-content-around">
          <span className="d-flex align-items-center pb-1">{medicine.text}</span>
        </div>
        <div className="d-flex justify-content-around">
          {medicine.text_input === true ? (
            <input
              type="text"
              className="form-control"
              onChange={(x) => {
                let newVal = {
                  [medicine.field]: x.target.value,
                };
                myForm.setMultipleFormValue(newVal);
              }}
            />
          ) : (
            ["Sim", "Não", "Não sei"].map((op, j) => (
              <div className="d-flex" key={`${medicine.id}-${j}`}>
                <input
                  type="radio"
                  className="btn-check"
                  name={`aco-${i}`}
                  autoComplete="off"
                  id={`aco-${i}-${j}`}
                  onChange={() => {
                    if (op === "Sim") {
                      if (medicine.on_yes_confirm_warn) {
                        notifyConfirm({ msg: medicine.on_yes_confirm_warn });
                      }
                    }
                    let newVal = {
                      [medicine.field]: op,
                      [medicine.field_timestamp]: null,
                    };
                    myForm.setMultipleFormValue(newVal);
                  }}
                />

                <label className="d-flex btn btn-outline-primary" htmlFor={`aco-${i}-${j}`}>
                  {op}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
      {medicine.text_input !== true && (
        <div className="d-flex form-control">
          Última aplicação/ingestão
          <input
            type="datetime-local"
            className="form-control"
            disabled={myForm.getFormValue(medicine.field) !== "Sim"}
            value={myForm.getFormValue(medicine.field_timestamp) || ""}
            onChange={(x) => myForm.setFormValue(medicine.field_timestamp, x.target.value)}
          />
        </div>
      )}
    </div>
  );
}
