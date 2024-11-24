import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import Header from "../components/header";
import { StateContextProvider } from "@/contexts/state";
import { WebSocketContextProvider } from "@/contexts/ws";
import { APIContextProvider } from "@/contexts/api";
export const metadata = {
  title: "Delta Stroke Inc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex-column flex-fill" style={{ minHeight: "100vh" }}>
        <APIContextProvider>
          <StateContextProvider>
            <WebSocketContextProvider>
              <Header />
              <main className="container">{children}</main>
            </WebSocketContextProvider>
          </StateContextProvider>
        </APIContextProvider>
      </body>
    </html>
  );
}
