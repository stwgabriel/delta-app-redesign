"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Props = {
  currentServiceSlug: string
}

export default function RelatedServices({ currentServiceSlug }: Props) {
  const { language } = useLanguage()

  // Dados simulados de serviços relacionados
  const allServices = [
    {
      id: "cefaleia",
      title: "Cefaleia e Enxaqueca",
      titleEn: "Headache and Migraine",
      description: "Diagnóstico e tratamento de diferentes tipos de dores de cabeça.",
      descriptionEn: "Diagnosis and treatment of different types of headaches.",
      related: ["epilepsia", "esclerose"],
    },
    {
      id: "epilepsia",
      title: "Epilepsia",
      titleEn: "Epilepsy",
      description: "Avaliação, diagnóstico e controle de crises epilépticas.",
      descriptionEn: "Assessment, diagnosis, and control of epileptic seizures.",
      related: ["cefaleia", "alzheimer"],
    },
    {
      id: "alzheimer",
      title: "Alzheimer e Demências",
      titleEn: "Alzheimer's and Dementias",
      description: "Diagnóstico precoce e tratamento de Alzheimer e outros tipos de demência.",
      descriptionEn: "Early diagnosis and treatment of Alzheimer's and other types of dementia.",
      related: ["parkinson", "epilepsia"],
    },
    {
      id: "parkinson",
      title: "Doença de Parkinson",
      titleEn: "Parkinson's Disease",
      description: "Tratamento especializado para controle dos sintomas da doença de Parkinson.",
      descriptionEn: "Specialized treatment for control of symptoms of Parkinson's disease.",
      related: ["alzheimer", "avc"],
    },
    {
      id: "esclerose",
      title: "Esclerose Múltipla",
      titleEn: "Multiple Sclerosis",
      description: "Acompanhamento e tratamento de pacientes com esclerose múltipla.",
      descriptionEn: "Monitoring and treatment of patients with multiple sclerosis.",
      related: ["cefaleia", "avc"],
    },
    {
      id: "avc",
      title: "AVC e Doenças Cerebrovasculares",
      titleEn: "Stroke and Cerebrovascular Diseases",
      description: "Prevenção, tratamento agudo e reabilitação de pacientes com AVC.",
      descriptionEn: "Prevention, acute treatment, and rehabilitation of stroke patients.",
      related: ["parkinson", "esclerose"],
    },
  ]

  // Encontrar o serviço atual
  const currentService = allServices.find((service) => service.id === currentServiceSlug)

  if (!currentService) {
    return null
  }

  // Obter serviços relacionados
  const relatedServices = allServices.filter((service) => currentService.related.includes(service.id))

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          {language === "pt" ? "Serviços Relacionados" : "Related Services"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {relatedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {language === "pt" ? service.title : service.titleEn}
              </h3>
              <p className="text-gray-600 mb-4">{language === "pt" ? service.description : service.descriptionEn}</p>
              <Link href={`/servicos/${service.id}`}>
                <Button variant="link" className="text-blue-600 p-0 h-auto font-medium">
                  {language === "pt" ? "Saiba mais" : "Learn more"} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

