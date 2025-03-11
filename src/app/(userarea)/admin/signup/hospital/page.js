"use client";

import { useClientNotificationContext } from "@/contexts/client_notification";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { HospitalDataComponent, ListaContatoComponent } from "@/components/hospital/components";

export default function SignupConsultorPage() {
  const router = useRouter();

  const { notifySuccess, notifyError } = useClientNotificationContext();
  const { create_hospital } = useAPIContext();

  // ---------------- form states ----------------

  const [hospital, setHospital] = useState({});
  const [contacts, setContacts] = useState([]);

  // ---------------------------------------------

  function handleSubmit() {
    const hospitalData = { ...hospital, contacts: [...contacts] };
    create_hospital(hospitalData)
      .then((r) => {
        notifySuccess("Hospital criado!");
        router.push(`${ROUTES.USER.SETTINGS_PAGE_HOSPITAL}?hospital_id=${r.id}`);
      })
      .catch((e) => notifyError(e.message || "Erro desconhecido"));
  }

  return (
    <section className="d-flex flex-column align-items-center flex-fill justify-content-center">
      <div className="container">
        <span className="fs-3 my-5">Cadastro do Hospital</span>
        <HospitalDataComponent hospital={hospital} setHospital={setHospital} />
        <span className="fs-3 my-5">Contatos</span>
        <ListaContatoComponent contacts={contacts} setContacts={setContacts} />
        <div className="d-flex justify-content-center my-4">
          <button className="btn btn-success align-center" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </section>
  );
}
