"use client";

import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
} from "amazon-chime-sdk-js";
import React, { useEffect, useRef, useState } from "react";

function VideoElement({ id }) {
  const ref = useRef();
  return <video ref={ref}></video>;
}

let meetingSession;

export default function MyApp() {
  const audioOutputElement = useRef();
  const videoInputElement = useRef();

  // const [attendees, setAttendees] = useState({}); // Track attendees

  const videoRefs = useRef({}); // Stores refs for each participant
  const [attendees, setAttendees] = useState([]); // Track attendees

  useEffect(() => {
    (async function () {
      // const f_meeting = await fetch("http://localhost:8000/v1/meeting/create");
      // const d_meeting = await f_meeting.json();
      // const Meeting = d_meeting["Meeting"];

      const Meeting = {
        MeetingId: "86a24843-9524-4e56-8002-81aafea42713",
        ExternalMeetingId: "42b97619-9d24-4de3-8830-bfaa50093de7",
        MediaRegion: "us-east-1",
        MediaPlacement: {
          AudioHostUrl:
            "1d1836f55ee4a56a1bff528f6716d6b8.k.m1.ue1.app.chime.aws:3478",
          AudioFallbackUrl:
            "wss://wss.k.m1.ue1.app.chime.aws:443/calls/86a24843-9524-4e56-8002-81aafea42713",
          SignalingUrl:
            "wss://signal.m1.ue1.app.chime.aws/control/86a24843-9524-4e56-8002-81aafea42713",
          TurnControlUrl:
            "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions",
          ScreenDataUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/86a24843-9524-4e56-8002-81aafea42713",
          ScreenViewingUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=86a24843-9524-4e56-8002-81aafea42713",
          ScreenSharingUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/86a24843-9524-4e56-8002-81aafea42713",
          EventIngestionUrl:
            "https://data.svc.ue1.ingest.chime.aws/v1/client-events",
        },
      };

      console.log(Meeting);

      const f_attendee = await fetch(
        `http://localhost:8000/v1/meeting/add_attendee?meeting_id=${Meeting.MeetingId}`
      );
      const d_attendee = await f_attendee.json();
      const Attendee = d_attendee["Attendee"];

      console.log(Attendee);

      const logger = new ConsoleLogger("MeetingLogs", LogLevel.INFO);
      const deviceController = new DefaultDeviceController(logger);
      const configuration = new MeetingSessionConfiguration(Meeting, Attendee);
      meetingSession = new DefaultMeetingSession(
        configuration,
        logger,
        deviceController
      );

      // Invoke devices
      meetingSession.audioVideo.setDeviceLabelTrigger(
        async () =>
          await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          })
      );
      const audioInputDevices =
        await meetingSession.audioVideo.listAudioInputDevices();
      // console.log(audioInputDevices);

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
          console.log(x);
        },
        audioVideoDidStartConnecting: (x) => {
          console.log(x);
        },
        audioVideoDidStop: (x) => {
          console.log(x);
        },
        videoTileDidUpdate: (tileState) => {
          if (!tileState.boundAttendeeId || tileState.isContent) return;

          // Add new attendee if not already in the list
          if (!videoRefs.current[tileState.boundAttendeeId]) {
            setAttendees((prev) => [...prev, tileState.boundAttendeeId]);
            videoRefs.current[tileState.boundAttendeeId] = React.createRef();
          }

          // Bind video tile to the ref's current element
          if (videoRefs.current[tileState.boundAttendeeId]?.current) {
            meetingSession.audioVideo.bindVideoElement(
              tileState.tileId,
              videoRefs.current[tileState.boundAttendeeId].current
            );
          }
        },
        videoTileWasRemoved: (tileId) => {
          // Unbind video element when the tile is removed
          meetingSession.audioVideo.unbindVideoElement(tileId);
        },
        videoAvailabilityDidChange: (x) => {
          console.log(x);
        },
        videoSendDidBecomeUnavailable: (x) => {
          console.log(x);
        },
      });

      meetingSession.audioVideo.start();

      meetingSession.audioVideo.startLocalVideoTile();
    })();
  }, []);

  return (
    <div className="flex-column">
      <div className="flex-column">
        <button onClick={() => meetingSession.audioVideo.startLocalVideoTile()}>
          Start Video
        </button>
        <button onClick={() => meetingSession.audioVideo.stopLocalVideoTile()}>
          Stop Video
        </button>
      </div>
      <audio ref={audioOutputElement}></audio>
      <video ref={videoInputElement}></video>
      {/* 
      {videos.map((v, i) => {
        return (
          <video
            key={i}
            ref={(el) => (videoElements.current[i] = el)}
            id={i}
          >{`Button${i}`}</video>
        );
      })} */}
      {/* <div className="mt-4 flex-column">
        <video ref={ve1}></video>
        <video ref={ve2}></video>
        <video ref={ve3}></video>
        <video ref={ve4}></video>
        <video ref={ve5}></video>
        <video ref={ve6}></video>
      </div> */}

      {/* <div className="mt-5 flex-column">
        {Object.keys(attendees).map((attendeeId) => (
          <video
            key={attendeeId}
            ref={attendees[attendeeId]}
            // autoPlay
            // muted={attendeeId === "local"} // Optionally mute the local video
          />
        ))}
      </div> */}
      <div className="mt-5 flex-column">
        {attendees.map((attendeeId) => (
          <video
            key={attendeeId}
            ref={videoRefs.current[attendeeId]}
            autoPlay
            muted={attendeeId === "local"} // Optionally mute the local video
          />
        ))}
      </div>
    </div>
  );
}
