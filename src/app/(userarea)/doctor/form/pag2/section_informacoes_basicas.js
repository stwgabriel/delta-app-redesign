import FormInput from "@/components/forms/formInput";
import {
  AgeInputComponent,
  CPFInputComponent,
  HistoryInputComponent,
  KnownEventTimeInputComponent,
  NameInputComponent,
} from "@/components/forms_components/basic_info";
export default function SectionInformacoesBasicas({ myForm }) {
  return (
    <section className="d-flex flex-column mb-4">
      <span className="d-flex fw-bold fs-4 mb-2">Informações básicas</span>
      <NameInputComponent myForm={myForm} className="mb-3" />
      <CPFInputComponent myForm={myForm} className="mb-3" />
      <AgeInputComponent myForm={myForm} className="mb-3" />

      <section className="d-flex flex-column mb-4">
        <span className="d-flex fw-bold fs-4 mb-2">Outras informações</span>
        <span className="d-flex fs-5 mb-1">Tempo de evento conhecido?</span>
        <KnownEventTimeInputComponent myForm={myForm} />
      </section>

      <HistoryInputComponent myForm={myForm} className="mb-3" />
    </section>
  );
}
