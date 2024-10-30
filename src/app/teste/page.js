"use client";
import { useWebSocketContext } from "@/contexts/ws";
import { useEffect, useRef, useState } from "react";

const peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

const myId = Math.floor(Math.random() * 1000);
let pc = null;
export default function Home() {
  const localVideoElement = useRef();
  const remoteVideoElement = useRef();
  const ws = useWebSocketContext();

  const [offers, setOffers] = useState([]);

  let localStream;
  let remoteStream;
  let didIOffer = false;

  useEffect(() => {
    if (!ws.isReady) return;
    ws.addEventListener("new_offer", function (data) {
      console.log("New offer!");
      setOffers((old) => [...old, data]);
    });
  }, [ws.isReady]);

  function fetchUserMedia() {
    return new Promise(async (resolve, reject) => {
      try {
        navigator.mediaDevices.enumerateDevices().then(console.log);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          //audio:true
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

      pc.addEventListener("signalingstatechange", (event) => {
        console.log(event);
        console.log(pc.signalingState);
      });

      pc.addEventListener("icecandidate", (e) => {
        console.log("ice candidate found!");
        console.log(e);
        if (e.candidate) {
          ws.emit("send_ice_candidate_to_signaling_server", {
            iceCandidate: e.candidate,
            iceUserName: myId,
            didIOffer,
          });
        }
      });

      pc.addEventListener("track", (e) => {
        console.log("got a track from other peer");
        console.log(e);
        e.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track, remoteStream);
          console.log("track added");
        });
      });

      if (offerObj) {
        console.log(offerObj);
        await pc.setRemoteDescription(offerObj.content);
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
      didIOffer = true;
      ws.emit("new_offer", offer);
    } catch (err) {
      console.log(err);
    }
  }

  async function answerOffer(offerObj) {
    await fetchUserMedia();

    await createPeerConnection(offerObj);

    const answer = await pc.createAnswer({});
    await pc.setLocalDescription(answer);
    offerObj.content.answer = answer;
    const offerIceCandidates = await ws.emit("new_answer", offerObj.content);
    offerIceCandidates.forEach((c) => {
      pc.addIceCandidate(c);
      console.log("Added ice candidate");
    });
    console.log(offerObj);
    console.log(answer);
  }

  return (
    <div className="flex-column">
      <span></span>

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

      <button onClick={call}>Call</button>

      {offers.map((o, i) => (
        <div key={i}>
          <button className="bg-success" onClick={() => answerOffer(o)}>
            Answer
          </button>
        </div>
      ))}
    </div>
  );
}
