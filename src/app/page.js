"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { authInstituicao, authUsuario } = useAuthContext();

  useEffect(() => {
    if (authInstituicao === null) {
      router.push("/login/instituicao");
    }

    if (authUsuario === null) {
      router.push("/login/usuario");
    }
  }, []);

  return (
    <>
      <section className="flex-column align-items-center mt-5">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => router.push("/prontuario/pag1")}
        >
          IR PARA ATENDIMENTO
        </button>
      </section>
    </>
  );
}
