// src/VideoRoom.js
import React, { useEffect, useRef, useState } from "react";
import { connect, createLocalVideoTrack } from "@twilio/video";

const VideoRoom = ({ token }) => {
  const [room, setRoom] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const setupRoom = async () => {
      const localTrack = await createLocalVideoTrack();
      localVideoRef.current.appendChild(localTrack.attach());

      const videoRoom = await connect(token, { tracks: [localTrack] });
      setRoom(videoRoom);

      videoRoom.on("participantConnected", (participant) => {
        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;
            remoteVideoRef.current.appendChild(track.attach());
          }
        });

        participant.on("trackSubscribed", (track) => {
          remoteVideoRef.current.appendChild(track.attach());
        });
      });

      videoRoom.on("participantDisconnected", (participant) => {
        participant.tracks.forEach((publication) => {
          const attachedElements = publication.track.detach();
          attachedElements.forEach((element) => element.remove());
        });
      });
    };

    setupRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [token]);

  return (
    <div className="d-flex">
      <div className="d-flex" ref={localVideoRef} style={{ width: "200px", height: "200px" }}></div>
      <div className="d-flex" ref={remoteVideoRef} style={{ width: "200px", height: "200px" }}></div>
    </div>
  );
};

export default VideoRoom;
