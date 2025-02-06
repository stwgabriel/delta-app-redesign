// "use client";

// import {
//   ConsoleLogger,
//   DefaultDeviceController,
//   DefaultMeetingSession,
//   LogLevel,
//   MeetingSessionConfiguration,
// } from "amazon-chime-sdk-js";
// import React, { useCallback, useEffect, useRef, useState } from "react";

// const Meeting = {
//   MeetingId: "388e2be5-17b5-47b6-83e0-f600fd042713",
//   ExternalMeetingId: "fb47c7a3-3dd1-4a11-a029-62b00cf51792",
//   MediaRegion: "us-east-1",
//   MediaPlacement: {
//     AudioHostUrl:
//       "778af1898f9e4f8c851fe4c06eaae217.k.m3.ue1.app.chime.aws:3478",
//     AudioFallbackUrl:
//       "wss://wss.k.m3.ue1.app.chime.aws:443/calls/388e2be5-17b5-47b6-83e0-f600fd042713",
//     SignalingUrl:
//       "wss://signal.m3.ue1.app.chime.aws/control/388e2be5-17b5-47b6-83e0-f600fd042713",
//     TurnControlUrl:
//       "https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions",
//     ScreenDataUrl:
//       "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/388e2be5-17b5-47b6-83e0-f600fd042713",
//     ScreenViewingUrl:
//       "wss://bitpw.m3.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=388e2be5-17b5-47b6-83e0-f600fd042713",
//     ScreenSharingUrl:
//       "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/388e2be5-17b5-47b6-83e0-f600fd042713",
//     EventIngestionUrl: "https://data.svc.ue1.ingest.chime.aws/v1/client-events",
//   },
//   MeetingFeatures: {
//     Audio: {
//       EchoReduction: "UNAVAILABLE",
//     },
//   },
//   TenantIds: [],
//   MeetingArn:
//     "arn:aws:chime:us-east-1:984007934086:meeting/388e2be5-17b5-47b6-83e0-f600fd042713",
// };

// const f_attendee = await fetch(
//   `http://192.168.15.104:8000/v1/meeting/add_attendee?meeting_id=${Meeting.MeetingId}`
// );
// const d_attendee = await f_attendee.json();
// const Attendee = d_attendee["Attendee"];

// const logger = new ConsoleLogger("MeetingLogs", LogLevel.INFO);
// const deviceController = new DefaultDeviceController(logger);
// const configuration = new MeetingSessionConfiguration(Meeting, Attendee);

// const meetingSession = new DefaultMeetingSession(
//   configuration,
//   logger,
//   deviceController
// );

// export default function MyApp() {
//   const audioOutputElement = useRef();
//   const videoInputElement = useRef();
//   const [attendees, setAttendees] = useState({});

//   useEffect(() => {
//     (async function () {
//       // const f_meeting = await fetch("http://localhost:8000/v1/meeting/create");
//       // const d_meeting = await f_meeting.json();
//       // const Meeting = d_meeting["Meeting"];

//       console.log("ana mariana", f_attendee);

//       console.log(Meeting);

//       // Invoke devices
//       meetingSession.audioVideo.setDeviceLabelTrigger(
//         async () =>
//           await navigator.mediaDevices.getUserMedia({
//             audio: false,
//             video: true,
//           })
//       );
//       const audioInputDevices =
//         await meetingSession.audioVideo.listAudioInputDevices();
//       console.log(audioInputDevices);

//       const audioOutputDevices =
//         await meetingSession.audioVideo.listAudioOutputDevices();
//       // console.log(audioOutputDevices);

//       const videoInputDevices =
//         await meetingSession.audioVideo.listVideoInputDevices();
//       // console.log(videoInputDevices);

//       await meetingSession.audioVideo.startAudioInput(
//         // audioInputDevice.deviceId
//         audioInputDevices[0].deviceId
//       );

//       await meetingSession.audioVideo.chooseAudioOutput(
//         audioOutputDevices[0].deviceId
//       );

//       await meetingSession.audioVideo.startVideoInput(
//         videoInputDevices[0].deviceId
//       );

//       console.log(audioOutputElement);
//       meetingSession.audioVideo.bindAudioElement(audioOutputElement.current);
//       console.log(videoInputElement);
//       meetingSession.audioVideo.startVideoPreviewForVideoInput(
//         videoInputElement.current
//       );

//       meetingSession.audioVideo.addObserver({
//         audioVideoDidStart: (x) => {
//           // console.log(x);
//         },
//         audioVideoDidStartConnecting: (x) => {
//           // console.log(x);
//         },
//         audioVideoDidStop: (x) => {
//           // console.log(x);
//         },
//         videoTileDidUpdate: (tileState) => {
//           console.log(tileState);
//           if (!tileState.boundAttendeeId || tileState.isContent) return;
//           // console.log("1");

//           setAttendees((prev) => {
//             if (!prev[tileState.tileId]) {
//               return {
//                 ...prev,
//                 [tileState.tileId]: {
//                   tileState,
//                   ref: (x) => {
//                     if (x) {
//                       console.log("whaaat?", tileState.tileId, x);
//                       meetingSession.audioVideo.bindVideoElement(
//                         tileState.tileId,
//                         x
//                       );
//                     }
//                   },
//                 },
//               };
//             }
//             return prev;
//           });
//         },
//         videoTileWasRemoved: (tileId) => {
//           // Unbind video element when the tile is removed
//           console.log(tileId);
//           meetingSession.audioVideo.unbindVideoElement(tileId);
//           console.log(tileId);
//           setAttendees((prev) => {
//             let newRefs = { ...prev };
//             console.log(newRefs);
//             delete newRefs[tileId];
//             console.log(newRefs);
//             return newRefs;
//           });
//         },
//         videoAvailabilityDidChange: (x) => {
//           console.log(x);
//         },
//         videoSendDidBecomeUnavailable: (x) => {
//           // console.log(x);
//         },
//       });

//       meetingSession.audioVideo.start();

//       meetingSession.audioVideo.startLocalVideoTile();
//     })();
//   }, []);

//   return (
//     <div className="flex-column">
//       <div className="flex-column">
//         <button onClick={() => meetingSession.audioVideo.startLocalVideoTile()}>
//           Start Video
//         </button>
//         <button onClick={() => meetingSession.audioVideo.stopLocalVideoTile()}>
//           Stop Video
//         </button>
//       </div>
//       <audio className="d-flex" ref={audioOutputElement}></audio>
//       <video className="d-flex" ref={videoInputElement}></video>

//       <div className="mt-5 flex-column">
//         {Object.keys(attendees).map((key) => {
//           if (!attendees[key].tileState.localTile) {
//             return <video className="d-flex" key={key} ref={attendees[key].ref} />;
//           }
//         })}
//       </div>
//     </div>
//   );
// }
