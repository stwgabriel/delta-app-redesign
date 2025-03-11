import { useClientNotificationContext } from "@/contexts/client_notification";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";

function ColLeftComponent({ children }) {
  return <div className="d-flex col align-items-center">{children}</div>;
}

function ColRightComponent({ children }) {
  return <div className="d-flex col-8 align-items-center">{children}</div>;
}

function RowComponent({ children }) {
  return <div className="row my-1">{children}</div>;
}

function ContatoComponent({ contact, handleChange, handleDelete }) {
  const fields = [
    { name: "role", text: "Cargo" },
    { name: "fullname", text: "Nome completo" },
    { name: "email", text: "E-mail" },
    { name: "phone", text: "Telefone" },
    { name: "cpf", text: "CPF" },
  ];

  return (
    <div className="container border rounded shadow my-2 py-3">
      {fields.map((field) => (
        <RowComponent key={`cf-${field.name}`}>
          <ColLeftComponent>
            <span className="align-self-center align-middle justify-content-center">{field.text}</span>
          </ColLeftComponent>
          <ColRightComponent>
            {contact.edit ? (
              <input
                className="form-control"
                value={contact[field.name] || ""}
                onChange={(x) => handleChange(field.name, x.target.value)}
              />
            ) : (
              <span>{contact[field.name]}</span>
            )}
          </ColRightComponent>
        </RowComponent>
      ))}
      <div className="d-flex justify-content-end">
        <button className="btn btn-warning" onClick={handleDelete}>
          Deletar
        </button>
      </div>
    </div>
  );
}

export function ListaContatoComponent({
  contacts = [],
  contactsChanges = [],
  setContactsChanges,
  contactsDeletes = [],
  setContactsDeletes,
}) {
  function handleAdd() {
    setContactsChanges((old) => {
      const newList = [...old, { edit: true }];
      return newList;
    });
  }

  function handleContactsChanges(i, field, value) {
    setContactsChanges((old) => {
      const newList = [...old];
      newList[i][field] = value;
      return newList;
    });
  }

  function handleContactsChangesDelete(i) {
    if (window.confirm("Tem certeza que deseja deletar este contato?")) {
      setContactsChanges((old) => {
        const newList = [...old];
        newList.splice(i, 1);
        return newList;
      });
    }
  }

  function handleDelete(i) {
    if (window.confirm("Tem certeza que deseja deletar este contato?")) {
      setContactsDeletes((old) => [...old, contacts[i].id]);
    }
  }

  return (
    <div className="d-flex flex-column">
      <button className="btn btn-primary my-2" onClick={handleAdd}>
        Adicionar contato
      </button>
      <div className="d-flex flex-column align-items-center">
        {contactsChanges.map((contact, i) => (
          <ContatoComponent
            key={`cc-${i}`}
            contact={contact}
            handleChange={(field, value) => handleContactsChanges(i, field, value)}
            handleDelete={() => handleContactsChangesDelete(i)}
          />
        ))}
        {contacts.map(
          (contact, i) =>
            !contactsDeletes.includes(contact.id) && (
              <ContatoComponent key={`c-${i}`} contact={contact} handleDelete={() => handleDelete(i)} />
            )
        )}
      </div>
    </div>
  );
}

export function HospitalDataComponent({ isEditing, hospital, hospitalChanges, setHospital, setHospitalChanges }) {
  if (hospitalChanges === undefined) hospitalChanges = {};

  function handleOnChange(field, value) {
    if (setHospitalChanges !== undefined) {
      setHospitalChanges(field, value);
    } else {
      setHospital((old) => {
        return { ...old, [field]: value };
      });
    }
  }

  const fields = [
    { name: "name", text: "Nome" },
    { name: "username", text: "Nome de usuário" },
    { name: "cnpj", text: "CNPJ" },
    { name: "cep", text: "CEP" },
    { name: "address", text: "Endereço completo" },
    {
      name: "medical_agreements",
      text: "Convenios",
      placeholder: "Cite os convênios que o hospital atende",
      isTextarea: true,
    },
    {
      name: "resources",
      text: "Recursos",
      placeholder:
        "Cite os recursos que estão disponíveis no hospital. Por exemplo quantidade de leitos de UTI e Neurocirurgiões",
      isTextarea: true,
    },
  ];

  return (
    <div className="container border rounded shadow my-2 py-3">
      {fields.map((field) => (
        <RowComponent key={`cf-${field.name}`}>
          <ColLeftComponent>
            <span className="align-self-center align-middle justify-content-center fw-bold">{field.text}</span>
          </ColLeftComponent>
          <ColRightComponent>
            {isEditing ? (
              field.isTextarea === true ? (
                <textarea
                  className="form-control"
                  placeholder={field?.placeholder || ""}
                  value={hospitalChanges[field.name] || hospital[field.name] || ""}
                  onChange={(x) => handleOnChange(field.name, x.target.value)}
                />
              ) : (
                <input
                  className="form-control"
                  placeholder={field?.placeholder || ""}
                  value={hospitalChanges[field.name] || hospital[field.name] || ""}
                  onChange={(x) => handleOnChange(field.name, x.target.value)}
                />
              )
            ) : (
              <span>{hospital[field.name] || ""}</span>
            )}
          </ColRightComponent>
        </RowComponent>
      ))}
    </div>
  );
}
