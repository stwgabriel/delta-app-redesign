import Anticoagulants from "@/components/forms_components/anticoagulants";
import { useModalContext } from "@/contexts/modal";
import { medicines_anticoagulant_template } from "@/utils/templates";

export default function SectionMedicamentosAnticoagulantes({ myForm }) {
  const { createDeviateConfirmModal } = useModalContext();

  function onConfirmModal() {
    for (const { field, field_timestamp } of medicines_anticoagulant_template) {
      myForm.setFormValue(field, "Não");
      myForm.popFormValue(field_timestamp);
    }
  }

  function no_for_all() {
    createDeviateConfirmModal({
      text: "Tem certeza que deseja marcar todos os anticoagulantes como não?",
      onConfirm: onConfirmModal,
      onCancel: () => {},
    });
  }

  return (
    <section className="d-flex flex-column mb-4">
      <span className="d-flex fw-bold fs-4  mb-2">Medicamentos: anticoagulantes</span>
      <div className="my-2">
        <button className="btn btn-primary" onClick={no_for_all}>
          Não para todos
        </button>
      </div>
      <div className="d-flex list-group">
        {medicines_anticoagulant_template.map((op, i) => (
          <Anticoagulants key={`m-a-${i}`} medicine={op} i={i} myForm={myForm} />
        ))}
      </div>
    </section>
  );
}
