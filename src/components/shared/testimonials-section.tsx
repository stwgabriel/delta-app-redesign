"use client"

import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const { language } = useLanguage()

  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      image: "/placeholder.svg?height=100&width=100",
      text: "O tratamento para enxaqueca crônica mudou minha vida. Após anos sofrendo com dores intensas, finalmente encontrei alívio com a abordagem personalizada do Instituto Delta.",
      textEn:
        "The treatment for chronic migraine changed my life. After years of suffering from intense pain, I finally found relief with Delta Institute's personalized approach.",
      rating: 5,
      service: "Cefaleia e Enxaqueca",
    },
    {
      id: 2,
      name: "João Pereira",
      image: "/placeholder.svg?height=100&width=100",
      text: "Meu pai foi diagnosticado com Alzheimer há dois anos. A equipe do Instituto Delta não apenas forneceu um tratamento excelente, mas também nos orientou sobre como lidar com a condição no dia a dia.",
      textEn:
        "My father was diagnosed with Alzheimer's two years ago. The Delta Institute team not only provided excellent treatment but also guided us on how to deal with the condition on a daily basis.",
      rating: 5,
      service: "Alzheimer e Demências",
    },
    {
      id: 3,
      name: "Ana Oliveira",
      image: "/placeholder.svg?height=100&width=100",
      text: "Após meu AVC, estava muito preocupada com a recuperação. O programa de reabilitação neurológica do Instituto Delta foi fundamental para que eu recuperasse minha independência.",
      textEn:
        "After my stroke, I was very concerned about recovery. Delta Institute's neurological rehabilitation program was essential for me to regain my independence.",
      rating: 5,
      service: "AVC e Doenças Cerebrovasculares",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            {language === "pt" ? "O que nossos pacientes dizem" : "What our patients say"}
          </h2>
          <p className="text-lg text-gray-600">
            {language === "pt"
              ? "Conheça as experiências de pacientes que transformaram suas vidas com nossos tratamentos neurológicos."
              : "Learn about the experiences of patients who have transformed their lives with our neurological treatments."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-blue-50 rounded-xl p-6 shadow-sm relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-white rounded-full p-2 shadow-md">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {language === "pt" ? "Paciente: " : "Patient: "}
                    {testimonial.service}
                  </p>
                </div>
              </div>

              <blockquote className="text-gray-700 italic">
                "{language === "pt" ? testimonial.text : testimonial.textEn}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

