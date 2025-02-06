import AbsoluteContraindicationsForm from "@/components/forms_components/absolute_contraindication";
import { absolute_contraindication_template } from "@/utils/templates";

export default function SectionContraindicacoesAbsolutas({ myForm }) {
  return (
    <section className="d-flex flex-column mb-4">
      <span className="d-flex fw-bold fs-4 mb-2">Contraindicações Absolutas</span>
      {absolute_contraindication_template.map((question, i) => (
        <AbsoluteContraindicationsForm key={`ac_${i}`} myForm={myForm} question={question} i={i} />
      ))}
    </section>
  );
}
