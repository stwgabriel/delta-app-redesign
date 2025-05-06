"use client"

import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function Approach() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">{t("approach.title")}</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Nossa abordagem"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-8">
            <p className="text-lg text-gray-700 mb-6">{t("approach.description")}</p>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Avaliação Completa</h3>
                  <p className="text-gray-600">
                    Realizamos uma avaliação detalhada, considerando histórico médico, sintomas e exames complementares
                    para um diagnóstico preciso.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Plano Personalizado</h3>
                  <p className="text-gray-600">
                    Desenvolvemos um plano de tratamento individualizado, adaptado às necessidades específicas de cada
                    paciente.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Acompanhamento Contínuo</h3>
                  <p className="text-gray-600">
                    Oferecemos acompanhamento regular para monitorar o progresso, ajustar o tratamento quando necessário
                    e garantir os melhores resultados.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
                    4
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Suporte Integral</h3>
                  <p className="text-gray-600">
                    Fornecemos suporte abrangente, incluindo orientações para familiares e cuidadores, para promover o
                    bem-estar completo do paciente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

