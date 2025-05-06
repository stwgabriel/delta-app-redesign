"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  pt: {
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.services": "Serviços",
    "nav.professionals": "Profissionais",
    "nav.contact": "Contato",
    "nav.patientArea": "Área do Paciente",
    "hero.title": "Instituto Delta",
    "hero.subtitle": "Excelência em Neurologia",
    "hero.cta": "Agende sua Consulta",
    "mission.title": "Nossa Missão",
    "mission.description":
      "Oferecer atendimento neurológico de excelência, com foco no bem-estar e na qualidade de vida dos nossos pacientes.",
    "approach.title": "Como Atuamos",
    "approach.description":
      "Nossa abordagem integra diagnóstico preciso, tratamento personalizado e acompanhamento contínuo.",
    "treatments.title": "Tratamentos Oferecidos",
    "appointments.title": "Formas de Atendimento",
    "doctors.title": "Conheça Nossos Médicos",
    "contact.title": "Entre em Contato",
    "contact.form": "Formulário de Contato",
    "contact.quiz": "Quiz de Triagem",
    "footer.rights": "Todos os direitos reservados",
    "services.title": "Nossos Serviços",
    "services.subtitle": "Tratamentos neurológicos especializados",
    "services.cta": "Agende uma Consulta",
    "services.faq": "Perguntas Frequentes",
    "doctors.title": "Nossa Equipe Médica",
    "doctors.subtitle": "Especialistas em neurologia",
    "doctors.cta": "Agende uma Consulta",
    "quiz.title": "Quiz de Triagem",
    "quiz.subtitle": "Descubra qual especialista é mais indicado para você",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.professionals": "Professionals",
    "nav.contact": "Contact",
    "nav.patientArea": "Patient Area",
    "hero.title": "Delta Institute",
    "hero.subtitle": "Excellence in Neurology",
    "hero.cta": "Schedule an Appointment",
    "mission.title": "Our Mission",
    "mission.description":
      "To provide excellent neurological care, focusing on the well-being and quality of life of our patients.",
    "approach.title": "Our Approach",
    "approach.description":
      "Our approach integrates accurate diagnosis, personalized treatment, and continuous monitoring.",
    "treatments.title": "Treatments Offered",
    "appointments.title": "Appointment Types",
    "doctors.title": "Meet Our Doctors",
    "contact.title": "Contact Us",
    "contact.form": "Contact Form",
    "contact.quiz": "Screening Quiz",
    "footer.rights": "All rights reserved",
    "services.title": "Our Services",
    "services.subtitle": "Specialized neurological treatments",
    "services.cta": "Schedule an Appointment",
    "services.faq": "Frequently Asked Questions",
    "doctors.title": "Our Medical Team",
    "doctors.subtitle": "Specialists in neurology",
    "doctors.cta": "Schedule an Appointment",
    "quiz.title": "Screening Quiz",
    "quiz.subtitle": "Find out which specialist is best for you",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.pt] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

