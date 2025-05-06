"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

export default function DoctorsList() {
  const { language } = useLanguage()

  const doctors = [
    {
      id: "dr-ana-silva",
      name: "Dra. Ana Silva",
      nameEn: "Dr. Ana Silva",
      specialty: "Neurologia Clínica",
      specialtyEn: "Clinical Neurology",
      image: "/placeholder.svg?height=400&width=400",
      shortBio: "Especialista em doenças neurodegenerativas com mais de 15 anos de experiência.",
      shortBioEn: "Specialist in neurodegenerative diseases with over 15 years of experience.",
      rating: 5,
      reviews: 48,
    },
    {
      id: "dr-carlos-santos",
      name: "Dr. Carlos Santos",
      nameEn: "Dr. Carlos Santos",
      specialty: "Neurologia Pediátrica",
      specialtyEn: "Pediatric Neurology",
      image: "/placeholder.svg?height=400&width=400",
      shortBio: "Dedicado ao diagnóstico e tratamento de distúrbios neurológicos em crianças e adolescentes.",
      shortBioEn: "Dedicated to the diagnosis and treatment of neurological disorders in children and adolescents.",
      rating: 5,
      reviews: 36,
    },
    {
      id: "dra-mariana-costa",
      name: "Dra. Mariana Costa",
      nameEn: "Dr. Mariana Costa",
      specialty: "Cefaleia e Dor",
      specialtyEn: "Headache and Pain",
      image: "/placeholder.svg?height=400&width=400",
      shortBio: "Especializada no tratamento de enxaquecas e dores crônicas de origem neurológica.",
      shortBioEn: "Specialized in the treatment of migraines and chronic pain of neurological origin.",
      rating: 5,
      reviews: 42,
    },
    {
      id: "dr-roberto-oliveira",
      name: "Dr. Roberto Oliveira",
      nameEn: "Dr. Roberto Oliveira",
      specialty: "Neurologia Cognitiva",
      specialtyEn: "Cognitive Neurology",
      image: "/placeholder.svg?height=400&width=400",
      shortBio: "Foco em distúrbios cognitivos, memória e demências, incluindo Alzheimer.",
      shortBioEn: "Focus on cognitive disorders, memory, and dementias, including Alzheimer's.",
      rating: 5,
      reviews: 39,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            {language === "pt" ? "Conheça Nossos Especialistas" : "Meet Our Specialists"}
          </h2>
          <p className="text-lg text-gray-700">
            {language === "pt"
              ? "Nossa equipe é formada por profissionais altamente qualificados, com formação nas melhores instituições do Brasil e do exterior."
              : "Our team consists of highly qualified professionals, trained at the best institutions in Brazil and abroad."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative h-80 w-full">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 shadow-md flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{doctor.rating}.0</span>
                  <span className="text-xs text-gray-500 ml-1">({doctor.reviews})</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-1">
                  {language === "pt" ? doctor.name : doctor.nameEn}
                </h3>
                <p className="text-aqua-600 font-medium mb-3">
                  {language === "pt" ? doctor.specialty : doctor.specialtyEn}
                </p>
                <p className="text-gray-600 mb-4 text-sm min-h-[60px]">
                  {language === "pt" ? doctor.shortBio : doctor.shortBioEn}
                </p>
                <Link href={`/profissionais/${doctor.id}`}>
                  <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                    {language === "pt" ? "Ver Perfil" : "View Profile"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

