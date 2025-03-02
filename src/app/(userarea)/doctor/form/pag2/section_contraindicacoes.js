import AbsoluteContraindicationsForm from "@/components/forms_components/absolute_contraindication";
import { useModalContext } from "@/contexts/modal";
import { absolute_contraindication_template } from "@/utils/templates";

export default function SectionContraindicacoes({ myForm }) {
  const { createDeviateConfirmModal } = useModalContext();

  function onConfirmModal() {
    for (const { field, case_yes } of absolute_contraindication_template) {
      myForm.setFormValue(field, "Não");
      if (case_yes) {
        for (const { field, field_other } of case_yes) {
          myForm.popFormValue(field);
          if (field_other) {
            myForm.popFormValue(field_other);
          }
        }
      }
    }
  }

  function no_for_all() {
    createDeviateConfirmModal({
      text: "Tem certeza que deseja marcar todas as contraindicações como não?",
      onConfirm: onConfirmModal,
      onCancel: () => {},
    });
  }

  return (
    <section className="d-flex flex-column mb-4">
      <span className="d-flex fw-bold fs-4 mb-2">Contraindicações</span>
      <div className="my-2">
        <button className="btn btn-primary" onClick={no_for_all}>
          Não para todos
        </button>
      </div>

      {absolute_contraindication_template.map((question, i) => (
        <AbsoluteContraindicationsForm key={`ac_${i}`} myForm={myForm} question={question} i={i} />
      ))}
    </section>
  );
}
