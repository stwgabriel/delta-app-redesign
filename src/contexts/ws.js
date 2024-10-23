"use client";
import { createContext, useContext, useEffect, useState } from "react";
const WebSocketContext = createContext();

let ws = null;

export const WebSocketContextProvider = ({ children }) => {
  // useEffect(() => {
  //   ws = new WebSocket(
  //     "wss://i2751iwn1e.execute-api.us-east-1.amazonaws.com/production"
  //   );

  //   ws.addEventListener("open", (event) => {
  //     console.log("WebSocket is open now.");
  //     ws.send(
  //       JSON.stringify({
  //         action: "authorization",
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6IkRPQ1RPUiIsInJlZnJlc2hfdG9rZW4iOiIxMWU0ZWFlZWZhNmQ1MTk2OTc3MjNlYTYyZDdmY2YwZjYyM2Y5NWViMWYyZTRiNzg0ODZhZTI3MGU0NGNhY2MzZDZmZTFlMzJkODEzOTkyYzNlY2UwYWQ1MWRiNWY5M2UwYmEyZmY0MjAxNjg1ZmY2MjBlNjRjMTQwOTNiZDBkNzE1OTYzODZlMGI2YmFhZDRjZDFhODE1MzliOGVlZjUwNTc4NDEyMWRjYThkZjQ5YTZlY2NkZjY0NDBmMzczODE1ODM0ZDZjNSIsInRva2VuIjoiZGU5OGE3ZTExYjg4M2I1N2MyNDEzMDg3YzQ0NjUzYzY1N2NkOTQyNTc1OWQzYTIxODY4MzFlMjkyMmQyYWMwMDYxZmQyMDU1ODRmZGRmMjQ5ODVkNmZlZjBlMzM5YmIzN2U1ZiIsInZhbGlkX3RvIjoiMjAyNC0xMC0yMFQxODoyNDoyNi4yNzc5NTMtMDM6MDAiLCJpc19hY3RpdmUiOnRydWUsInVzZXJfaWQiOiI1NTYyMWIzMy00YzE3LTQ3YzAtODdlYS00MWJjMDRhYjUyYjMiLCJob3NwaXRhbF9pZCI6ImM0NmVhODAyLTFhMzktNDRhMS1hOTdmLWE4MmNlYWEwNjk1ZiJ9.qUwLy3NWbsPwpgcTrrQ45VYTycU7rRV4_eTTFVNvGsk",
  //       })
  //     );
  //   });

  //   ws.addEventListener("message", (event) => {
  //     console.log("Message from server ", event.data);
  //     // Handle the incoming message here
  //   });

  //   ws.addEventListener("error", (event) => {
  //     console.error("WebSocket error observed:", event);
  //   });

  //   ws.addEventListener("close", (event) => {
  //     console.log("WebSocket is closed now.");
  //   });
  // }, []);

  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
