"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Puzzle, Hand, Microscope, Heart } from "lucide-react"

export default function DoctorsSpecialties() {
  const { language } = useLanguage()

  const specialties = [
    {
      title: "Neurologia Clínica",
      titleEn: "Clinical Neurology",
      description: "Diagnóstico e tratamento de doenças que afetam o sistema nervoso central e periférico.",
      descriptionEn: "Diagnosis and treatment of diseases affecting the central and peripheral nervous system.",
      icon: <Brain className="h-10 w-10 text-blue-700" />,
    },
    {
      title: "Neurologia Pediátrica",
      titleEn: "Pediatric Neurology",
      description: "Cuidados especializados para distúrbios neurológicos em crianças e adolescentes.",
      descriptionEn: "Specialized care for neurological disorders in children and adolescents.",
      icon: <Zap className="h-10 w-10 text-blue-700" />,
    },
    {
      title: "Neurologia Cognitiva",
      titleEn: "Cognitive Neurology",
      description: "Foco em distúrbios que afetam a memória, atenção, linguagem e outras funções cognitivas.",
      descriptionEn: "Focus on disorders affecting memory, attention, language, and other cognitive functions.",
      icon: <Puzzle className="h-10 w-10 text-blue-700" />,
    },
    {
      title: "Cefaleia e Dor",
      titleEn: "Headache and Pain",
      description: "Tratamento especializado para diferentes tipos de dores de cabeça e dores neuropáticas.",
      descriptionEn: "Specialized treatment for different types of headaches and neuropathic pain.",
      icon: <Hand className="h-10 w-10 text-blue-700" />,
    },
    {
      title: "Doenças Neurodegenerativas",
      titleEn: "Neurodegenerative Diseases",
      description: "Cuidados para condições como Alzheimer, Parkinson e Esclerose Múltipla.",
      descriptionEn: "Care for conditions such as Alzheimer's, Parkinson's, and Multiple Sclerosis.",
      icon: <Microscope className="h-10 w-10 text-blue-700" />,
    },
    {
      title: "Neurologia Vascular",
      titleEn: "Vascular Neurology",
      description: "Prevenção, diagnóstico e tratamento de doenças cerebrovasculares como AVC.",
      descriptionEn: "Prevention, diagnosis, and treatment of cerebrovascular diseases such as stroke.",
      icon: <Heart className="h-10 w-10 text-blue-700" />,
    },
  ]

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            {language === "pt" ? "Nossas Especialidades" : "Our Specialties"}
          </h2>
          <p className="text-lg text-gray-700">
            {language === "pt"
              ? "Contamos com especialistas em diversas áreas da neurologia para oferecer o melhor atendimento."
              : "We have specialists in various areas of neurology to offer the best care."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">{specialty.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      {language === "pt" ? specialty.title : specialty.titleEn}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === "pt" ? specialty.description : specialty.descriptionEn}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

