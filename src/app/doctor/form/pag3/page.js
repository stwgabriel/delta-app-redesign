"use client";
import { useRouter } from "next/navigation";
export default function ProntuarioPage3Page() {
  const router = useRouter();
  return (
    <>
      <section className="flex-column my-4 align-items-center">
        <span className="fs-1">Prontuário: Exames</span>
      </section>

      <section className="container flex-column mb-3">
        <div className="form-control">
          <label htmlFor="formFileMultiple" className="form-label">
            Tomografia
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <div className="form-control mt-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Outros exames
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <div className="form-control mt-3">
          <label htmlFor="formFileMultiple" className="form-label">
            INR
          </label>
          <input
            className="form-control"
            type="text"
            id="formFileMultiple"
            multiple
          />
        </div>
      </section>

      <section className="flex-column mb-5">
        <button
          className="btn btn-primary"
          // onClick={() => router.push("/hall")}
        >
          Chamar atendente
        </button>
      </section>
    </>
  );
}
