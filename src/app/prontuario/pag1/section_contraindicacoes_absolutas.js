import AbsoluteContraindicationsForm from "@/components/forms_components/absolute_contraindication";
import Spinner from "@/components/spinner";
import { useDataContext } from "@/contexts/data";
import { useEffect, useState } from "react";

export default function SectionContraindicacoesAbsolutas({ myForm }) {
  const { api } = useDataContext();
  const [template, setTemplate] = useState(null);
  const { setFormValue } = myForm;

  const [responses, setResponses] = useState({});

  useEffect(() => {
    api.get_absolute_contraindication_template().then(setTemplate);
  }, []);

  useEffect(() => {
    setFormValue("absolute_contraindications", Object.values(responses));
  }, [responses]);

  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4 mb-2">Contraindicações Absolutas</span>
      {template === null ? (
        <Spinner />
      ) : (
        template.map((question, i) => (
          <AbsoluteContraindicationsForm
            key={question.id}
            setResponses={setResponses}
            question={question}
            i={i}
          />
        ))
      )}
    </section>
  );
}
