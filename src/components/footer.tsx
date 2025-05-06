"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, MapPin, Phone, Calendar, Clock } from "lucide-react"

export default function Footer() {
  const { t, language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section with Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 border-b border-blue-700">
          <div className="bg-blue-700/30 rounded-lg p-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-aqua-400 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-semibold text-lg mb-2">{language === "pt" ? "Endereço" : "Address"}</h3>
                <p className="text-blue-100">
                  Av. Paulista, 1000 - Bela Vista
                  <br />
                  São Paulo - SP, 01310-100
                  <br />
                  Brasil
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-700/30 rounded-lg p-6">
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-aqua-400 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-semibold text-lg mb-2">{language === "pt" ? "Contato" : "Contact"}</h3>
                <p className="text-blue-100">
                  +55 (11) 3000-0000
                  <br />
                  +55 (11) 99000-0000 (WhatsApp)
                  <br />
                  <a href="mailto:contato@institutodelta.com.br" className="hover:text-white transition-colors">
                    contato@institutodelta.com.br
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-700/30 rounded-lg p-6">
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-aqua-400 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-semibold text-lg mb-2">
                  {language === "pt" ? "Horário de Atendimento" : "Opening Hours"}
                </h3>
                <p className="text-blue-100">
                  {language === "pt" ? "Segunda a Sexta" : "Monday to Friday"}: 8h - 19h
                  <br />
                  {language === "pt" ? "Sábado" : "Saturday"}: 8h - 12h
                  <br />
                  {language === "pt" ? "Domingo" : "Sunday"}: {language === "pt" ? "Fechado" : "Closed"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Instituto Delta</h3>
            <p className="text-blue-100">
              {language === "pt"
                ? "Excelência em diagnóstico e tratamento neurológico, com uma equipe de especialistas dedicados ao seu bem-estar."
                : "Excellence in neurological diagnosis and treatment, with a team of specialists dedicated to your well-being."}
            </p>

            <div className="flex space-x-4 pt-4">
              <Link href="#" className="text-blue-100 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{language === "pt" ? "Links Rápidos" : "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-blue-100 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-blue-100 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/profissionais" className="text-blue-100 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {t("nav.professionals")}
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-blue-100 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{language === "pt" ? "Nossos Serviços" : "Our Services"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicos/cefaleia" className="text-blue-100 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {language === "pt" ? "Cefaleia e Enxaqueca" : "Headache and Migraine"}
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/epilepsia"
                  className="text-blue-100 hover:text-white transition flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {language === "pt" ? "Epilepsia" : "Epilepsy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/alzheimer"
                  className="text-blue-100 hover:text-white transition flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {language === "pt" ? "Alzheimer e Demências" : "Alzheimer's and Dementias"}
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/parkinson"
                  className="text-blue-100 hover:text-white transition flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {language === "pt" ? "Doença de Parkinson" : "Parkinson's Disease"}
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/esclerose"
                  className="text-blue-100 hover:text-white transition flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-aqua-400 rounded-full mr-2"></span>
                  {language === "pt" ? "Esclerose Múltipla" : "Multiple Sclerosis"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Patient Area and CTA */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("nav.patientArea")}</h3>
            <p className="text-blue-100 mb-4">
              {language === "pt"
                ? "Acesse sua área exclusiva para visualizar resultados de exames, histórico de consultas e mais."
                : "Access your exclusive area to view exam results, appointment history, and more."}
            </p>
            <Button className="bg-aqua-500 hover:bg-aqua-600 text-white w-full">{t("nav.patientArea")}</Button>

            <div className="mt-6 pt-6 border-t border-blue-700">
              <Link href="/quiz">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  {language === "pt" ? "Agendar Consulta" : "Schedule Appointment"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8 text-center text-blue-200">
          <p>
            &copy; {currentYear} Instituto Delta. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  )
}

