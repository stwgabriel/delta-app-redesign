"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Treatments() {
  const { t } = useLanguage()

  const treatments = [
    {
      id: "cefaleia",
      title: "Cefaleia e Enxaqueca",
      description: "Diagnóstico e tratamento de diferentes tipos de dores de cabeça, incluindo enxaquecas crônicas."
    },
    {
      id: "epilepsia",
      title: "Epilepsia",
      description:
        "Avaliação, diagnóstico e controle de crises epilépticas com abordagens medicamentosas e não medicamentosas."
    },
    {
      id: "alzheimer",
      title: "Alzheimer e Demências",
      description:
        "Diagnóstico precoce e tratamento de Alzheimer e outros tipos de demência, com foco na preservação cognitiva."
    },
    {
      id: "parkinson",
      title: "Doença de Parkinson",
      description: "Tratamento especializado para controle dos sintomas motores e não motores da doença de Parkinson."
    },
    {
      id: "esclerose",
      title: "Esclerose Múltipla",
      description:
        "Acompanhamento e tratamento de pacientes com esclerose múltipla, visando retardar a progressão da doença."
    },
    {
      id: "avc",
      title: "AVC e Doenças Cerebrovasculares",
      description: "Prevenção, tratamento agudo e reabilitação de pacientes que sofreram AVC ou apresentam risco."
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{t("treatments.title")}</h2>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Oferecemos tratamentos especializados para diversas condições neurológicas, com abordagens personalizadas para
          cada paciente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{treatment.title}</h3>
              <p className="text-gray-600 mb-4">{treatment.description}</p>
              <Link href={`/servicos/${treatment.id}`}>
                <Button variant="link" className="text-blue-600 p-0 h-auto font-medium">
                  Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/servicos">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white">Ver Todos os Tratamentos</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

