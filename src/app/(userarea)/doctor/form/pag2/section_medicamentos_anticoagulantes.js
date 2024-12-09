import Anticoagulants from "@/components/forms_components/anticoagulants";
import Spinner from "@/components/spinner";
import { medicines_anticoagulant_template } from "@/utils/templates";

export default function SectionMedicamentosAnticoagulantes({ myForm }) {
  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4  mb-2">Medicamentos: anticoagulantes</span>

      <div className="list-group">
        {medicines_anticoagulant_template.map((op, i) => (
          <Anticoagulants
            key={`m-a-${i}`}
            medicine={op}
            i={i}
            myForm={myForm}
          />
        ))}
      </div>
    </section>
  );
}
