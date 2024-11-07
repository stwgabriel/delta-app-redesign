"use client";

import { ThemeProvider } from "styled-components";
import {
  MeetingProvider,
  lightTheme,
  GlobalStyles,
  DeviceLabels,
  useLocalVideo,
  LocalVideo,
  useAudioVideo,
  useContentShareState,
} from "amazon-chime-sdk-component-library-react";

import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
import { VideoTileGrid } from "amazon-chime-sdk-component-library-react";
import { useEffect, useRef } from "react";

export default function UploadPage() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <MeetingProvider>
        <MyApp />
      </MeetingProvider>
    </ThemeProvider>
  );
}

const Meeting = {
  MeetingId: "07544711-b591-4ed2-b789-93a4517c2713",
  ExternalMeetingId: "f188b7f7-4b2b-4c97-baeb-9ee6e23a3e2b",
  MediaRegion: "us-east-1",
  MediaPlacement: {
    AudioHostUrl:
      "4f83c8854fc05dcb58475dd8cd7bc518.k.m1.ue1.app.chime.aws:3478",
    AudioFallbackUrl:
      "wss://wss.k.m1.ue1.app.chime.aws:443/calls/07544711-b591-4ed2-b789-93a4517c2713",
    SignalingUrl:
      "wss://signal.m1.ue1.app.chime.aws/control/07544711-b591-4ed2-b789-93a4517c2713",
    TurnControlUrl:
      "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions",
    ScreenDataUrl:
      "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/07544711-b591-4ed2-b789-93a4517c2713",
    ScreenViewingUrl:
      "wss://bitpw.m1.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=07544711-b591-4ed2-b789-93a4517c2713",
    ScreenSharingUrl:
      "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/07544711-b591-4ed2-b789-93a4517c2713",
    EventIngestionUrl: "https://data.svc.ue1.ingest.chime.aws/v1/client-events",
  },
  MeetingFeatures: {
    Audio: {
      EchoReduction: "UNAVAILABLE",
    },
  },
  TenantIds: [],
  MeetingArn:
    "arn:aws:chime:us-east-1:984007934086:meeting/07544711-b591-4ed2-b789-93a4517c2713",
};

const meeting_id = Meeting.MeetingId;

const MyApp = () => {
  const meetingManager = useMeetingManager();

  const joinMeeting = async () => {
    // Fetch the meeting and attendee data from your server application
    const response = await fetch(
      `http://localhost:8000/v1/meeting/add_attendee?meeting_id=${meeting_id}`
    );
    const data = await response.json();

    // Initalize the `MeetingSessionConfiguration`
    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      Meeting,
      data.Attendee
    );

    // Create a `MeetingSession` using `join()` function with the `MeetingSessionConfiguration`
    await meetingManager.join(meetingSessionConfiguration);

    // At this point you could let users setup their devices, or by default
    // the SDK will select the first device in the list for the kind indicated
    // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
    // ...

    // Start the `MeetingSession` to join the meeting
    await meetingManager.start();
  };

  const { toggleVideo, isVideoEnabled, setIsVideoEnabled } = useLocalVideo();

  const toggleCamera = async () => {
    if (isVideoEnabled || !meetingManager.selectedVideoInputDevice) {
      meetingManager.meetingSession?.audioVideo?.stopLocalVideoTile();
      // Change the state to hide the `LocalVideo` tile
      setIsVideoEnabled(false);
    } else {
      await meetingManager.meetingSession?.audioVideo?.startVideoInput(
        meetingManager.selectedVideoInputDevice
      );
      meetingManager.meetingSession?.audioVideo?.startLocalVideoTile();
      // Change the state to display the `LocalVideo` tile
      setIsVideoEnabled(true);
    }
  };

  const audioVideo = useAudioVideo();
  const { tileId } = useContentShareState();
  const videoEl = useRef();

  useEffect(() => {
    console.log(isVideoEnabled);
  }, [isVideoEnabled]);

  useEffect(() => {
    console.log("hey", audioVideo);
    if (!audioVideo) {
      console.log("hey");
      return;
    }
    console.log("hey");
    audioVideo.bindVideoElement(tileId, videoEl.current);
    console.log("hey");
    return () => audioVideo.unbindVideoElement(tileId);
  }, [audioVideo, tileId]);

  return (
    <div>
      <button onClick={joinMeeting}>Join</button>
      <button
        onClick={async () => {
          meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo);
        }}
      >
        Invoke audio and video
      </button>
      <button onClick={toggleVideo}>toggleVideo</button>
      <button onClick={toggleCamera}>toggleCamera </button>
      <video ref={videoEl} />
    </div>
  );
};
