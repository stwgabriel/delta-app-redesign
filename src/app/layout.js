import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import Header from "../components/header";
import { AuthContextProvider } from "@/contexts/auth";
import { DataContextProvider } from "@/contexts/data";
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
          <AuthContextProvider>
            <DataContextProvider>
              <WebSocketContextProvider>
                <Header />
                <main className="container">{children}</main>
              </WebSocketContextProvider>
            </DataContextProvider>
          </AuthContextProvider>
        </APIContextProvider>
      </body>
    </html>
  );
}
