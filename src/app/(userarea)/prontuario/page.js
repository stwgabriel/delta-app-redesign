"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import ChatMessage from "@/components/chat/chat_message";
import { useChart } from "@/contexts/chart";
import { useFileUpload } from "@/contexts/fileupload";
import FileUploadComponent from "@/components/chart/file_upload";
import AvailableFiles from "@/components/chart/available_files";
import VideoChatComponent from "@/components/prontuario/video_chat";
import ChartAttributes from "@/components/prontuario/chart_attributes";
import { useClientNotificationContext } from "@/contexts/client_notification";
import { getValueFromObj } from "@/utils/funcs";

export default function ProntuarioPage() {
  const { notifySuccess, notifyError } = useClientNotificationContext();
  const { chart_update_attributes, get_chart_chat, get_my_user_id, post_chart_chat_message, isLoggedConsultor } =
    useAPIContext();
  const searchParams = useSearchParams();
  const chart_id = searchParams.get("chart_id");
  const { chart, refreshChart } = useChart(chart_id);
  const [chartChat, setChartChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const chatMessagesRef = useRef(null);
  const { uploadingFiles, upload_file, countCompleted } = useFileUpload(chart_id);

  useEffect(() => {
    reloadMessages();
  }, []);

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

  function closeCase() {
    chart_update_attributes(chart_id, { status: "FINALIZADO" })
      .then(() => notifySuccess("Caso encerrado com sucesso"))
      .catch((e) => notifyError(`Erro ao encerrar caso: ${e.message}`))
      .finally(() => refreshChart());
  }

  function evalLaterCase() {
    chart_update_attributes(chart_id, { status: "AVALIAR_DEPOIS" })
      .then(() => notifySuccess("Status alterado com sucesso"))
      .catch((e) => notifyError(`Erro ao alterar status do caso: ${e.message}`))
      .finally(() => refreshChart());
  }

  return (
    <div className="d-flex justify-content-center flex-column my-2">
      {/* <VideoChatComponent chart_id={chart_id} /> */}

      <span className="d-flex fs-1 my-3">Prontuário</span>
      <span class="badge bg-secondary fs-5 my-1">{getValueFromObj(chart?.status)}</span>
      <span class={`badge fs-5 my-1 ${getValueFromObj(chart?.type) === "PROTOCOLO_AVC" ? "bg-danger" : "bg-primary"}`}>
        {getValueFromObj(chart?.type) === "PROTOCOLO_AVC" ? "Protocolo de AVC" : getValueFromObj(chart?.type)}
      </span>
      {getValueFromObj(chart?.type) !== "PROTOCOLO_AVC" && (
        <span class={`badge fs-5 my-1 ${getValueFromObj(chart?.subtype) === "URGENCIA" ? "bg-warning" : "bg-primary"}`}>
          {getValueFromObj(chart?.subtype)}
        </span>
      )}
      {chart === null ? <Spinner /> : <ChartAttributes chart={chart} refreshChart={refreshChart} />}

      <section className="d-flex mt-4 flex-column">
        <span className="d-flex fs-5 mb-3">Arquivos</span>

        <AvailableFiles chart_id={chart_id} countCompleted={countCompleted} />

        <div className="d-flex flex-column">
          <label
            className="d-flex custom-file-upload align-items-center align-self-center my-3"
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
            <span className="d-flex material-icons fs-1">upload_file</span>
            Enviar arquivos
          </label>

          {Object.values(uploadingFiles).map((obj) => (
            <FileUploadComponent key={obj.local_id} obj={obj} />
          ))}
        </div>
      </section>

      <section className="d-flex mt-4 flex-column">
        <span className="d-flex fs-5 mb-3">Chat</span>
        <div
          className="d-flex border rounded flex-column p-2"
          style={{ minHeight: "100px", maxHeight: "300px", overflow: "auto" }}
          ref={chatMessagesRef}
        >
          {chartChat !== null &&
            chartChat.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} isCurrentUser={get_my_user_id() === msg.user_id} />
            ))}
        </div>

        <div className="d-flex input-group mb-3 mt-1">
          <input className="form-control" value={inputMessage} onChange={(x) => setInputMessage(x.target.value)} />
          <span className="d-flex btn input-group-text border" onClick={sendMessage}>
            Enviar
          </span>
        </div>
      </section>

      {isLoggedConsultor && chart && chart.status?.value !== "FINALIZADO" && (
        <section className="d-flex align-items-center justify-content-around">
          <button
            className="btn btn-warning"
            onClick={() => window.confirm("Tem certeza que deseja encerrar o caso?") && closeCase()}
          >
            Encerrar atendimento
          </button>
          {chart.status?.value !== "AVALIAR_DEPOIS" && (
            <button className="btn btn-success" onClick={evalLaterCase}>
              Avaliar depois
            </button>
          )}
        </section>
      )}
    </div>
  );
}
