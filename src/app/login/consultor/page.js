"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/hosts";

export default function LoginConsultorPage() {
  const router = useRouter();
  const { login_consultor, isLoggedConsultor, isTokenLoaded } = useAPIContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function do_login() {
    setLoading(true);
    setErrorMessage(null);
    login_consultor(username, password)
      .then(() => setErrorMessage(null))
      .catch((e) => setErrorMessage(e.message || "Erro desconhecido"))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedConsultor)
      router.push(ROUTES.LANDING_PAGE_CONSULTOR);
  }, [isLoggedConsultor]);

  return (
    <>
      <section className="flex-column align-items-center mt-5">
        <Image
          src={"/logo.png"}
          width={200}
          height={200}
          priority={100}
          alt="Logo"
        />
        <h2 className="fs-1 fw-bold my-5">Delta Stroke Inc</h2>

        <h2 className="fs-4 my-5">Login do Consultor</h2>
        <div className="flex-column my-5">
          <div className="input-group">
            <span className="input-group-text">Username</span>
            <input
              type="text"
              className="form-control"
              placeholder="deltastroke"
              value={username}
              onChange={(x) => setUsername(x.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text">Senha</span>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(x) => setPassword(x.target.value)}
            />
          </div>
          <p className="text-danger">{errorMessage}</p>
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="button"
              className="btn btn-dark mt-3"
              onClick={do_login}
            >
              Entrar
            </button>
          )}
        </div>
      </section>
    </>
  );
}
