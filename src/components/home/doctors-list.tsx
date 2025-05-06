"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function DoctorsList() {
  const { t } = useLanguage()

  const doctors = [
    {
      id: "dr-ana-silva",
      name: "Dra. Ana Silva",
      specialty: "Neurologia Clínica",
      image: "/placeholder.svg?height=300&width=300",
      description: "Especialista em doenças neurodegenerativas com mais de 15 anos de experiência.",
    },
    {
      id: "dr-carlos-santos",
      name: "Dr. Carlos Santos",
      specialty: "Neurologia Pediátrica",
      image: "/placeholder.svg?height=300&width=300",
      description: "Dedicado ao diagnóstico e tratamento de distúrbios neurológicos em crianças e adolescentes.",
    },
    {
      id: "dra-mariana-costa",
      name: "Dra. Mariana Costa",
      specialty: "Cefaleia e Dor",
      image: "/placeholder.svg?height=300&width=300",
      description: "Especializada no tratamento de enxaquecas e dores crônicas de origem neurológica.",
    },
    {
      id: "dr-roberto-oliveira",
      name: "Dr. Roberto Oliveira",
      specialty: "Neurologia Cognitiva",
      image: "/placeholder.svg?height=300&width=300",
      description: "Foco em distúrbios cognitivos, memória e demências, incluindo Alzheimer.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{t("doctors.title")}</h2>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Nossa equipe é formada por profissionais altamente qualificados e especializados em diferentes áreas da
          neurologia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-1">{doctor.name}</h3>
                <p className="text-aqua-600 font-medium mb-3">{doctor.specialty}</p>
                <p className="text-gray-600 mb-4 text-sm">{doctor.description}</p>
                <Link href={`/profissionais/${doctor.id}`}>
                  <Button className="bg-blue-800 hover:bg-blue-900 text-white w-full">Ver Perfil</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/profissionais">
            <Button variant="outline" className="border-blue-500 text-blue-800 hover:bg-blue-50">
              Conhecer Toda a Equipe
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

