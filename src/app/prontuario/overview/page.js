"use client";
import { useSearchParams } from "next/navigation";
import styles from "./page.css";
import { useState, useEffect, createRef, useRef } from "react";
import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { useRouter } from "next/navigation";
import { calculateAge } from "@/utils/funcs";
import ChatMessage from "@/components/chat/chat_message";
import { ROUTES } from "@/utils/variables";

export default function ProntuarioPage() {
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const [chart, setChart] = useState(null);
  const [chartChat, setChartChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const chatMessagesRef = useRef(null);

  const {
    isTokenLoaded,
    isLoggedDoctor,
    isLoggedConsultor,
    get_chart,
    get_chart_chat,
    get_my_user_id,
    post_chart_chat_message,
  } = useAPIContext();

  const router = useRouter();

  useEffect(() => {
    if (isTokenLoaded && !isLoggedDoctor && !isLoggedConsultor) {
      router.push(ROUTES.HOME);
      return;
    }
    if (isTokenLoaded) onLoaded();
  }, [isTokenLoaded, isLoggedDoctor, isLoggedConsultor]);

  function onLoaded() {
    get_chart(chart_id).then(setChart).catch(console.error);
    reloadMessages();
  }

  function reloadMessages() {
    get_chart_chat(chart_id)
      .then((messages) => {
        setChartChat(messages);
      })
      .catch(console.error);
  }

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [chartChat]);

  function sendMessage() {
    let inputMsg = inputMessage.trim();
    if (inputMsg !== "") {
      post_chart_chat_message(chart_id, inputMessage)
        .then((r) => {
          setInputMessage("");
          reloadMessages();
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    if (isTokenLoaded) {
      const interval = setInterval(() => {
        get_chart_chat(chart_id).then(setChartChat).catch(console.error);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isTokenLoaded]);

  return (
    <div className="container pt-5 justify-content-center flex-column">
      {chart === null ? (
        <Spinner />
      ) : (
        <section className="flex list-group">
          <div className="list-group-item">
            <div className="input-group">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control no-border"
                  id="floatingInput"
                  value={chart.name?.value || ""}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control no-border"
                  id="floatingInput"
                  value={chart.cpf?.value || ""}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">CPF</label>
              </div>
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control no-border"
                  id="floatingInput"
                  value={chart.birth_date?.value || ""}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">Data de nascimento</label>
              </div>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control no-border"
                  id="floatingInput"
                  value={
                    chart.birth_date === null
                      ? chart.age?.value || ""
                      : calculateAge(chart.birth_date.value)
                  }
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">Idade</label>
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="input-group">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control no-border"
                  id="floatingInput"
                  value={chart.known_event_time?.value || ""}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">
                  Tempo de evento conhecido?
                </label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control no-border"
                  id="floatingInput"
                  value={chart.ictus?.value || ""}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">ICTUS</label>
              </div>
            </div>
          </div>

          <div className="list-group-item">
            <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.history_collected_with?.value || ""}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">História coletada com</label>
            </div>

            <div className="form-floating">
              <textarea
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.history?.value || ""}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">História</label>
            </div>
          </div>

          <div className="list-group-item">
            <div className="input-group">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control no-border"
                  id="floatingInput"
                  value={chart.rankin_description?.value || ""}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">Rankin</label>
              </div>

              <div className="form-floating justify-content-center align-items-center">
                <span className="fs-1 p-2">{chart.rankin_score?.value}</span>
              </div>
            </div>
          </div>

          <div className="list-group-item">
            <div className="input-group">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control no-border"
                  id="floatingInput"
                  value={chart.other_medicines?.value || ""}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput">Medicamentos</label>
              </div>
            </div>
          </div>

          {/* <div className="list-group-item">
            <span className="fs-3 p-2">Contraindicacoes Absolutas</span>
            {chart.absolute_contraindications.map((itm, i) => (
              <div key={i} className="form-floating">
                <input
                  type="text"
                  className="form-control no-border"
                  id="floatingInput"
                  value={itm.response}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="floatingInput ">
                  {itm.absolute_contraindication_template.description}
                </label>
              </div>
            ))}
          </div> */}

          {/* <div className="list-group-item">
            <span className="fs-3 p-2">Anticoagulantes</span>
            <div className="flex flex-column">
              {chart.anticoagulants.map((itm, i) => (
                <div key={i} className="flex flex-row">
                  <div className="flex flex-column mb-3 ms-2">
                    <div className="mb-1 fst-italic">
                      <span
                        className={
                          ["sim", "não sei"].includes(
                            itm.response.toLowerCase()
                          )
                            ? "bg-warning"
                            : ""
                        }
                      >
                        {itm.anticoagulant_template.name}
                      </span>
                    </div>
                    <div>
                      <span
                        className={
                          itm.anticoagulant_template.is_free_text
                            ? "bg-warning"
                            : ""
                        }
                      >
                        {itm.response}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="list-group-item">
            <span className="fs-3 p-2">Comorbidades</span>
            <div className="flex flex-column">
              {chart.comorbidities.map((itm, i) => (
                <div key={i} className="flex flex-row">
                  <span>
                    {itm.comorbity_template.is_free_text
                      ? itm.response_text
                      : itm.comorbity_template.name}
                  </span>
                </div>
              ))}
            </div>
          </div> */}
        </section>
      )}

      <section className="mt-4 flex-column">
        <span className="fs-5 mb-3">Chat</span>

        <div
          className="border rounded flex-column p-2"
          style={{ minHeight: "100px", maxHeight: "300px", overflow: "auto" }}
          ref={chatMessagesRef}
        >
          {chartChat !== null &&
            chartChat.map((msg) => (
              <ChatMessage
                key={msg.id}
                msg={msg}
                isCurrentUser={get_my_user_id() === msg.user_id}
              />
            ))}
        </div>

        <div className="input-group mb-3 mt-1">
          <input
            className="form-control"
            value={inputMessage}
            onChange={(x) => setInputMessage(x.target.value)}
          />
          <span className="btn input-group-text border" onClick={sendMessage}>
            Enviar
          </span>
        </div>
      </section>
    </div>
  );
}
