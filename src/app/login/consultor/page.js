"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/variables";
import Link from "next/link";
import { useClientNotificationContext } from "@/contexts/client_notification";

export default function LoginConsultorPage() {
  const { notifyError } = useClientNotificationContext();
  const router = useRouter();
  const { login_consultor, isLoggedConsultor, isTokenLoaded } = useAPIContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function do_login() {
    setLoading(true);
    login_consultor(email, password)
      .catch((e) => notifyError(e.message || "Erro desconhecido"))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedConsultor) router.push(ROUTES.LANDING_PAGE_CONSULTOR);
  }, [isLoggedConsultor]);

  return (
    <section className="flex-column align-items-center my-auto">
      <h2 className="fs-4">Login do Consultor</h2>
      <div className="flex-column my-5">
        <div className="input-group">
          <span className="input-group-text">Email</span>
          <input
            type="text"
            className="form-control"
            placeholder="deltastroke"
            value={email}
            onChange={(x) => setEmail(x.target.value)}
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

        <div className="mt-2 align-self-end">
          <Link href={ROUTES.SIGNUP_CONSULTOR} className="text-decoration-none">
            Cadastre-se
          </Link>
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
