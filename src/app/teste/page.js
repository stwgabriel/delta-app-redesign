"use client";
import { useEffect, useState } from "react";
const ws = new WebSocket("ws://localhost:8000/ws");

export default function Home() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  function sendMessage() {
    console.log(ws);
    ws.send("ahahahha");
  }

  ws.onopen = function (e) {
    console.log("Opened:", e);
  };

  ws.onmessage = function (e) {
    console.log("Message:", e.data);
  };

  ws.onclose = function (e) {
    console.log(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(function () {
      connect();
    }, 1000);
  };

  ws.onerror = function (err) {
    console.error("Socket encountered error: ", err.message, "Closing socket");
    ws.close();
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
}
