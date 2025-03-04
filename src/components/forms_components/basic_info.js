import FormInput from "@/components/forms/formInput";
import { calculateAge } from "@/utils/funcs";

export function NameInputComponent({ myForm, className }) {
  return (
    <div className={`d-flex input-group ${className ? className : ""}`}>
      <span className="d-flex input-group-text">Nome</span>
      <FormInput type="text" className="form-control" name="name" myForm={myForm} />
    </div>
  );
}

export function CPFInputComponent({ myForm, className }) {
  return (
    <div className={`d-flex input-group ${className ? className : ""}`}>
      <span className="d-flex input-group-text">CPF</span>
      <FormInput type="text" className="form-control" name="cpf" myForm={myForm} />
    </div>
  );
}

export function AgeInputComponent({ myForm, className }) {
  return (
    <div className={`d-flex input-group ${className ? className : ""}`}>
      {myForm.getFormValue("only_age", false) ? (
        <>
          <span className="d-flex input-group-text">Idade</span>
          <FormInput type="number" className="form-control" name="age" myForm={myForm} />
        </>
      ) : (
        <>
          <span className="d-flex input-group-text">Data de nascimento</span>
          <FormInput type="date" className="form-control" name="birth_date" myForm={myForm} />
        </>
      )}
      <span className="d-flex input-group-text">
        {myForm.getFormValue("only_age", false)
          ? myForm.getFormValue("age")
          : calculateAge(myForm.getFormValue("birth_date"))}{" "}
        anos
      </span>
      <div className="d-flex input-group-text">
        <FormInput
          type="checkbox"
          className="form-check-input"
          name="only_age"
          id={`cb-age`}
          myForm={myForm}
          onChange={(e) => {
            if (e.target.checked) {
              myForm.popFormValue("birth_date");
            } else {
              myForm.popFormValue("age");
            }
          }}
        />

        <label className="d-flex form-check-label ms-1" htmlFor={`cb-age`}>
          Informar somente idade
        </label>
      </div>
    </div>
  );
}

export function KnownEventTimeInputComponent({ myForm, className }) {
  return (
    <div className={`d-flex list-group ${className ? className : ""}`}>
      <label className="d-flex list-group-item">
        <FormInput
          type="radio"
          radioValue={true}
          className="form-check-input me-1 mt-0"
          name="known_event_time"
          myForm={myForm}
          onChange={() => {
            myForm.popFormValue("last_seen_well_at");
          }}
        />
        Sim
      </label>
      <label className="d-flex list-group-item">
        <FormInput
          type="radio"
          radioValue={false}
          className="form-check-input me-1 mt-0"
          name="known_event_time"
          myForm={myForm}
          onChange={() => {
            myForm.popFormValue("ictus");
          }}
        />
        Não
      </label>

      {myForm.getFormValue("known_event_time") === true && (
        <div className="d-flex list-group-item">
          <span className="d-flex input-group-text">ICTUS às</span>
          <FormInput type="datetime-local" className="form-control" name="ictus" myForm={myForm} />
        </div>
      )}

      {myForm.getFormValue("known_event_time") === false && (
        <div className="d-flex list-group-item">
          <span className="d-flex input-group-text">Última vez visto bem</span>
          <FormInput type="datetime-local" className="form-control" name="last_seen_well_at" myForm={myForm} />
        </div>
      )}
    </div>
  );
}

export function HistoryInputComponent({ myForm, className }) {
  return (
    <div className={`d-flex flex-column ${className ? className : ""}`}>
      <span className="d-flex fw-bold fs-4 mb-2">História do paciente</span>

      <div className="d-flex input-group">
        <span className="d-flex input-group-text">História coletada com</span>
        <FormInput
          type="text"
          className="form-control"
          placeholder="SAMU, Mãe, Familiar, ..."
          name="history_collected_with"
          myForm={myForm}
        />
      </div>

      <div className="d-flex flex-column my-2">
        <span className="d-flex text-secondary">- O evento foi presenciado? Descreva em poucas palavras</span>
        <span className="d-flex text-secondary">- Quando havia sido visto bem pela última vez?</span>
        <span className="d-flex text-secondary">
          - Resuma o fluxo de atendimento do evento até o momento com destaque para as condutas médicas.
        </span>
      </div>
      <div className="d-flex input-group">
        <FormInput type="textarea" className="form-control" name="history" myForm={myForm} />
      </div>
    </div>
  );
}
