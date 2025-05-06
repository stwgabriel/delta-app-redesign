"use client"

import { useLanguage } from "@/components/language-provider"
import DoctorCard from "./doctor-card"

type Props = {
  currentDoctorSlug: string
}

export default function RelatedDoctors({ currentDoctorSlug }: Props) {
  const { language } = useLanguage()

  // Dados simulados de médicos relacionados
  const allDoctors = [
    {
      id: "dr-ana-silva",
      name: "Dra. Ana Silva",
      nameEn: "Dr. Ana Silva",
      specialty: "Neurologia Clínica",
      specialtyEn: "Clinical Neurology",
      image: "/placeholder.svg?height=300&width=300",
      related: ["dr-roberto-oliveira", "dra-mariana-costa"],
    },
    {
      id: "dr-carlos-santos",
      name: "Dr. Carlos Santos",
      nameEn: "Dr. Carlos Santos",
      specialty: "Neurologia Pediátrica",
      specialtyEn: "Pediatric Neurology",
      image: "/placeholder.svg?height=300&width=300",
      related: ["dr-ana-silva", "dr-roberto-oliveira"],
    },
    {
      id: "dra-mariana-costa",
      name: "Dra. Mariana Costa",
      nameEn: "Dr. Mariana Costa",
      specialty: "Cefaleia e Dor",
      specialtyEn: "Headache and Pain",
      image: "/placeholder.svg?height=300&width=300",
      related: ["dr-ana-silva", "dr-carlos-santos"],
    },
    {
      id: "dr-roberto-oliveira",
      name: "Dr. Roberto Oliveira",
      nameEn: "Dr. Roberto Oliveira",
      specialty: "Neurologia Cognitiva",
      specialtyEn: "Cognitive Neurology",
      image: "/placeholder.svg?height=300&width=300",
      related: ["dr-ana-silva", "dra-mariana-costa"],
    },
  ]

  // Encontrar o médico atual
  const currentDoctor = allDoctors.find((doctor) => doctor.id === currentDoctorSlug)

  if (!currentDoctor) {
    return null
  }

  // Obter médicos relacionados
  const relatedDoctors = allDoctors.filter((doctor) => currentDoctor.related.includes(doctor.id))

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          {language === "pt" ? "Outros Especialistas" : "Other Specialists"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {relatedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              nameEn={doctor.nameEn}
              specialty={doctor.specialty}
              specialtyEn={doctor.specialtyEn}
              image={doctor.image}
              compact={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

