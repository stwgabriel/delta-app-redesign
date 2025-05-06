"use client"

import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function ServicesBanner() {
  const { t, language } = useLanguage()

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24 md:py-36">
      <div className="absolute inset-0 opacity-20">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Background" fill className="object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {language === "pt" ? "Nossos Serviços" : "Our Services"}
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            {language === "pt"
              ? "Tratamentos neurológicos especializados com abordagem multidisciplinar"
              : "Specialized neurological treatments with a multidisciplinary approach"}
          </p>
          <p className="text-lg text-blue-100">
            {language === "pt"
              ? "Oferecemos diagnóstico preciso e tratamentos personalizados para diversas condições neurológicas."
              : "We offer accurate diagnosis and personalized treatments for various neurological conditions."}
          </p>
        </div>
      </div>
    </section>
  )
}

