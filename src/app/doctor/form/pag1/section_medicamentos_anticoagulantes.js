import Anticoagulants from "@/components/forms_components/anticoagulants";
import Spinner from "@/components/spinner";
// import { useDataContext } from "@/contexts/data";
import { isEmpty } from "@/utils/funcs";
import { useEffect, useState } from "react";

export default function SectionMedicamentosAnticoagulantes({ myForm }) {
  const { api } = useDataContext();
  const [template, setTemplate] = useState(null);
  const [responses, setResponses] = useState({});

  const { setFormValue } = myForm;

  useEffect(() => {
    api.get_anticoagulants_template().then(setTemplate);
  }, []);

  useEffect(() => {
    setFormValue(
      "anticoagulants",
      Object.values(responses).filter((x) => !isEmpty(x))
    );
  }, [responses]);

  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4  mb-2">Medicamentos: anticoagulantes</span>

      <div className="list-group">
        {template === null ? (
          <Spinner />
        ) : (
          template.map((op, i) => (
            <Anticoagulants
              key={`m-a-${i}`}
              medicine={op}
              i={i}
              myForm={myForm}
              setResponses={setResponses}
            />
          ))
        )}
      </div>
    </section>
  );
}
