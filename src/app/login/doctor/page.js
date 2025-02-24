"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/variables";
import { useClientNotificationContext } from "@/contexts/client_notification";
import { formatCPF } from "@/utils/funcs";
import { STATES } from "@/utils/generic";

export default function LoginDoctorPage() {
  const { notifyError } = useClientNotificationContext();
  const router = useRouter();
  const { login_doctor, isLoggedHospital, isLoggedDoctor, isTokenLoaded } = useAPIContext();

  const [CPF, setCPF] = useState("");
  const [CRMState, setCRMState] = useState("");
  const [CRMNumber, setCRMNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isTokenLoaded && !isLoggedHospital) {
      router.push(ROUTES.LOGIN_HOSPITAL);
    }
  }, [isLoggedHospital]);

  function do_login() {
    setLoading(true);
    login_doctor(CPF, CRMNumber, CRMState)
      .catch((e) => notifyError(e.message || "Erro desconhecido"))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedDoctor) router.push(ROUTES.DOCTOR.LANDING_PAGE_DOCTOR);
  }, [isLoggedDoctor]);

  return (
    <section className="d-flex flex-column align-items-center my-auto">
      <h1 className="d-flex fs-4">Login do médico</h1>
      <div className="d-flex flex-column my-5">
        <div className="d-flex input-group">
          <span className="d-flex input-group-text">CPF</span>
          <input
            type="text"
            className="form-control"
            placeholder="CPF do Médico"
            value={CPF}
            onChange={(x) => setCPF(formatCPF(x.target.value))}
          />
        </div>
        <div className="d-flex input-group">
          <span className="d-flex input-group-text">CRM</span>
          {/* <input
            type="text"
            className="form-control"
            placeholder="UF"
            value={CRMUF}
            onChange={(x) => setCRMUF(x.target.value)}
          /> */}
          <select
            className="form-select"
            defaultValue="Estado CRM"
            style={{ maxWidth: "150px" }}
            onChange={(e) => setCRMState(e.target.value)}
          >
            <option disabled>Estado CRM</option>
            {Object.entries(STATES).map(([state_letter, state_name]) => (
              <option key={state_letter} value={state_letter}>
                {state_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="123456"
            value={CRMNumber}
            onChange={(x) => setCRMNumber(x.target.value)}
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <button type="button" className="btn btn-dark mt-3" onClick={do_login}>
            Entrar
          </button>
        )}
      </div>
    </section>
  );
}
