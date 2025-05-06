"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Video, User, CreditCard } from "lucide-react"

export default function AppointmentTypes() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{t("appointments.title")}</h2>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Oferecemos diferentes modalidades de atendimento para melhor atender às suas necessidades.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <User className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Consulta Presencial</h3>
            <p className="text-gray-600 mb-6">
              Atendimento completo em nosso consultório, com avaliação detalhada e personalizada.
            </p>
            <Link href="/contato">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white w-full">Agendar Consulta</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Video className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Telemedicina</h3>
            <p className="text-gray-600 mb-6">
              Consulta online com a mesma qualidade do atendimento presencial, no conforto da sua casa.
            </p>
            <Link href="/contato">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white w-full">Agendar Teleconsulta</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <CreditCard className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Convênios</h3>
            <p className="text-gray-600 mb-6">
              Trabalhamos com os principais convênios médicos para facilitar seu acesso ao tratamento.
            </p>
            <Link href="/convenios">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white w-full">Ver Convênios</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

