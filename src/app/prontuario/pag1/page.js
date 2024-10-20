"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { useEffect } from "react";
import { useForm } from "@/contexts/form";
import SectionInformacoesBasicas from "./section_informacoes_basicas";
import SectionContraindicacoesAbsolutas from "./section_contraindicacoes_absolutas";
import SectionRankin from "./section_rankin";
import SectionComorbidades from "./section_comorbidades";
import SectionMedicamentosAnticoagulantes from "./section_medicamentos_anticoagulantes";
import SectionMedicamentos from "./section_medicamentos";

export default function ProntuarioPage1Page() {
  const router = useRouter();
  const {
    authInstituicao,
    authUsuario,
    loadedAuthUsuario,
    loadedAuthInstituicao,
  } = useAuthContext();

  // ---------------------------------------------------------------------------

  const myForm = useForm();

  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (loadedAuthInstituicao && authInstituicao === null) {
      router.push("/login/instituicao");
    }
    if (loadedAuthUsuario && authUsuario === null) {
      router.push("/login/usuario");
    }
  }, [loadedAuthUsuario, loadedAuthInstituicao]);

  return (
    <>
      <section className="flex-column my-4 align-items-center">
        <span className="fs-1">Prontuário</span>
      </section>
      <SectionInformacoesBasicas myForm={myForm} />

      <SectionContraindicacoesAbsolutas myForm={myForm} />

      <SectionRankin myForm={myForm} />

      <SectionMedicamentosAnticoagulantes myForm={myForm} />

      <SectionMedicamentos myForm={myForm} />

      <SectionComorbidades myForm={myForm} />

      <section className="flex-column mb-5">
        <button
          className="btn btn-primary"
          onClick={() => {
            router.push("/prontuario/pag2");
          }}
        >
          Enviar
        </button>
      </section>
    </>
  );
}
