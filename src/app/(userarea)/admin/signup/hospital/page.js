"use client";

import { useClientNotificationContext } from "@/contexts/client_notification";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { HospitalDataComponent, ListaContatoComponent } from "@/components/hospital/components";
import Spinner from "@/components/spinner";

export default function SignupConsultorPage() {
  const router = useRouter();

  const { notifySuccess, notifyError } = useClientNotificationContext();
  const { create_hospital } = useAPIContext();

  // ---------------- form states ----------------

  const [hospitalSubmitLoading, setHospitalSubmitLoading] = useState(false);
  const [hospital, setHospital] = useState({});
  const [contacts, setContacts] = useState([{ edit: true }]);

  // ---------------------------------------------

  function handleSubmit() {
    setHospitalSubmitLoading(true);

    if (contacts.length === 0) {
      notifyError("Adicione ao menos um contato para o hospital");
      setHospitalSubmitLoading(false);
      return;
    }

    const hospitalData = { ...hospital, contacts: [...contacts] };
    create_hospital(hospitalData)
      .then((r) => {
        notifySuccess("Hospital criado!");
        router.push(`${ROUTES.USER.SETTINGS_PAGE_HOSPITAL}?hospital_id=${r.id}`);
      })
      .catch((e) => notifyError(e.message || "Erro desconhecido"))
      .finally(() => setHospitalSubmitLoading(false));
  }

  return (
    <section className="d-flex flex-column align-items-center flex-fill justify-content-center">
      <div className="container">
        <span className="fs-3 my-5">Cadastro do Hospital</span>
        <HospitalDataComponent isEditing={true} hospital={hospital} setHospital={setHospital} />
        <span className="fs-3 my-5">Contatos</span>
        <ListaContatoComponent contactsChanges={contacts} setContactsChanges={setContacts} />
        <div className="d-flex justify-content-center mt-3 mb-5">
          {hospitalSubmitLoading ? (
            <Spinner />
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>
              Salvar
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
