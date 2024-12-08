import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import Header from "../components/header";
import { StateContextProvider } from "@/contexts/state";
import { WebSocketContextProvider } from "@/contexts/ws";
import { APIContextProvider } from "@/contexts/api";
import { Suspense } from "react";
export const metadata = {
  title: "Delta Stroke Inc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className="flex-column flex-fill" style={{ minHeight: "100vh" }}>
        <Suspense>
          <APIContextProvider>
            <StateContextProvider>
              <WebSocketContextProvider>
                <Header />
                <main className="container">{children}</main>
              </WebSocketContextProvider>
            </StateContextProvider>
          </APIContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
