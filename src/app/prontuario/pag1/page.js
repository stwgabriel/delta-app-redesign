"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { useEffect, useState, useRef } from "react";
import { interpolateColour } from "@/utils/colorf";
import { getAge } from "@/utils/funcs";
import {
  nih_template,
  medicines_template,
  comorbidities_template,
} from "@/utils/templates";

export default function Home() {
  const router = useRouter();
  const {
    authInstituicao,
    authUsuario,
    loadedAuthUsuario,
    loadedAuthInstituicao,
  } = useAuthContext();
  const [birthDate, setBirthDate] = useState("");
  const [NIHResponses, _setNIHResponses] = useState({});

  useEffect(() => {
    if (loadedAuthInstituicao && authInstituicao === null) {
      router.push("/login/instituicao");
    }
    if (loadedAuthUsuario && authUsuario === null) {
      router.push("/login/usuario");
    }
  }, [loadedAuthUsuario, loadedAuthInstituicao]);

  function setNIHResponses(section, question) {
    const newNIHResponses = JSON.parse(JSON.stringify(NIHResponses));
    newNIHResponses[section.text] = question;
    _setNIHResponses(newNIHResponses);
  }

  function getNIHCount() {
    let cnt = 0;
    for (let s in NIHResponses) {
      let r = NIHResponses[s];
      cnt += r.pts;
    }
    return cnt;
  }

  function getMaxNIHCount() {
    return nih_template.reduce(
      (acc, section) => acc + Math.max(...section.questions.map((q) => q.pts)),
      0
    );
  }

  return (
    <>
      <section className="flex-column my-4 align-items-center">
        <span className="fs-1">Prontuário</span>
      </section>
      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">Informações básicas</span>
        <div className="input-group mb-3">
          <span className="input-group-text">Nome</span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Data de nascimento</span>
          <input
            type="date"
            className="form-control"
            value={birthDate}
            onChange={(x) => setBirthDate(x.target.value)}
          />
          <span className="input-group-text">{getAge(birthDate)} anos</span>
        </div>
      </section>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">NIH</span>
        <div className="flex-column">
          <div className="input-group mb-2">
            <span className="input-group-text ">NIH</span>
            <span
              className="input-group-text "
              style={{
                backgroundColor: interpolateColour(
                  "#198754",
                  "#dc3545",
                  getNIHCount() / getMaxNIHCount()
                ),
              }}
            >
              {getNIHCount()} pontos
            </span>
          </div>

          {nih_template.map(
            (section, i) =>
              i <= Object.keys(NIHResponses).length && (
                <div key={`sc-${i}`} className="flex-column mb-3">
                  <span className="fw-bold">{section.text}</span>
                  {section.questions.map((question, j) => (
                    <div key={`qst-${j}`} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`sc-${i}-qst-${j}`}
                        name={`sc-${i}`}
                        onChange={(x) => setNIHResponses(section, question)}
                      />
                      <label
                        className="form-check-label mt-1"
                        htmlFor={`sc-${i}-qst-${j}`}
                      >
                        {question.text} ({question.pts} pontos)
                      </label>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      </section>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4  mb-2">Medicamentos</span>
        <div className="list-group">
          {medicines_template.map((m, i) => (
            <label key={`m-${i}`} className="list-group-item">
              <input
                className="form-check-input me-1 mt-0"
                type="checkbox"
                value=""
              />
              {m.text}
            </label>
          ))}

          <label className="list-group-item">
            Outros
            <input type="text" className="form-control" />
          </label>
        </div>
      </section>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">Comorbidades</span>
        <div className="list-group">
          {comorbidities_template.map((c, i) => (
            <label key={`c-${i}`} className="list-group-item">
              <input
                className="form-check-input me-1 mt-0"
                type="checkbox"
                value=""
              />
              {c.text}
            </label>
          ))}
          <label className="list-group-item">
            Outros
            <input type="text" className="form-control" />
          </label>
        </div>
      </section>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">Outras informações</span>
        <div className="input-group mb-3">
          <span className="input-group-text">Ultima vez visto bem</span>
          <input type="date" className="form-control" />
          <input type="time" className="form-control" />
        </div>
        <div className="input-group">
          <span className="input-group-text">Pressão</span>
          <input type="number" className="form-control" />
          <input type="number" className="form-control" />
        </div>
      </section>

      <section className="flex-column mb-5">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/prontuario/pag2")}
        >
          Enviar
        </button>
      </section>
    </>
  );
}
