import { rankin_template } from "@/utils/templates";
import Image from "next/image";
export default function SectionRankin({ myForm }) {
  return (
    <section className="d-flex flex-column mb-4">
      <span className="d-flex fw-bold fs-4 mb-2">Funcionalidade prévia e rankin</span>
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
      <div className="d-flex list-group">
        {rankin_template.map((question, i) => (
          <label key={`c-${i}`} className="d-flex list-group-item">
            <input
              type="radio"
              className="form-check-input me-1 mt-0"
              name="rankin"
              onChange={() => {
                myForm.setMultipleFormValue({
                  rankin_score: question.score,
                  rankin_description: question.name,
                });
              }}
            />
            {question.score} - {question.name} {question.help && ` - ${question.help}`}
          </label>
        ))}
      </div>
    </section>
  );
}
