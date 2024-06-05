"use client";
import Spinner from "@/components/spinner";
import { usePatientContext } from "@/contexts/patient";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbLetterX } from "react-icons/tb";
import { isBlank, getAge } from "@/utils/funcs";
import Link from "next/link";

export default function StartCasePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getPatient, createChart, updatePatient, dbData, getPatientCharts } =
    usePatientContext();

  const [newData, setNewData] = useState({});

  function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  function saveNewData() {
    updatePatient(patient.id, newData);
    setNewData({});
  }

  function modifyData(field, newVal) {
    const newNewData = { ...newData };
    console.log(newNewData, patient, field, newVal);
    if (
      patient[field] === newVal ||
      (isBlank(patient[field]) && isBlank(newVal))
    ) {
      delete newNewData[field];
    } else if (!isBlank(patient[field]) && isBlank(newVal)) {
      newNewData[field] = null;
    } else {
      newNewData[field] = newVal;
    }
    setNewData(newNewData);
  }

  function getCurrentVal(param) {
    let val = undefined;
    if (newData[param] === undefined) {
      val = patient[param];
    } else {
      val = newData[param];
    }

    if (val === undefined || val === null) {
      return "";
    }
    return val;
  }

  useEffect(() => {
    setLoading(true);
    const patientId = searchParams.get("id");
    setPatient(getPatient(patientId));
    setLoading(false);
    console.log(patientId);
  }, [dbData]);

  return (
    <>
      <section className="flex-column my-4">
        {loading && <Spinner />}
        {patient !== null && (
          <>
            <label className="form-label">ID do paciente</label>
            <input
              disabled
              className="text-secondary form-control"
              value={patient.id}
            />

            <label className="form-label mt-3">CPF do paciente</label>
            <input
              className="form-control"
              value={getCurrentVal("cpf")}
              onChange={(x) => modifyData("cpf", x.target.value)}
            />

            <label className="form-label mt-3">Nome do paciente</label>
            <input
              className="form-control"
              value={getCurrentVal("name")}
              onChange={(x) => modifyData("name", x.target.value)}
            />

            <label className="form-label mt-3">Data de nascimento</label>
            <input
              className="form-control"
              value={getCurrentVal("birth_date")}
              type="date"
              onChange={(x) => modifyData("birth_date", x.target.value)}
            />
            <span className="mt-1">
              <span className="fw-bold">Idade:</span>
              {getAge(getCurrentVal("birth_date"))}
              {" anos"}
            </span>
            <div className="mt-5 justify-content-around flex-column text-center">
              {isEmpty(newData) && (
                <button
                  className="d-flex btn btn-primary justify-content-center"
                  onClick={() => {
                    const chart = createChart(patient.id);
                    router.push(`/chart?id=${chart.id}`);
                  }}
                >
                  Novo caso
                </button>
              )}
              {!isEmpty(newData) && (
                <>
                  <table className="table table-striped table-dark my-4 caption-top">
                    <caption className="fs-2 mb-1">
                      Alterações cadastrais
                    </caption>
                    <thead>
                      <tr>
                        <th>Antes</th>
                        <th>Depois</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(newData).map((key, ind) => (
                        <tr key={`changes-${ind}`}>
                          <td>
                            {isBlank(patient[key]) ? (
                              <span className="text-danger justify-content-center">
                                <TbLetterX className="text-danger" />
                                Não preenchido
                              </span>
                            ) : (
                              patient[key]
                            )}
                          </td>
                          <td>
                            {isBlank(newData[key]) ? (
                              <span className="text-danger justify-content-center">
                                <TbLetterX className="text-danger" />
                                Removido
                              </span>
                            ) : (
                              newData[key]
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button
                    className="d-flex btn btn-warning justify-content-center"
                    onClick={saveNewData}
                  >
                    Salvar
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </section>
      <section className="flex-column my-4">
        <table className="table table-striped caption-top">
          <caption>Histórico de casos</caption>
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Horário de início do atendimento</th>
            </tr>
          </thead>
          <tbody>
            {patient !== null &&
              getPatientCharts(patient.id)
                .sort((a, b) => (a.start_time < b.start_time ? 1 : -1))
                .map((itm, i) => (
                  <tr key={`tr-${i}`}>
                    <td>
                      <Link href={`/chart?id=${itm.id}`}>{itm.id}</Link>
                    </td>
                    <td className="text-center">
                      {`${new Date(
                        itm.start_time
                      ).toLocaleDateString()} ${new Date(
                        itm.start_time
                      ).toLocaleTimeString()}`}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
