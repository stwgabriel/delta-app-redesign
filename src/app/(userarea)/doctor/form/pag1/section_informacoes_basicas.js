import FormInput from "@/components/forms/formInput";
import { calculateAge } from "@/utils/funcs";
export default function SectionInformacoesBasicas({ myForm }) {
  const { getFormValue } = myForm;

  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4 mb-2">Informações básicas</span>
      <div className="input-group mb-3">
        <span className="input-group-text">Nome</span>
        <FormInput
          type="text"
          className="form-control"
          name="name"
          myForm={myForm}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">CPF</span>
        <FormInput
          type="text"
          className="form-control"
          name="cpf"
          myForm={myForm}
        />
      </div>
      <div className="input-group mb-3">
        {getFormValue("only_age", false) ? (
          <>
            <span className="input-group-text">Idade</span>
            <FormInput
              type="number"
              className="form-control"
              name="age"
              myForm={myForm}
            />
          </>
        ) : (
          <>
            <span className="input-group-text">Data de nascimento</span>
            <FormInput
              type="date"
              className="form-control"
              name="birth_date"
              myForm={myForm}
            />
          </>
        )}

        <span className="input-group-text">
          {getFormValue("only_age", false)
            ? getFormValue("age")
            : calculateAge(getFormValue("birth_date"))}{" "}
          anos
        </span>
        <div className="input-group-text">
          <FormInput
            type="checkbox"
            className="form-check-input"
            name="only_age"
            id={`cb-age`}
            myForm={myForm}
          />

          <label className="form-check-label ms-1" htmlFor={`cb-age`}>
            Informar somente idade
          </label>
        </div>
      </div>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">Outras informações</span>

        <span className="fs-5 mb-1">Tempo de evento conhecido?</span>
        <div className="list-group">
          <label className="list-group-item">
            <FormInput
              type="radio"
              radioValue={true}
              className="form-check-input me-1 mt-0"
              name="known_event_time"
              myForm={myForm}
            />
            Sim
          </label>
          <label className="list-group-item">
            <FormInput
              type="radio"
              radioValue={false}
              className="form-check-input me-1 mt-0"
              name="known_event_time"
              myForm={myForm}
            />
            Não
          </label>

          {getFormValue("known_event_time") === true && (
            <div className="list-group-item">
              <span className="input-group-text">ICTUS às</span>
              <FormInput
                type="datetime-local"
                className="form-control"
                name="ictus"
                myForm={myForm}
              />
            </div>
          )}

          {getFormValue("known_event_time") === false && (
            <div className="list-group-item">
              <span className="input-group-text">Última vez visto bem</span>
              <FormInput
                type="datetime-local"
                className="form-control"
                name="last_seen_well_at"
                myForm={myForm}
              />
            </div>
          )}
        </div>
      </section>

      <div className="flex-column mb-3">
        <span className="fw-bold fs-4 mb-2">História do paciente</span>

        <div className="input-group">
          <span className="input-group-text">História coletada com</span>
          <FormInput
            type="text"
            className="form-control"
            placeholder="SAMU, Mãe, Familiar, ..."
            name="history_collected_with"
            myForm={myForm}
          />
        </div>

        <div className="flex-column my-2">
          <span className="text-secondary">
            - O evento foi presenciado? Descreva em poucas palavras
          </span>
          <span className="text-secondary">
            - Quando havia sido visto bem pela última vez?
          </span>
          <span className="text-secondary">
            - Resuma o fluxo de atendimento do evento até o momento com destaque
            para as condutas médicas.
          </span>
        </div>
        <div className="input-group">
          <FormInput
            type="textarea"
            className="form-control"
            name="history"
            myForm={myForm}
          />
        </div>
      </div>
    </section>
  );
}
