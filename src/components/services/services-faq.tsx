"use client"

import { useLanguage } from "@/components/language-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ServicesFAQ() {
  const { language } = useLanguage()

  const faqs = [
    {
      question: "Quanto tempo dura uma consulta neurológica?",
      questionEn: "How long does a neurological consultation last?",
      answer:
        "A primeira consulta geralmente dura cerca de 1 hora, pois inclui uma avaliação completa, histórico médico detalhado e exame neurológico. As consultas de retorno costumam durar cerca de 30 minutos.",
      answerEn:
        "The first consultation usually lasts about 1 hour, as it includes a complete assessment, detailed medical history, and neurological examination. Return consultations usually last about 30 minutes.",
    },
    {
      question: "Preciso trazer exames anteriores para a consulta?",
      questionEn: "Do I need to bring previous exams to the consultation?",
      answer:
        "Sim, é altamente recomendável trazer todos os exames neurológicos anteriores (como ressonância magnética, tomografia, eletroencefalograma), relatórios médicos e lista de medicamentos em uso. Isso ajuda o neurologista a ter uma visão mais completa do seu caso e evita a repetição desnecessária de exames.",
      answerEn:
        "Yes, it is highly recommended to bring all previous neurological exams (such as MRI, CT scan, electroencephalogram), medical reports, and a list of medications in use. This helps the neurologist to have a more complete view of your case and avoids unnecessary repetition of exams.",
    },
    {
      question: "O Instituto Delta aceita convênios médicos?",
      questionEn: "Does Delta Institute accept health insurance?",
      answer:
        "Sim, trabalhamos com os principais convênios médicos. Recomendamos que entre em contato com nossa central de atendimento para verificar se o seu plano de saúde está entre os conveniados e obter informações sobre cobertura específica para procedimentos e exames.",
      answerEn:
        "Yes, we work with major health insurance plans. We recommend that you contact our service center to check if your health plan is among those affiliated and to obtain information about specific coverage for procedures and exams.",
    },
    {
      question: "Como devo me preparar para uma consulta neurológica?",
      questionEn: "How should I prepare for a neurological consultation?",
      answer:
        "Para aproveitar ao máximo sua consulta, recomendamos: 1) Fazer uma lista dos sintomas, incluindo quando começaram e o que os melhora ou piora; 2) Anotar todas as suas dúvidas; 3) Trazer uma lista de todos os medicamentos que você utiliza (incluindo suplementos e medicamentos sem receita); 4) Trazer exames anteriores; 5) Se possível, vir acompanhado de um familiar ou amigo que possa ajudar a fornecer informações adicionais.",
      answerEn:
        "To make the most of your consultation, we recommend: 1) Make a list of symptoms, including when they started and what makes them better or worse; 2) Write down all your questions; 3) Bring a list of all medications you use (including supplements and over-the-counter medications); 4) Bring previous exams; 5) If possible, come accompanied by a family member or friend who can help provide additional information.",
    },
    {
      question: "É possível fazer consultas de telemedicina?",
      questionEn: "Is it possible to have telemedicine consultations?",
      answer:
        "Sim, o Instituto Delta oferece consultas por telemedicina para casos selecionados, como retornos, segunda opinião e orientações gerais. No entanto, para a primeira consulta e para avaliações que exigem exame físico neurológico detalhado, recomendamos o atendimento presencial para garantir um diagnóstico mais preciso.",
      answerEn:
        "Yes, Delta Institute offers telemedicine consultations for selected cases, such as returns, second opinions, and general guidance. However, for the first consultation and for evaluations that require detailed neurological physical examination, we recommend in-person care to ensure a more accurate diagnosis.",
    },
  ]

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            {language === "pt" ? "Perguntas Frequentes" : "Frequently Asked Questions"}
          </h2>

          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 text-left text-blue-800 hover:text-blue-600 font-medium">
                  {language === "pt" ? faq.question : faq.questionEn}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-700">
                  {language === "pt" ? faq.answer : faq.answerEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

