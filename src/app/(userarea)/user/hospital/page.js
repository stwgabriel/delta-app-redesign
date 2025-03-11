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
  const { get_hospital, change_hospital, get_hospital_by_id, isAdmin } = useAPIContext();
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [hospital, setHospital] = useState({});
  const [hospitalChanges, setHospitalChanges] = useState({});
  const [hospitalContactsChanges, setHospitalContactsChanges] = useState([]);
  const [hospitalContactsDeletes, setHospitalContactsDeletes] = useState([]);

  const [hospitalChangesLoading, setHospitalChangesLoading] = useState(false);

  const searchParams = useSearchParams();
  const hospital_id = searchParams.get("hospital_id");

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
        setHospitalChanges({});
        setHospitalContactsChanges([]);
        setHospitalContactsDeletes([]);
      })
      .catch((e) => notifyError(e.message || "Erro ao salvar alterações"))
      .finally(() => setHospitalChangesLoading(false));
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
          <HospitalDataComponent
            hospital={hospital}
            hospitalChanges={hospitalChanges}
            setHospitalChanges={handleHospitalChanges}
            isEditing={isAdmin}
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
