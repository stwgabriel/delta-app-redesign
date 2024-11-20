"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { useEffect, useState, useRef } from "react";
import { interpolateColour } from "@/utils/colorf";
import { nih_template } from "@/utils/templates";
import { ROUTES } from "@/utils/hosts";

export default function ProntuarioPage2Page() {
  const router = useRouter();
  const {
    authInstituicao,
    authUsuario,
    loadedAuthUsuario,
    loadedAuthInstituicao,
  } = useAuthContext();
  const [NIHResponses, _setNIHResponses] = useState({});

  useEffect(() => {
    if (loadedAuthInstituicao && authInstituicao === null) {
      router.push(ROUTES.LOGIN_HOSPITAL);
    }
    if (loadedAuthUsuario && authUsuario === null) {
      router.push(ROUTES.LOGIN_DOCTOR);
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
        <span className="fs-1">Prontuário: Beira-leito</span>
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

          {nih_template.map((section, i) => (
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

                  {question.text_input === true && (
                    <div className="form-floating" id={`sc-${i}-qst-${j}-txt`}>
                      <input
                        type="text"
                        className="form-control"
                        id={`sc-${i}-qst-${j}-txt`}
                        placeholder="Explique"
                      />
                      <label htmlFor={`sc-${i}-qst-${j}-txt`}>Explique</label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="flex-column mb-4">
        <span className="fw-bold fs-4 mb-2">Sinais vitais</span>

        <div className="input-group mb-2 mt-2">
          <span className="input-group-text">Peso aproximado (kg)</span>
          <input type="number" className="form-control" />
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">Pressão arterial</span>
          <input
            type="number"
            className="form-control"
            placeholder="Sistólica"
          />
          <input
            type="number"
            className="form-control"
            placeholder="Diastólica"
          />
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">Dextro</span>
          <input type="text" className="form-control" />
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">Saturação O2</span>
          <input type="number" className="form-control" />
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">Frequência cardíaca</span>
          <input type="number" className="form-control" />
        </div>
      </section>

      <section className="flex-column mb-5">
        <button
          className="btn btn-primary"
          onClick={() => router.push(ROUTES.PRONTUARIO_PAG3)}
        >
          Enviar
        </button>
      </section>

      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        autohide="false"
      >
        <div className="toast-body">
          Hello, world! This is a toast message.
          <div className="mt-2 pt-2 border-top">
            <button type="button" className="btn btn-primary btn-sm">
              Take action
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="toast"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
