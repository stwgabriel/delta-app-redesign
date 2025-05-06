"use client"

import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function DoctorsBanner() {
  const { language } = useLanguage()

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24 md:py-36">
      <div className="absolute inset-0 opacity-20">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Background" fill className="object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {language === "pt" ? "Nossa Equipe Médica" : "Our Medical Team"}
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            {language === "pt"
              ? "Conheça os especialistas que fazem do Instituto Delta referência em neurologia"
              : "Meet the specialists who make Delta Institute a reference in neurology"}
          </p>
          <p className="text-lg text-blue-100">
            {language === "pt"
              ? "Nossa equipe é formada por profissionais altamente qualificados e especializados em diferentes áreas da neurologia."
              : "Our team consists of highly qualified professionals specialized in different areas of neurology."}
          </p>
        </div>
      </div>
    </section>
  )
}

