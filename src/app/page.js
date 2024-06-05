"use client";
import { usePatientContext } from "@/contexts/patient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbLetterX } from "react-icons/tb";

export default function Home() {
  const router = useRouter();
  const { myCharts, getPatient, now, searchPatientCPF, createPatient } =
    usePatientContext();

  const [cpfInput, setCpfInput] = useState("");
  const [currentPatient, setCurrentPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientFound, setPatientFound] = useState(null);

  function _setCpfInput(val) {
    const nval = val.replace(/\D/, "");
    setCpfInput(nval);

    if (nval.length === 11) {
      setLoading(true);
      const patient = searchPatientCPF(nval);
      if (patient !== null) {
        setCurrentPatient(patient);
        setPatientFound(true);
      } else {
        setPatientFound(false);
      }
      setLoading(false);
    } else {
      setPatientFound(null);
      setCurrentPatient(null);
    }
  }

  useEffect(() => {
    console.log(myCharts);
    console.log(patientFound, cpfInput.length);
  }, []);

  function newPatient(cpf) {
    const patient = createPatient(cpf);
    router.push(`/patient?id=${patient.id}`);
  }

  function gotoPatient() {
    if (currentPatient) {
      router.push(`/patient?id=${currentPatient.id}`);
    } else {
      console.warn("No patient", currentPatient);
    }
  }
  return (
    <>
      <section className="flex-column my-4">
        <div className="flex-column">
          <label className="form-label">CPF do paciente</label>
          <input
            disabled={loading}
            className="form-control"
            value={cpfInput}
            onChange={(x) => _setCpfInput(x.target.value)}
          />
        </div>
        <div className="flex-column my-4">
          {loading && <Spinner className="my-3" />}

          {patientFound === null && cpfInput.length === 0 && (
            <button className="btn btn-secondary" onClick={() => newPatient()}>
              Criar paciente não identificado
            </button>
          )}

          {patientFound === false && (
            <>
              <span className="text-danger my-1">Paciente não encontrado!</span>
              <button
                className="btn btn-warning"
                onClick={() => newPatient(cpfInput)}
              >
                Criar Paciente
              </button>
            </>
          )}

          {patientFound === true && (
            <>
              <span className="text-success my-1">Paciente encontrado!</span>
              <button className="btn btn-success" onClick={gotoPatient}>
                Ir para paciente
              </button>
            </>
          )}
        </div>
      </section>
      <section className="flex-column my-4 align-items-center">
        <table className="table table-responsive caption-top my-3">
          <caption>Meus casos ativos</caption>
          <thead className="table-dark">
            <tr>
              <th>ID do caso</th>
              <th>Nome do paciente</th>
              <th>Tempo desde início do atendimento</th>
              <th>Horário do início do atendimento</th>
            </tr>
          </thead>
          <tbody>
            {myCharts !== null &&
              myCharts.map((c, i) => (
                <tr key={`c-${i}`}>
                  <td>
                    <Link
                      href={`/chart?id=${c.id}`}
                      className="link-underline-primary"
                    >
                      {c.id}
                    </Link>
                  </td>
                  <td className="d-flex justify-content-center">
                    <Link href={`/patient?id=${c.patient_id}`}>
                      {getPatient(c.patient_id).name || (
                        <>
                          <TbLetterX className="text-danger" />
                          Não informado
                        </>
                      )}
                    </Link>
                  </td>
                  <td className="text-center">
                    Há {((now - new Date(c.start_time)) / 1000 / 60).toFixed(1)}{" "}
                    minutos
                  </td>
                  <td className="text-center">{`${new Date(
                    c.start_time
                  ).toLocaleDateString()} ${new Date(
                    c.start_time
                  ).toLocaleTimeString()}`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
