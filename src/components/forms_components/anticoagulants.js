export default function Anticoagulants({ medicine, i, myForm }) {
  return (
    <div className="d-flex input-group">
      {/* <div className="form-control flex-row d-flex">
        <span className="d-flex align-items-center">{medicine.name}</span>
        {medicine?.should_collect_inr === true && response === "Sim" && (
          <span className="d-flex badge text-bg-warning d-flex ms-2 align-items-center">
            Coletar INR
          </span>
        )}
      </div> */}

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
                  // [medicine.field_timestamp]: null,
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
                  onChange={(x) => {
                    console.log(myForm.getFormValue(medicine.field));
                    console.log(myForm.getFormValue(medicine.field) === "Sim");
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
