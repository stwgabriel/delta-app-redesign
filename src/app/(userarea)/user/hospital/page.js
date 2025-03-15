"use client";
import { useClientNotificationContext } from "@/contexts/client_notification";
import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { isEmpty } from "@/utils/funcs";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HospitalDataComponent, ListaContatoComponent } from "@/components/hospital/components";

export default function HospitalSettingsPage() {
  const { notifyError } = useClientNotificationContext();
  const { get_hospital, change_hospital, get_hospital_by_id, isAdmin, create_hospital_one_time_password } =
    useAPIContext();
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [hospital, setHospital] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [hospitalChanges, setHospitalChanges] = useState({});
  const [hospitalContactsChanges, setHospitalContactsChanges] = useState([]);
  const [hospitalContactsDeletes, setHospitalContactsDeletes] = useState([]);
  const [hospitalChangesLoading, setHospitalChangesLoading] = useState(false);
  const searchParams = useSearchParams();
  const hospital_id = searchParams.get("hospital_id");
  const [hospitalOneTimePasswordLoading, setHospitalOneTimePasswordLoading] = useState(false);
  const [hospitalOneTimePassword, setHospitalOneTimePassword] = useState(null);

  useEffect(() => {
    setLoadingHospital(true);
    const func = hospital_id ? get_hospital_by_id(hospital_id) : get_hospital();
    func
      .then(setHospital)
      .catch((e) => notifyError(e.message))
      .finally(() => setLoadingHospital(false));
  }, []);

  function handleHospitalChanges(field, newValue) {
    setHospitalChanges((oldHospital) => {
      const newHospital = { ...oldHospital, [field]: newValue };
      if (newHospital[field] === hospital[field] || newHospital[field] === "") {
        delete newHospital[field];
      }
      return newHospital;
    });
  }

  function resetChanges() {
    setHospitalChanges({});
    setHospitalContactsChanges([]);
    setHospitalContactsDeletes([]);
  }

  function handleSubmitChanges() {
    setHospitalChangesLoading(true);

    const changes = {
      id: hospital_id,
      ...hospitalChanges,
      new_contacts: hospitalContactsChanges,
      remove_contacts: hospitalContactsDeletes,
    };

    change_hospital(changes)
      .then((u) => {
        setHospital(u);
        resetChanges();
      })
      .catch((e) => notifyError(e.message || "Erro ao salvar alterações"))
      .finally(() => setHospitalChangesLoading(false));
  }

  function handleGenerateOneTimePassword() {
    setHospitalOneTimePasswordLoading(true);
    setHospitalOneTimePassword(null);

    create_hospital_one_time_password(hospital_id)
      .then(setHospitalOneTimePassword)
      .catch((e) => notifyError(e.message || "Erro ao gerar senha"))
      .finally(() => setHospitalOneTimePasswordLoading(false));
  }

  useEffect(() => {
    console.log(!isEmpty(hospitalContactsChanges), hospitalContactsChanges);
    console.log(hospitalContactsDeletes.length > 0 ? true : false, hospitalContactsDeletes);
    console.log(!isEmpty(hospitalChanges), hospitalChanges);
  }, [hospitalChanges, hospitalContactsDeletes, hospitalContactsChanges]);

  return (
    <React.Fragment>
      {loadingHospital ? (
        <Spinner />
      ) : (
        <div className="container">
          <span className="fs-3 my-5">Cadastro do Hospital</span>
          {isAdmin && (
            <div className="d-flex flex-column my-2">
              {hospitalOneTimePasswordLoading ? (
                <Spinner />
              ) : (
                <button className="btn btn-primary" onClick={handleGenerateOneTimePassword}>
                  Resetar / gerar senha para o hospital
                </button>
              )}
              {hospitalOneTimePassword && (
                <div className="d-flex flex-column align-items-center ms-3">
                  <span className="my-1 me-2">Senha gerada:</span>
                  <span className="my-1 fw-bold">{hospitalOneTimePassword.code}</span>
                  <span className="my-1 ms-2">Válida até:</span>
                  <span className="my-1 fw-bold">{new Date(hospitalOneTimePassword.valid_to).toLocaleString()}</span>
                </div>
              )}
            </div>
          )}

          {isAdmin && (
            <div className="d-flex flex-column my-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsEditing(!isEditing);
                  resetChanges();
                }}
              >
                {isEditing ? "Parar de editar" : "Editar hospital"}
              </button>
            </div>
          )}

          <HospitalDataComponent
            hospital={hospital}
            hospitalChanges={hospitalChanges}
            setHospitalChanges={handleHospitalChanges}
            isEditing={isAdmin && isEditing}
          />

          <ListaContatoComponent
            contacts={hospital.contacts}
            contactsChanges={hospitalContactsChanges}
            setContactsChanges={setHospitalContactsChanges}
            contactsDeletes={hospitalContactsDeletes}
            setContactsDeletes={setHospitalContactsDeletes}
          />

          {(!isEmpty(hospitalChanges) || hospitalContactsDeletes.length > 0 || !isEmpty(hospitalContactsChanges)) && (
            <div className="d-flex justify-content-end">
              {hospitalChangesLoading ? (
                <Spinner />
              ) : (
                <button className="btn btn-success" onClick={handleSubmitChanges}>
                  Salvar
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
