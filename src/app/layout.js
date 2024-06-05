import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import Header from "../components/header";
import { AuthContextProvider } from "@/contexts/auth";
import { PatientContextProvider } from "@/contexts/patient";
export const metadata = {
  title: "Create Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex-column flex-fill" style={{ minHeight: "100vh" }}>
        <AuthContextProvider>
          <PatientContextProvider>
            <Header />
            <main className="container">{children}</main>
          </PatientContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
