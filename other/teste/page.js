"use client";
import { useWebSocketContext } from "@/contexts/ws";
import React, { useEffect, useRef, useState } from "react";

const peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

let pc = null;
let localStream;
let remoteStream;
export default function Home() {
  const localVideoElement = useRef();
  const remoteVideoElement = useRef();
  const ws = useWebSocketContext();

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (!ws.isReady) return;
    ws.addEventListener("offer_list", function (data) {
      console.log("New offer list!", data);
      setOffers(data.content);
    });

    ws.addEventListener("answer_response", addAnswer);
    ws.addEventListener(
      "received_ice_candidate_from_server",
      addNewIceCandidate
    );
  }, [ws.isReady]);

  function addNewIceCandidate(iceCandidate) {
    iceCandidate.content.forEach((c) => {
      pc.addIceCandidate(c.content);
      console.log("======Added Ice Candidate======", c);
    });
  }

  async function addAnswer(answer) {
    //addAnswer is called in socketListeners when an answerResponse is emitted.
    //at this point, the offer and answer have been exchanged!
    //now CLIENT1 needs to set the remote
    console.log("yay! an answer");
    console.log(answer);
    await pc.setRemoteDescription(answer.content.answer);
    answer.content.icecandidates.forEach((c) => {
      pc.addIceCandidate(c.content);
      console.log("======Added Ice Candidate======", c);
    });
    // console.log(pc.signalingState)
  }

  function fetchUserMedia() {
    return new Promise(async (resolve, reject) => {
      try {
        navigator.mediaDevices.enumerateDevices().then(console.log);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localVideoElement.current.srcObject = stream;
        localStream = stream;
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  }

  function createPeerConnection(offerObj) {
    return new Promise(async (resolve, reject) => {
      console.log("creating peer connection");

      pc = await new RTCPeerConnection(peerConfiguration);
      console.log("creating media stream");

      remoteStream = new MediaStream();
      remoteVideoElement.current.srcObject = remoteStream;

      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      // pc.addEventListener("signalingstatechange", (event) => {
      //   console.warn(event);
      //   console.warn(pc.signalingState);
      //   console.error("look at this");
      // });

      pc.addEventListener("icecandidate", (e) => {
        console.log("ice candidate found!");
        // console.log(e);
        if (e.candidate) {
          ws.emit("send_ice_candidate_to_signaling_server", {
            candidate: e.candidate,
          });
        }
      });

      pc.addEventListener("track", (e) => {
        console.log("got a track from other peer");
        // console.log(e);
        e.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track, remoteStream);
          console.log("track added");
        });
      });

      if (offerObj) {
        console.log("setting remote description", offerObj);
        await pc.setRemoteDescription(offerObj.offer);
      }
      resolve();
    });
  }

  async function call() {
    await fetchUserMedia();

    await createPeerConnection();

    try {
      console.log("creating offer");
      const offer = await pc.createOffer();
      console.log(offer);
      pc.setLocalDescription(offer);
      ws.emit("new_offer", {
        offer,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function answerOffer(offerObj) {
    await fetchUserMedia();
    await createPeerConnection(offerObj);
    const answer = await pc.createAnswer({});
    await pc.setLocalDescription(answer);

    console.log(answer);
    console.log(offerObj);

    const offerIceCandidates = await ws.emitAwait("new_answer", {
      call_id: offerObj.id,
      answer,
    });
    console.log(offerIceCandidates);

    offerIceCandidates.content.forEach((c) => {
      pc.addIceCandidate(c.content);
      console.log("Added ice candidate", c);
    });
  }

  return (
    <div className="flex-column">
      <button className="btn" onClick={call}>
        Initiate Call
      </button>

      <div className="flex-column">
        <span>
          <h3>Local Stream</h3>
          <video ref={localVideoElement} autoPlay playsInline controls></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video ref={remoteVideoElement} autoPlay playsInline controls></video>
        </span>
      </div>

      {offers.map((o, i) => (
        <div key={i}>
          <button className="bg-success" onClick={() => answerOffer(o)}>
            Answer
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          localStream.getTracks().forEach((track) => {
            if (track.kind === "video") {
              track.enabled = false;
            }
          });
        }}
        className="btn-warning"
      >
        Stop video
      </button>
      <button
        onClick={async () => {
          localStream.getTracks().forEach((track) => {
            if (track.kind === "video") {
              track.enabled = true;
            }
          });
        }}
        className="btn-warning"
      >
        Start video
      </button>
      <button
        onClick={() => {
          console.log("Connection");
          let senderList = pc.getSenders();

          senderList.forEach((sender) => {
            console.log(sender);
          });
        }}
        className="btn-warning"
      >
        Check Connection
      </button>

      <button
        onClick={() => {
          console.log("local stream");
          console.log(localStream);
          console.log(localStream.getTracks());
          const tracks = localStream.getTracks();
          for (var i = 0; i < tracks.length; i++) {
            console.log(tracks[i]);
          }
        }}
        className="btn-warning"
      >
        Check local stream
      </button>

      <button
        onClick={() => {
          console.log("remote stream");
          console.log(remoteStream);
          console.log(remoteStream.getTracks());
          const tracks = remoteStream.getTracks();
          for (var i = 0; i < tracks.length; i++) {
            console.log(tracks[i]);
          }
        }}
        className="btn-warning"
      >
        Check remote stream
      </button>
    </div>
  );
}
