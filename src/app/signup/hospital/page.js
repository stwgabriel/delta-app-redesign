"use client";

import { useClientNotificationContext } from "@/contexts/client_notification";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/variables";

export default function SignupConsultorPage() {
  const { notifyError } = useClientNotificationContext();
  const router = useRouter();
  const { signup_hospital, isLoggedConsultor, isTokenLoaded } = useAPIContext();

  // ---------------- form states ----------------

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ---------------------------------------------

  const [loading, setLoading] = useState(false);

  function do_signup() {
    setLoading(true);

    if (password != confirmPassword) {
      notifyError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    const hospitalData = {
      name,
      username,
      password,
    };

    signup_hospital(hospitalData)
      .then(() => {
        router.push(ROUTES.HOME);
      })
      .catch((e) => notifyError(e.message))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedConsultor) router.push(ROUTES.CONSULTOR.LANDING_PAGE_CONSULTOR);
  }, [isLoggedConsultor]);

  return (
    <section className="d-flex flex-column align-items-center flex-fill justify-content-center">
      <h2 className="d-flex fs-4 my-3">Cadastro do Hospital</h2>

      <form className="d-flex flex-column mb-5">
        <div className="d-flex form-group input-group">
          <div className="d-flex input-group-prepend">
            <span className="d-flex input-group-text">
              <span className="d-flex material-icons fs-2">local_hospital</span>
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Nome do hospital"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="d-flex form-group input-group">
          <div className="d-flex input-group-prepend">
            <span className="d-flex input-group-text">
              <span className="d-flex material-icons fs-2">home</span>
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="d-flex form-group input-group">
          <div className="d-flex input-group-prepend">
            <span className="d-flex input-group-text">
              <span className="d-flex material-icons fs-2">lock</span>
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Criar senha"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex form-group input-group">
          <div className="d-flex input-group-prepend">
            <span className="d-flex input-group-text">
              <span className="d-flex material-icons fs-2">lock</span>
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Repetir a senha"
            type="password"
            autoComplete="on"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <button type="button" className="btn btn-dark mt-3" onClick={do_signup}>
            Criar hospital
          </button>
        )}
      </form>
    </section>
  );
}
