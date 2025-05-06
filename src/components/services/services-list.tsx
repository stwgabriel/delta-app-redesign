"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Brain, Zap, Puzzle, Hand, Microscope, Heart } from "lucide-react"

export default function ServicesList() {
  const { language } = useLanguage()

  const services = [
    {
      id: "cefaleia",
      title: "Cefaleia e Enxaqueca",
      titleEn: "Headache and Migraine",
      description: "Diagnóstico e tratamento de diferentes tipos de dores de cabeça, incluindo enxaquecas crônicas.",
      descriptionEn: "Diagnosis and treatment of different types of headaches, including chronic migraines.",
      icon: <Brain className="h-10 w-10 text-blue-700" />,
      color: "bg-blue-50",
    },
    {
      id: "epilepsia",
      title: "Epilepsia",
      titleEn: "Epilepsy",
      description:
        "Avaliação, diagnóstico e controle de crises epilépticas com abordagens medicamentosas e não medicamentosas.",
      descriptionEn: "Assessment, diagnosis, and control of epileptic seizures with drug and non-drug approaches.",
      icon: <Zap className="h-10 w-10 text-blue-700" />,
      color: "bg-blue-50",
    },
    {
      id: "alzheimer",
      title: "Alzheimer e Demências",
      titleEn: "Alzheimer's and Dementias",
      description:
        "Diagnóstico precoce e tratamento de Alzheimer e outros tipos de demência, com foco na preservação cognitiva.",
      descriptionEn:
        "Early diagnosis and treatment of Alzheimer's and other types of dementia, focusing on cognitive preservation.",
      icon: <Puzzle className="h-10 w-10 text-blue-700" />,
      color: "bg-blue-50",
    },
    {
      id: "parkinson",
      title: "Doença de Parkinson",
      titleEn: "Parkinson's Disease",
      description: "Tratamento especializado para controle dos sintomas motores e não motores da doença de Parkinson.",
      descriptionEn: "Specialized treatment for control of motor and non-motor symptoms of Parkinson's disease.",
      icon: <Hand className="h-10 w-10 text-blue-700" />,
      color: "bg-blue-50",
    },
    {
      id: "esclerose",
      title: "Esclerose Múltipla",
      titleEn: "Multiple Sclerosis",
      description:
        "Acompanhamento e tratamento de pacientes com esclerose múltipla, visando retardar a progressão da doença.",
      descriptionEn:
        "Monitoring and treatment of patients with multiple sclerosis, aiming to delay disease progression.",
      icon: <Microscope className="h-10 w-10 text-blue-700" />,
      color: "bg-blue-50",
    },
    {
      id: "avc",
      title: "AVC e Doenças Cerebrovasculares",
      titleEn: "Stroke and Cerebrovascular Diseases",
      description: "Prevenção, tratamento agudo e reabilitação de pacientes que sofreram AVC ou apresentam risco.",
      descriptionEn:
        "Prevention, acute treatment, and rehabilitation of patients who have suffered a stroke or are at risk.",
      icon: <Heart className="h-10 w-10 text-blue-700" />,
      color: "bg-blue-50",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="border-2 border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className={`${service.color} rounded-t-lg p-6`}>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-bold text-blue-900">
                  {language === "pt" ? service.title : service.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-700 text-base min-h-[80px]">
                  {language === "pt" ? service.description : service.descriptionEn}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/servicos/${service.id}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
                  >
                    {language === "pt" ? "Saiba mais" : "Learn more"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-50 rounded-full px-6 py-3 text-blue-800 font-medium">
            {language === "pt" ? "Não encontrou o que procura?" : "Didn't find what you're looking for?"}
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mt-4 mb-6">
            {language === "pt"
              ? "Oferecemos tratamentos para diversas outras condições neurológicas"
              : "We offer treatments for many other neurological conditions"}
          </h3>
          <Link href="/contato">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white px-8">
              {language === "pt" ? "Entre em contato" : "Contact us"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

