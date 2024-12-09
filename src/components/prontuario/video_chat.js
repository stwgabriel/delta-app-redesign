"use client";
import { useAPIContext } from "@/contexts/api";
import { useStateContext } from "@/contexts/state";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
} from "amazon-chime-sdk-js";
import { useEffect, useRef, useState } from "react";

let logger;
let deviceController;
let configuration;
let meetingSession;

export default function VideoChatComponent({ chart_id }) {
  const audioOutputElement = useRef();
  const videoInputElement = useRef();
  const [onGoingMeetings, setOnGoingMeetings] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [attendee, setAttendee] = useState(null);
  const [attendees, setAttendees] = useState({});
  const { create_chart_call, add_meeting_attendee, get_ongoing_meetings } =
    useAPIContext();
  const { isAuthenticated } = useStateContext();

  useEffect(() => {
    if (isAuthenticated) {
      get_ongoing_meetings(chart_id)
        .then(setOnGoingMeetings)
        .catch(console.error);
    }
  }, [isAuthenticated]);

  function startCall() {
    create_chart_call(chart_id).then(onMeeting).catch(console.error);
  }

  function onMeeting(mtg) {
    console.log(mtg);
    setMeeting(mtg);
    add_meeting_attendee(mtg.meeting.Meeting.MeetingId)
      .then((atd) => onMeetingAttendee(mtg.meeting.Meeting, atd))
      .catch(console.error);
  }

  function onMeetingAttendee(mtg, atd) {
    console.log(atd);
    setAttendee(atd);
    initiateMeeting(mtg, atd);
  }

  async function initiateMeeting(mtg, atd) {
    // Initiate objs
    logger = new ConsoleLogger("MeetingLogs", LogLevel.INFO);
    deviceController = new DefaultDeviceController(logger);
    configuration = new MeetingSessionConfiguration(mtg, atd.Attendee);
    meetingSession = new DefaultMeetingSession(
      configuration,
      logger,
      deviceController
    );

    meetingSession.audioVideo.setDeviceLabelTrigger(
      async () =>
        await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    );

    const audioInputDevices =
      await meetingSession.audioVideo.listAudioInputDevices();
    console.log(audioInputDevices);

    const audioOutputDevices =
      await meetingSession.audioVideo.listAudioOutputDevices();
    // console.log(audioOutputDevices);

    const videoInputDevices =
      await meetingSession.audioVideo.listVideoInputDevices();
    // console.log(videoInputDevices);

    await meetingSession.audioVideo.startAudioInput(
      // audioInputDevice.deviceId
      audioInputDevices[0].deviceId
    );

    await meetingSession.audioVideo.chooseAudioOutput(
      audioOutputDevices[0].deviceId
    );

    await meetingSession.audioVideo.startVideoInput(
      videoInputDevices[0].deviceId
    );

    console.log(audioOutputElement);
    meetingSession.audioVideo.bindAudioElement(audioOutputElement.current);
    console.log(videoInputElement);
    meetingSession.audioVideo.startVideoPreviewForVideoInput(
      videoInputElement.current
    );

    meetingSession.audioVideo.addObserver({
      audioVideoDidStart: (x) => {
        // console.log(x);
      },
      audioVideoDidStartConnecting: (x) => {
        // console.log(x);
      },
      audioVideoDidStop: (x) => {
        // console.log(x);
      },
      videoTileDidUpdate: (tileState) => {
        console.log(tileState);
        if (!tileState.boundAttendeeId || tileState.isContent) return;
        // console.log("1");

        setAttendees((prev) => {
          if (!prev[tileState.tileId]) {
            return {
              ...prev,
              [tileState.tileId]: {
                tileState,
                ref: (x) => {
                  if (x) {
                    console.log("whaaat?", tileState.tileId, x);
                    meetingSession.audioVideo.bindVideoElement(
                      tileState.tileId,
                      x
                    );
                  }
                },
              },
            };
          }
          return prev;
        });
      },
      videoTileWasRemoved: (tileId) => {
        // Unbind video element when the tile is removed
        console.log(tileId);
        meetingSession.audioVideo.unbindVideoElement(tileId);
        console.log(tileId);
        setAttendees((prev) => {
          let newRefs = { ...prev };
          console.log(newRefs);
          delete newRefs[tileId];
          console.log(newRefs);
          return newRefs;
        });
      },
      videoAvailabilityDidChange: (x) => {
        console.log(x);
      },
      videoSendDidBecomeUnavailable: (x) => {
        // console.log(x);
      },
    });

    meetingSession.audioVideo.start();

    meetingSession.audioVideo.startLocalVideoTile();
  }

  return (
    <section className="my-5 flex-column">
      <div className="flex-column">
        {onGoingMeetings &&
          onGoingMeetings.map((mtg) => (
            <div className="flex-column">
              <span>Pessoas na reunião: {mtg.attendees_count}</span>
              <button className="btn btn-success">Entrar na chamada</button>
            </div>
          ))}
      </div>

      {meeting === null && (
        <button className="btn btn-success" onClick={startCall}>
          Iniciar chamada
        </button>
      )}
      <div>
        <audio ref={audioOutputElement}></audio>
        <video ref={videoInputElement}></video>
      </div>

      <div className="mt-5 flex-column">
        {Object.keys(attendees).map((key) => {
          if (!attendees[key].tileState.localTile) {
            return <video key={key} ref={attendees[key].ref} />;
          }
        })}
      </div>
    </section>
  );
}
