import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import Header from "../components/header";
import { WebSocketContextProvider } from "@/contexts/ws";
import { APIContextProvider } from "@/contexts/api";
import { Suspense } from "react";
import Footer from "@/components/footer";
import { ClientNotificationContextProvider } from "@/contexts/client_notification";

export const metadata = {
  title: "Delta Stroke Inc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body className="d-flex container flex-column flex-fill" style={{ minHeight: "100vh" }}>
        <Suspense>
          <APIContextProvider>
            <WebSocketContextProvider>
              <ClientNotificationContextProvider>
                <Header />
                {children}
                <Footer />
              </ClientNotificationContextProvider>
            </WebSocketContextProvider>
          </APIContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
