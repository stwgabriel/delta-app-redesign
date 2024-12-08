"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import {
  calculateAge,
  getMaxNIHCount,
  getValueFromFormObj,
} from "@/utils/funcs";
import ChatMessage from "@/components/chat/chat_message";
import { useChart } from "@/contexts/chart";
import FormDisplay from "@/components/prontuario/display";
import {
  absolute_contraindication_template,
  comorbidities_template,
  medicines_anticoagulant_template,
} from "@/utils/templates";
import { useStateContext } from "@/contexts/state";
import { useFileUpload } from "@/contexts/fileupload";
import FileUploadComponent from "@/components/chart/file_upload";
import AvailableFiles from "@/components/chart/available_files";

export default function ProntuarioPage() {
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart } = useChart(chart_id);
  const [chartChat, setChartChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const chatMessagesRef = useRef(null);
  const [nihTemplate, setNihTemplate] = useState(null);
  const { isAuthenticated } = useStateContext();

  const { uploadingFiles, upload_file, countCompleted } =
    useFileUpload(chart_id);

  const {
    get_chart_chat,
    get_my_user_id,
    post_chart_chat_message,
    get_nih_template,
  } = useAPIContext();

  useEffect(() => {
    if (!isAuthenticated) return;

    reloadMessages();
    get_nih_template().then(setNihTemplate).catch(console.error);
  }, [isAuthenticated]);

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

  function getNIHScore() {
    let score = 0;
    if (nihTemplate === null) return 0;
    for (const section of nihTemplate) {
      const answer = chart[section.field];
      if (!answer) continue;
      score += answer.value.score;
    }
    return score;
  }

  function getNIHAnswerCount() {
    let count = 0;
    for (const section of nihTemplate) {
      const answer = chart[section.field];
      if (answer) {
        count += 1;
      }
    }
    return count;
  }

  return (
    <div className="container pt-5 justify-content-center flex-column">
      {chart === null ? (
        <Spinner />
      ) : (
        <section className="flex list-group">
          <div className="list-group-item">
            <div className="d-flex input-group justify-content-around">
              <FormDisplay name="Name" text={getValueFromFormObj(chart.name)} />
              <FormDisplay name="CPF" text={getValueFromFormObj(chart.cpf)} />
              <FormDisplay
                name="Data de nascimento"
                text={getValueFromFormObj(chart.birth_date)}
              />
              <FormDisplay
                name="Idade"
                text={
                  chart.birth_date === null
                    ? chart.age?.value || ""
                    : calculateAge(chart.birth_date.value)
                }
              />
            </div>
          </div>
          <div className="list-group-item">
            <div className="d-flex input-group justify-content-around">
              <FormDisplay
                name="Tempo de evento conhecido?"
                text={getValueFromFormObj(chart.known_event_time)}
              />
              <FormDisplay
                name="ICTUS"
                text={getValueFromFormObj(chart.ictus)}
              />
            </div>
          </div>

          <div className="list-group-item">
            <FormDisplay
              name="História coletada com"
              text={getValueFromFormObj(chart.history_collected_with)}
            />
            <FormDisplay
              name="História"
              text={getValueFromFormObj(chart.history)}
            />
          </div>

          <div className="list-group-item">
            <div className="d-flex input-group justify-content-around">
              <FormDisplay
                name="Rankin Score"
                text={getValueFromFormObj(chart.rankin_score)}
              />
              <FormDisplay
                name="Rankin"
                text={getValueFromFormObj(chart.rankin_description)}
              />
            </div>
          </div>

          <div className="list-group-item">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="px-3" scope="col">
                    Anticoagulante
                  </th>
                  <th className="px-3 text-center" scope="col">
                    Tomado?
                  </th>
                  <th className="px-3 text-center" scope="col">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicines_anticoagulant_template.map((template, i) => (
                  <tr key={`aco-${i}`}>
                    <td className="px-3">{template.text}</td>
                    <td className="px-3 text-center">
                      {getValueFromFormObj(chart[template.field])}
                    </td>
                    <td className="px-3 text-center">
                      {getValueFromFormObj(chart[template.field_taken_at])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <FormDisplay
              name="Outros Medicamentos"
              text={getValueFromFormObj(chart.other_medicines)}
              align_label_center={false}
              align_value_center={false}
            />
          </div>

          <div className="list-group-item">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="px-3" scope="col">
                    Contraindicações absolutas
                  </th>
                  <th className="px-3 text-center" scope="col">
                    Resposta
                  </th>
                </tr>
              </thead>
              <tbody>
                {absolute_contraindication_template.map((template, i) => (
                  <tr key={`ac-${i}`}>
                    <td className="px-3">{template.text}</td>
                    <td className="px-3 text-center">
                      {getValueFromFormObj(chart[template.field])}
                      <div className="">
                        {template.case_yes &&
                          template.case_yes.map((subtemplate, j) => (
                            <div
                              key={`ac-sub-${j}`}
                              className="flex-column px-1"
                            >
                              <span>{subtemplate.text}</span>
                              <span>
                                {getValueFromFormObj(chart[subtemplate.field])}
                              </span>
                              <span>
                                {subtemplate.field_other
                                  ? getValueFromFormObj(
                                      chart[subtemplate.field_other]
                                    )
                                  : ""}
                              </span>
                            </div>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="list-group-item">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="px-3" scope="col">
                    Comorbidades
                  </th>
                  <th className="px-3 text-center" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {comorbidities_template.map((template, i) => (
                  <tr key={`cmo-${i}`}>
                    <td className="px-3">{template.text}</td>
                    <td className="px-3 text-center">
                      {getValueFromFormObj(chart[template.field])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="list-group-item">
            {nihTemplate === null ? (
              <Spinner />
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="px-3" scope="col">
                      Item NIHSS
                    </th>
                    <th className="px-3 text-center" scope="col">
                      Resposta
                    </th>
                    <th className="px-3 text-center" scope="col">
                      Explicação
                    </th>
                    <th className="px-3 text-center" scope="col">
                      Pontuação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nihTemplate.map((template, i) => (
                    <tr key={`nih-${i}`}>
                      <td className="px-3">{template.description}</td>
                      <td className="px-3">
                        {chart[template.field]
                          ? chart[template.field]?.value.description
                          : ""}
                      </td>
                      <td className="px-3">
                        {chart[template.field]
                          ? chart[`${template.field}_other`]?.value
                          : ""}
                      </td>
                      <td className="px-3">
                        {chart[template.field]
                          ? chart[template.field]?.value.score
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="flex-column align-items-center">
              <span className="py-1">
                Pontuação NIHSS: {getNIHScore()} de{" "}
                {getMaxNIHCount(nihTemplate)}
              </span>
              <span className="py-1">
                Respondidas {getNIHAnswerCount()} de {nihTemplate.length} (
                {Math.round((100 * getNIHAnswerCount()) / nihTemplate.length)}%)
              </span>
            </div>
          </div>
        </section>
      )}

      <section className="mt-4 flex-column">
        <span className="fs-5 mb-3">Arquivos</span>

        <AvailableFiles chart_id={chart_id} countCompleted={countCompleted} />

        <div className="flex-column">
          <label
            className="custom-file-upload align-items-center align-self-center my-3"
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                for (const file of e.target.files) {
                  upload_file(file);
                }
                e.target.value = null;
              }}
            />
            <span className="material-icons fs-1">upload_file</span>
            Enviar arquivos
          </label>

          {Object.values(uploadingFiles).map((obj) => (
            <FileUploadComponent key={obj.local_id} obj={obj} />
          ))}
        </div>
      </section>

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
