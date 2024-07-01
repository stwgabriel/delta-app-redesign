"use client";
import { usePatientContext } from "@/contexts/patient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbLetterX } from "react-icons/tb";

import Image from "next/image";
import { useAuthContext } from "@/contexts/auth";
export default function Home() {
  const router = useRouter();
  const { authInstituicao, loginUsuario, logoutUsuario } = useAuthContext();
  const [CPF, setCPF] = useState("");
  const [CRMUF, setCRMUF] = useState("");
  const [CRMNumber, setCRMNumber] = useState("");

  useEffect(() => {
    if (authInstituicao === null) {
      router.push("/login/instituicao");
    }
  }, []);

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
        <h1 className="fs-3 my-2 text-decoration-underline">
          {authInstituicao?.username}
        </h1>
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
          <button
            type="button"
            className="btn btn-dark mt-3"
            onClick={() => {
              loginUsuario(CPF, CRMUF, CRMNumber);
              router.push("/");
            }}
          >
            Entrar
          </button>
        </div>
      </section>
    </>
  );
}
