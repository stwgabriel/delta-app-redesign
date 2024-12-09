import AbsoluteContraindicationsForm from "@/components/forms_components/absolute_contraindication";
import Spinner from "@/components/spinner";
import { absolute_contraindication_template } from "@/utils/templates";

export default function SectionContraindicacoesAbsolutas({ myForm }) {
  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4 mb-2">Contraindicações Absolutas</span>
      {absolute_contraindication_template.map((question, i) => (
        <AbsoluteContraindicationsForm
          key={`ac_${i}`}
          myForm={myForm}
          question={question}
          i={i}
        />
      ))}
    </section>
  );
}
