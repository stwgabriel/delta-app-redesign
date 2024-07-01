"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { useEffect, useState, useRef } from "react";
import { interpolateColour } from "@/utils/colorf";
import { getAge } from "@/utils/funcs";
import { absolute_contraindication_template } from "@/utils/templates";

export default function Home() {
  const router = useRouter();
  const {
    authInstituicao,
    authUsuario,
    loadedAuthInstituicao,
    loadedAuthUsuario,
  } = useAuthContext();

  useEffect(() => {
    if (loadedAuthInstituicao && authInstituicao === null) {
      router.push("/login/instituicao");
    }
    if (loadedAuthUsuario && authUsuario === null) {
      router.push("/login/usuario");
    }
  }, [loadedAuthUsuario, loadedAuthInstituicao]);

  return (
    <>
      <section className="flex-column my-4 align-items-center">
        <span className="fs-1">Contraindicações Absolutas</span>
      </section>

      <section className="flex-column mb-3">
        {absolute_contraindication_template.map((q, i) => (
          <div key={`q-${i}`} className="flex-column">
            <span>
              {i + 1}. {q.text}
            </span>
            <div className="d-flex mb-3 justify-content-around mt-3">
              {["Sim", "Não", "Não Sei"].map((op, j) => (
                <div
                  key={`qst-${i}-op-${j}`}
                  className="d-flex btn-group"
                  role="group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    id={`q-${i}-op-${j}`}
                    name={`q-${i}`}
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor={`q-${i}-op-${j}`}
                  >
                    {op}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="flex-column mb-5">
        <button className="btn btn-primary">Enviar</button>
      </section>
    </>
  );
}
