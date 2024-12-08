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
        MeetingId: "af88ba44-facd-4192-904d-5f8cc5582713",
        ExternalMeetingId: "25bcfadb-f306-445f-9718-2baab4c98567",
        MediaRegion: "us-east-1",
        MediaPlacement: {
          AudioHostUrl:
            "d1e3922c74d15b7c22a0b3073f60d19d.k.m3.ue1.app.chime.aws:3478",
          AudioFallbackUrl:
            "wss://wss.k.m3.ue1.app.chime.aws:443/calls/af88ba44-facd-4192-904d-5f8cc5582713",
          SignalingUrl:
            "wss://signal.m3.ue1.app.chime.aws/control/af88ba44-facd-4192-904d-5f8cc5582713",
          TurnControlUrl:
            "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions",
          ScreenDataUrl:
            "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/af88ba44-facd-4192-904d-5f8cc5582713",
          ScreenViewingUrl:
            "wss://bitpw.m3.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=af88ba44-facd-4192-904d-5f8cc5582713",
          ScreenSharingUrl:
            "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/af88ba44-facd-4192-904d-5f8cc5582713",
          EventIngestionUrl:
            "https://data.svc.ue1.ingest.chime.aws/v1/client-events",
        },
        MeetingFeatures: {
          Audio: {
            EchoReduction: "UNAVAILABLE",
          },
        },
        TenantIds: [],
        MeetingArn:
          "arn:aws:chime:us-east-1:984007934086:meeting/af88ba44-facd-4192-904d-5f8cc5582713",
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
          console.log("1");

          // Add new attendee if not already in the list
          if (!videoRefs.current[tileState.boundAttendeeId]) {
            console.log("2");
            setAttendees((prev) => [...prev, tileState.boundAttendeeId]);
            videoRefs.current[tileState.boundAttendeeId] = React.createRef();
          }
          console.log(
            "3",
            videoRefs.current[tileState.boundAttendeeId]?.current
          );

          // Bind video tile to the ref's current element
          if (videoRefs.current[tileState.boundAttendeeId]?.current) {
            console.log("4");
            meetingSession.audioVideo.bindVideoElement(
              tileState.tileId,
              videoRefs.current[tileState.boundAttendeeId].current
            );
          }
        },
        videoTileWasRemoved: (tileId) => {
          // Unbind video element when the tile is removed
          console.log(tileId);
          meetingSession.audioVideo.unbindVideoElement(tileId);
        },
        videoAvailabilityDidChange: (x) => {
          // console.log(x);
        },
        videoSendDidBecomeUnavailable: (x) => {
          // console.log(x);
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
