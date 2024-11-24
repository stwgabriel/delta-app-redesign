"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "@/components/spinner";
import { ROUTES } from "@/utils/variables";

export default function LoginDoctorPage() {
  const router = useRouter();
  const { login_doctor, isLoggedHospital, isLoggedDoctor, isTokenLoaded } =
    useAPIContext();

  const [CPF, setCPF] = useState("");
  const [CRMUF, setCRMUF] = useState("");
  const [CRMNumber, setCRMNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isTokenLoaded && !isLoggedHospital) {
      router.push(ROUTES.LOGIN_HOSPITAL);
    }
  }, [isLoggedHospital]);

  function do_login() {
    setLoading(true);
    setErrorMessage(null);
    login_doctor(CPF, CRMNumber, CRMUF)
      .then(() => setErrorMessage(null))
      .catch((e) => setErrorMessage(e.message || "Erro desconhecido"))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isTokenLoaded && isLoggedDoctor)
      router.push(ROUTES.LANDING_PAGE_DOCTOR);
  }, [isLoggedDoctor]);

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
        <h1 className="fs-1 fw-bold my-5">Delta Stroke Inc</h1>
        <h1 className="fs-4 my-4">Login do usuário</h1>
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
