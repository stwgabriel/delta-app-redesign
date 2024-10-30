"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAPIContext } from "./api";
const WebSocketContext = createContext();

let ws;
let listeners = {};
export const WebSocketContextProvider = ({ children }) => {
  const { isTokensLoaded, _getValidUserToken } = useAPIContext();

  const [isReady, setIsReady] = useState(false);
  const [ws, setWs] = useState(null);
  // const [listeners, setListeners] = useState({});

  // useEffect(() => {
  //   console.log(listeners);
  // }, [listeners]);

  useEffect(() => {
    if (!isTokensLoaded) return;
    const socket = new WebSocket(
      "wss://i2751iwn1e.execute-api.us-east-1.amazonaws.com/production"
    );

    setWs(socket);
    socket.addEventListener("open", () => {
      if (socket.readyState === WebSocket.OPEN) {
        _getValidUserToken()
          .then((token) => {
            socket.send(
              JSON.stringify({
                action: "login",
                token,
              })
            );
            setIsReady(true);
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        console.warn("Connection not open yet");
      }
    });

    socket.addEventListener("message", (x) => handleIncomingMessage(x));

    socket.addEventListener("error", console.error);
  }, [isTokensLoaded]);

  function handleIncomingMessage(event) {
    const eventData = JSON.parse(event.data);
    const action = eventData["action"];
    const current_listeners = listeners[action] || [];
    if (current_listeners.length > 0) {
      current_listeners.forEach((callback) => {
        callback(eventData);
      });
    } else {
      console.log("No one to listen to event", action);
    }
  }

  function emit(action, content) {
    console.log("sending...", action, content);
    ws.send(
      JSON.stringify({
        action,
        content,
      })
    );
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
    <WebSocketContext.Provider value={{ isReady, emit, addEventListener }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
