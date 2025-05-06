"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/variables";
import { useClientNotificationContext } from "@/contexts/client_notification";
import Link from "next/link";

export default function LoginHospitalPage() {
  const { notifyError } = useClientNotificationContext();
  const router = useRouter();

  const { login_hospital, isLoggedHospital, isTokenLoaded } = useAPIContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function do_login() {
    setLoading(true);
    login_hospital(username, password)
      .catch((e) => notifyError(e.message || "Erro desconhecido"))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedHospital) router.push(ROUTES.HOSPITAL.LOGIN_DOCTOR);
  }, [isLoggedHospital]);

  return (
    <section className="d-flex flex-column align-items-center my-auto">
      <h2 className="d-flex fs-4">Login do Hospital</h2>
      <div className="d-flex flex-column my-5 gap-1">
        <div className="d-flex input-group">
          <span className="d-flex input-group-text w-26">Username</span>
          <input
            type="text"
            className="form-control"
            placeholder="Instituição"
            value={username}
            onChange={(x) => setUsername(x.target.value)}
          />
        </div>
        <div className="d-flex input-group">
          <span className="d-flex input-group-text w-26" >Senha</span>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(x) => setPassword(x.target.value)}
          />
        </div>
        <Link href={ROUTES.LOGIN_HOSPITAL_ONE_TIME_PASSWORD} className="text-decoration-none">
          Entrar com a senha única
        </Link>
        {loading ? (
          <Spinner />
        ) : (
          <button type="button" className="btn btn-dark mt-3" onClick={do_login}>
            Entrar com a Instituição
          </button>
        )}
      </div>
    </section>
  );
}
