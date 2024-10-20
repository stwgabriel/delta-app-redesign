import FormInput from "@/components/forms/formInput";
import Spinner from "@/components/spinner";
import { useDataContext } from "@/contexts/data";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function SectionRankin({ myForm }) {
  const { api } = useDataContext();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    api.get_rankin_template().then(setTemplate);
  }, []);

  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4 mb-2">Funcionalidade prévia e rankin</span>
      <Image
        src="/rankin.png"
        width={4407}
        height={887}
        style={{
          width: "100%",
          height: "auto",
        }}
        alt="Picture of the author"
      />
      <div className="list-group">
        {template === null ? (
          <Spinner />
        ) : (
          template.map((question, i) => (
            <label key={`c-${i}`} className="list-group-item">
              <input
                type="radio"
                className="form-check-input me-1 mt-0"
                name="rankin"
                onChange={() => {
                  myForm.setMultipleFormValue({
                    rankin_score: question.score,
                    rankin_description: question.description,
                  });
                }}
              />
              {question.score} - {question.description}{" "}
              {question.help_text !== null && ` - ${question.help_text}`}
            </label>
          ))
        )}
      </div>
    </section>
  );
}
