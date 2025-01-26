"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/variables";
import { STATES } from "@/utils/generic";

export default function SignupConsultorPage() {
  const router = useRouter();
  const { signup_consultor, isLoggedConsultor, isTokenLoaded } = useAPIContext();

  // ---------------- form states ----------------

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+55");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [crmState, setCrmState] = useState("");
  const [crmNumber, setCrmNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ---------------------------------------------

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function do_signup() {
    setLoading(true);
    setErrorMessage(null);

    if (password != confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    const userData = {
      name,
      surname,
      email,
      cpf,
      phone: `${phoneCountry}${phoneNumber}`,
      crm_state: crmState,
      crm_number: crmNumber,
      password,
    };

    signup_consultor(userData)
      .catch((e) => setErrorMessage(e.message))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedConsultor) router.push(ROUTES.LANDING_PAGE_CONSULTOR);
  }, [isLoggedConsultor]);

  return (
    <>
      <section className="flex-column align-items-center mt-5">
        <Image src={"/logo.png"} width={200} height={200} priority={100} alt="Logo" />
        <h2 className="fs-1 fw-bold my-3">Delta Stroke Inc</h2>
        <h2 className="fs-4 my-3">Cadastro do Consultor</h2>

        <form className="flex-column mb-5">
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons fs-2">person</span>
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Sobrenome"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons fs-2">mail</span>
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons fs-2">badge</span>
              </span>
            </div>
            <input
              className="form-control"
              placeholder="CPF"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons fs-2">smartphone</span>
              </span>
            </div>
            <select
              className="form-select"
              style={{ maxWidth: "150px" }}
              onChange={(e) => setPhoneCountry(e.target.value)}
            >
              <option>+55</option>
            </select>
            <input
              className="form-control"
              placeholder="Telefone celular"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons fs-2">medication</span>
              </span>
            </div>
            <select
              className="form-select"
              defaultValue="Estado CRM"
              style={{ maxWidth: "150px" }}
              onChange={(e) => setCrmState(e.target.value)}
            >
              <option disabled>Estado CRM</option>
              {Object.entries(STATES).map(([state_letter, state_name]) => (
                <option key={state_letter} value={state_letter}>
                  {state_name}
                </option>
              ))}
            </select>
            <input
              className="form-control"
              placeholder="Número CRM"
              type="text"
              value={crmNumber}
              onChange={(e) => setCrmNumber(e.target.value)}
            />
          </div>

          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons fs-2">lock</span>
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
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="material-icons fs-2">lock</span>
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

          <p className="text-danger my-2">{errorMessage}</p>
          {loading ? (
            <Spinner />
          ) : (
            <button type="button" className="btn btn-dark mt-3" onClick={do_signup}>
              Criar consultor
            </button>
          )}
        </form>
      </section>
    </>
  );
}
