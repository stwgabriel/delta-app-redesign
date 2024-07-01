"use client";
import Image from "next/image";

import { useAuthContext } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { loginInstituicao, logoutUsuario, logoutInstituicao } =
    useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    logoutUsuario();
    logoutInstituicao();
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
        <h2 className="fs-1 fw-bold my-5">Delta Stroke Inc</h2>

        <h2 className="fs-4 my-5">Login da Instituição</h2>
        <div className="flex-column my-5">
          <div className="input-group">
            <span className="input-group-text">Username</span>
            <input
              type="text"
              className="form-control"
              placeholder="Instituição"
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
          <button
            type="button"
            className="btn btn-dark mt-3"
            onClick={() => {
              loginInstituicao(username, password);
              router.push("/");
            }}
          >
            Entrar com a Instituição
          </button>
        </div>
      </section>
    </>
  );
}
