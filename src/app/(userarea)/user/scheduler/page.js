"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useAPIContext } from "@/contexts/api";
import { useEffect, useState } from "react";
import { useClientNotificationContext } from "@/contexts/client_notification";
import moment from "moment-timezone";
import { formatDateDifference } from "@/utils/funcs";

function renderEventContent(eventInfo) {
  return (
    <span className="d-flex flex-column align-items-center justify-content-center">
      <b>{eventInfo.timeText}</b>
      {/* <b>{eventInfo.event.extendedProps.aaaaa}</b> */}
    </span>
  );
}

export default function SchedulerPage() {
  const { list_shifts_on_timespan, search_user_name, get_user, request_delete_shift, create_shift } = useAPIContext();
  const { notifyError, notifySuccess } = useClientNotificationContext();

  const [events, setEvents] = useState(null);
  const [userList, setUserList] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [calendarTimespan, setCalendarTimespan] = useState({
    start_at: new Date(moment(new Date()).format("YYYY-MM-DDTHH:mm")).toISOString(),
    end_at: new Date(moment(new Date()).format("YYYY-MM-DDTHH:mm")).toISOString(),
  });

  const handleCalendarClick = (e) => {
    setSelectedEvent({
      type: "calendar",
      ...e.event.extendedProps.rawEvent,
    });
    setSelectedUser(e.event.extendedProps.rawEvent.user);
  };

  const handleDatesSet = (dateInfo) => {
    setCalendarTimespan({ start_at: dateInfo.startStr, end_at: dateInfo.endStr });
  };

  function refresh_list_events() {
    list_shifts_on_timespan(calendarTimespan.start_at, calendarTimespan.end_at)
      .then((es) => {
        const newEvents = es.map((e) => {
          return { ...e, start: e.start_at, end: e.end_at, rawEvent: e };
        });
        setEvents(newEvents);
      })
      .catch((e) => notifyError(e.message));
  }

  useEffect(() => {
    refresh_list_events();
  }, [calendarTimespan]);

  useEffect(() => {
    console.log(selectedEvent);
  }, [selectedEvent]);

  function _search_user_name(name) {
    search_user_name(name)
      .then(setUserList)
      .catch((e) => notifyError(e.message));
  }

  function _set_selected_user(user_id) {
    get_user(user_id)
      .then(setSelectedUser)
      .catch((e) => notifyError(e.message));
  }

  function handleTimeChange(elt, timeType) {
    const newTimestamp = new Date(moment(elt.target.value).format("YYYY-MM-DDTHH:mm")).toISOString();
    setSelectedEvent((e) => {
      if (e.type === "calendar") {
        notifyError("Não permitido alterar evento");
        return e;
      }
      return { ...e, [timeType]: newTimestamp };
    });
  }

  function _new_shift() {
    setSelectedEvent({
      type: "new",
      start_at: new Date(moment(new Date()).format("YYYY-MM-DDTHH:mm")).toISOString(),
      end_at: new Date(moment(new Date()).format("YYYY-MM-DDTHH:mm")).toISOString(),
    });
    setSelectedUser(null);
  }

  function delete_event(eid) {
    request_delete_shift(eid)
      .then(() => {
        setSelectedEvent(null);
        setSelectedUser(null);
        refresh_list_events();
        notifySuccess("Solicitação para deletar turno enviada para aprovação");
      })
      .catch((e) => notifyError(e.message));
  }
  function create_event() {
    create_shift({
      user_id: selectedUser.id,
      start_at: selectedEvent.start_at,
      end_at: selectedEvent.end_at,
    })
      .then(() => {
        setSelectedEvent(null);
        setSelectedUser(null);
        refresh_list_events();
        notifySuccess("Solicitação para adicionar turno enviada para aprovação");
      })
      .catch((e) => notifyError(e.message));
  }

  return (
    <div className="my-5">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        datesSet={handleDatesSet}
        initialView="timeGridWeek"
        events={events}
        eventContent={renderEventContent}
        locale={ptBrLocale}
        eventClick={handleCalendarClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        allDaySlot={false}
      />

      <button className="btn btn-primary w-100 mt-5" onClick={_new_shift}>
        Novo cadastro de turno
      </button>

      {selectedEvent !== null && (
        <div className="card shadow mt-5">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Detalhes do turno</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                Médico do turno
              </label>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="searchUser"
                  placeholder="Digite o nome"
                  disabled={selectedEvent.type === "calendar"}
                  onChange={(e) => _search_user_name(e.target.value)}
                />
              </div>

              <select
                className="form-control mb-3"
                defaultValue={""}
                disabled={selectedEvent.type === "calendar"}
                onChange={(e) => _set_selected_user(e.target.value)}
              >
                <option disabled value={""}>
                  Escolha um médico
                </option>
                {userList !== null &&
                  userList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
              </select>

              {selectedUser !== null && (
                <div className="d-flex flex-column mb-3">
                  <span className="fw-bold">Usuário selecionado</span>
                  <span>
                    Nome: {selectedUser.name} {selectedUser.surname}
                  </span>
                  <span>CPF: {selectedUser.cpf}</span>
                  <span>
                    CRM: {selectedUser.crm_state}/{selectedUser.crm_number}
                  </span>
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Início
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="startTime"
                disabled={selectedEvent.type === "calendar"}
                value={moment.tz(selectedEvent.start_at, "America/Sao_Paulo").format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => handleTimeChange(e, "start_at")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                Fim
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="endTime"
                disabled={selectedEvent.type === "calendar"}
                value={moment.tz(selectedEvent.end_at, "America/Sao_Paulo").format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => handleTimeChange(e, "end_at")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                Duração do turno: {formatDateDifference(selectedEvent.start_at, selectedEvent.end_at)}
              </label>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-danger w-100 mx-5"
                disabled={!(selectedEvent.type === "calendar" && selectedEvent.deleted_by_user_id === null)}
                onClick={() => delete_event(selectedEvent.id)}
              >
                Excluir
              </button>
              <button
                className="btn btn-success w-100 mx-5"
                disabled={selectedEvent.type === "calendar"}
                onClick={create_event}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
