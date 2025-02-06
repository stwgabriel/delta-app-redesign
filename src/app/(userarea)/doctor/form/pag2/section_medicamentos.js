import FormInput from "@/components/forms/formInput";

export default function SectionMedicamentos({ myForm }) {
  return (
    <section className="d-flex flex-column mb-4">
      <span className="d-flex fw-bold fs-4  mb-2">Medicamentos</span>
      <FormInput type="text" className="form-control" name="other_medicines" myForm={myForm} />
    </section>
  );
}
