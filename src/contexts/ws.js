"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAPIContext } from "./api";
import { uuidv4 } from "@/utils/funcs";
const WebSocketContext = createContext();

let listeners = {};
let response_waitings = {};
let ws;

export const WebSocketContextProvider = ({ children }) => {
  const { isTokensLoaded, _getValidUserToken } = useAPIContext();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isTokensLoaded) return;
    ws = new WebSocket(
      "wss://i2751iwn1e.execute-api.us-east-1.amazonaws.com/production"
    );

    ws.addEventListener("open", handleOpenConnection);
    ws.addEventListener("message", handleIncomingMessage);
    ws.addEventListener("error", console.error);
  }, [isTokensLoaded]);

  function handleOpenConnection(event) {
    console.log(ws);
    if (event.currentTarget.readyState === WebSocket.OPEN) {
      _getValidUserToken()
        .then((token) => {
          emit("login", { token });
          setIsReady(true);
        })
        .catch(console.error);
    } else {
      console.warn("Connection not open yet");
    }
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
    console.log("sending...", action, content);
    _getValidUserToken()
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
    // console.log(eventName, callback);
    // setListeners((oldListeners) => {
    //   return {
    //     ...oldListeners,
    //     [eventName]: [...(oldListeners[eventName] || []), callback],
    //   };
    // });

    listeners = {
      ...listeners,
      [eventName]: [...(listeners[eventName] || []), callback],
    };
  }

  return (
    <WebSocketContext.Provider
      value={{ isReady, emit, addEventListener, emitAwait }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
