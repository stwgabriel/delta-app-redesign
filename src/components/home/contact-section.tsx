"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, ClipboardList } from "lucide-react"

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{t("contact.title")}</h2>
        <p className="text-lg text-blue-100 mb-12 text-center max-w-3xl mx-auto">
          Estamos à disposição para esclarecer suas dúvidas e agendar sua consulta. Entre em contato conosco ou responda
          nosso quiz para identificarmos o especialista mais adequado para o seu caso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t("contact.form")}</h3>
            <p className="text-blue-100 mb-6">
              Preencha nosso formulário de contato para agendar uma consulta ou tirar dúvidas sobre nossos serviços.
            </p>
            <Link href="/contato">
              <Button className="bg-aqua-500 hover:bg-aqua-600 text-white w-full">Entrar em Contato</Button>
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-full mb-4">
              <ClipboardList className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t("contact.quiz")}</h3>
            <p className="text-blue-100 mb-6">
              Responda algumas perguntas para ajudarmos a identificar qual especialista é mais indicado para o seu caso.
            </p>
            <Link href="/quiz">
              <Button className="bg-aqua-500 hover:bg-aqua-600 text-white w-full">Fazer Quiz de Triagem</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

