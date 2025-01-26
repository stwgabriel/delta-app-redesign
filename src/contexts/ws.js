"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAPIContext } from "./api";
import { uuidv4 } from "@/utils/funcs";
import { get_socket_host } from "@/utils/variables";
const WebSocketContext = createContext();

let listeners = {};
let response_waitings = {};
let ws;

export const WebSocketContextProvider = ({ children }) => {
  const { isTokenLoaded, _getValidToken, _token } = useAPIContext();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (ws) return;
    // ws = new WebSocket(get_socket_host());

    // ws.addEventListener("open", handleOpenConnection);
    // ws.addEventListener("message", handleIncomingMessage);
    // ws.addEventListener("error", console.error);
  }, []);

  function handleOpenConnection(event) {
    if (event.currentTarget.readyState === WebSocket.OPEN) {
      setIsReady(true);
    } else {
      console.warn("Connection not open yet");
    }
  }

  useEffect(() => {
    // Login in / change login whenever token changed
    if (!isReady) return;
    if (!isTokenLoaded) return;
    login().catch(console.warn);
  }, [isReady, isTokenLoaded, _token]);

  function login() {
    return new Promise((resolve, reject) => {
      _getValidToken()
        .then((token) => {
          emit("login", { token });
          console.log("Logging in socket");
          resolve();
        })
        .catch((x) => {
          if (x === "No token") {
            console.log("No token to login on websockets");
            resolve();
          } else {
            console.warn(x);
            reject(x);
          }
        });
    });
  }

  function handleIncomingMessage(event) {
    const eventData = JSON.parse(event.data);
    if ("request_id" in eventData) {
      const request_id = eventData["request_id"];
      const prom = response_waitings[request_id];
      delete response_waitings[request_id];
      prom[0](JSON.parse(event.data), event);
    } else {
      const action = eventData["action"];
      const current_listeners = listeners[action] || [];
      if (current_listeners.length > 0) {
        current_listeners.forEach((callback) => {
          callback(eventData);
        });
      } else {
        console.warn("No one to listen to event", action, eventData, event);
      }
    }
  }

  function emit(action, content, configs = {}) {
    console.log("Sockets sending message...");
    _getValidToken()
      .then((token) =>
        ws.send(
          JSON.stringify({
            action,
            token,
            content,
            ...configs,
          })
        )
      )
      .catch(console.error);
  }

  function emitAwait(action, content) {
    return new Promise((resolve, reject) => {
      const request_id = uuidv4();
      const configs = { request_id };
      response_waitings[request_id] = [resolve, reject];
      emit(action, content, configs);
    });
  }

  function addEventListener(eventName, callback) {
    listeners = {
      ...listeners,
      [eventName]: [...(listeners[eventName] || []), callback],
    };
  }

  return (
    <WebSocketContext.Provider value={{ isReady, emit, addEventListener, emitAwait }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
