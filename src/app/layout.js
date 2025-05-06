import "../global.css";

import { WebSocketContextProvider } from "@/contexts/ws";
import { APIContextProvider } from "@/contexts/api";
import { Suspense } from "react";
import { ClientNotificationContextProvider } from "@/contexts/client_notification";
import { ModalContextProvider } from "@/contexts/modal";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export const metadata = {
  title: "Instituto Delta",
};

const dmSansFont = DM_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>

      <body
        className={cn(
          "flex flex-col h-full",
          dmSansFont.className
        )}
        style={{ minHeight: "100vh" }}
      >
        <Suspense fallback={<div className="flex flex-col gap-4 items-center justify-center h-screen">
          <img src="/logo.png" alt="logo" className="w-10 h-10 animate-pulse" />
          <Loader className="size-4 animate-spin" />
          <span className="sr-only">Carregando</span>
        </div>
        }>
          <APIContextProvider>
            <WebSocketContextProvider>
              <ClientNotificationContextProvider>
                <ModalContextProvider>
                  <div className="flex flex-col w-screen h-screen overflow-auto">
                    {children}
                  </div>
                </ModalContextProvider>
              </ClientNotificationContextProvider>
            </WebSocketContextProvider>
          </APIContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
