import FormInput from "@/components/forms/formInput";

export default function SectionMedicamentos({ myForm }) {
  return (
    <section className="flex-column mb-4">
      <span className="fw-bold fs-4  mb-2">Medicamentos</span>
      <FormInput
        type="text"
        className="form-control"
        name="other_medicines"
        myForm={myForm}
      />
    </section>
  );
}
