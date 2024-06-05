"use client";
import { usePatientContext } from "@/contexts/patient";
import { isBlank, getAge } from "@/utils/funcs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MainInput from "@/components/assessment/input_main";
import Link from "next/link";
// const template = {
//   name: "traumatismo_cranioencefalico_grave",
//   title:
//     "O paciente sofreu traumatismo cranioencefálico grave (ver critérios de gravidade) nos últimos 3 meses?",
//   type: "input",
//   info: "Unknown if it is a wake-up stroke or unwitnessed and patient is either aphasic or altered",
//   input_type: "InputOptionCol",
//   options: [
//     {
//       value: "Sim",
//     },
//     {
//       value: "Não",
//     },
//     {
//       value: "Não sei",
//       unknown: true,
//     },
//   ],
//   next: [
//     {
//       name: "sangramento_intracraniano",
//       conditions: [],
//     },
//   ],
// };

const template = {
  name: "pressao",
  title: "Pressão?",
  type: "input",
  info: "Mede a pressao ai",
  input_type: "InputOpen",
  inputs: [
    {
      name: "sistolica",
      label: "Sistólica",
      mask: "^\\d+([.,]\\d+)?$",
    },
    {
      name: "diastolica",
      label: "Diastólica",
      mask: "^\\d+([.,]\\d+)?$",
    },
  ],
  next: [
    {
      name: "sangramento_intracraniano",
      conditions: [],
    },
  ],
};

const template1 = {
  name: "pressao",
  title: "Morreu?",
  type: "input",
  info: "Olha o monitor aí",
  input_type: "InputOptionCol",
  options: [
    {
      value: "Sim",
    },
    {
      value: "Não",
    },
    {
      value: "Não Sei",
    },
  ],
  next: [],
};
export default function NewCasePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [patient, setPatient] = useState(null);
  const [chart, setChart] = useState(null);
  const { getPatient, getChart, dbData } = usePatientContext();
  useEffect(() => {
    const chartId = searchParams.get("id");
    setChart(getChart(chartId));
  }, [dbData]);

  useEffect(() => {
    if (chart == null) return;
    const patientId = chart.patient_id;
    if (isBlank(patientId)) return;
    setPatient(getPatient(patientId));
  }, [chart]);

  return (
    <>
      {!isBlank(patient) && (
        <section className="flex-column my-4">
          <span className="fs-5">
            <span className="fw-bold me-1">ID Paciente: </span>{" "}
            <Link
              className="link-underline-primary"
              href={`/patient?id=${patient.id}`}
            >
              {patient.id}
            </Link>
          </span>
          <span className="fs-5">
            <span className="fw-bold me-1">Nome: </span> {patient.name}
          </span>
          <span className="fs-5">
            <span className="fw-bold me-1">Idade:</span>{" "}
            {isBlank(patient.birth_date)
              ? ""
              : `${getAge(patient.birth_date)} anos`}
          </span>
        </section>
      )}
      <section className="align-items-center flex-column my-4">
        <MainInput item={template} />
        <MainInput item={template1} />
      </section>
    </>
  );
}
