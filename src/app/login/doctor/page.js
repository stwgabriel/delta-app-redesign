"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/variables";
import { useClientNotificationContext } from "@/contexts/client_notification";

export default function LoginDoctorPage() {
  const { notifyError } = useClientNotificationContext();
  const router = useRouter();
  const { login_doctor, isLoggedHospital, isLoggedDoctor, isTokenLoaded } = useAPIContext();

  const [CPF, setCPF] = useState("");
  const [CRMUF, setCRMUF] = useState("");
  const [CRMNumber, setCRMNumber] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isTokenLoaded && !isLoggedHospital) {
      router.push(ROUTES.LOGIN_HOSPITAL);
    }
  }, [isLoggedHospital]);

  function do_login() {
    setLoading(true);
    login_doctor(CPF, CRMNumber, CRMUF)
      .catch((e) => notifyError(e.message || "Erro desconhecido"))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedDoctor) router.push(ROUTES.LANDING_PAGE_DOCTOR);
  }, [isLoggedDoctor]);

  return (
    <section className="flex-column align-items-center my-auto">
      <h1 className="fs-4">Login do usuário</h1>
      <div className="flex-column my-5">
        <div className="input-group">
          <span className="input-group-text">CPF</span>
          <input
            type="text"
            className="form-control"
            placeholder="Médico"
            value={CPF}
            onChange={(x) => setCPF(x.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">CRM</span>
          <input
            type="text"
            className="form-control"
            placeholder="UF"
            value={CRMUF}
            onChange={(x) => setCRMUF(x.target.value)}
          />
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
