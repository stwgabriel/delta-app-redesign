"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function QuizForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    mainSymptom: "",
    symptoms: [] as string[],
    duration: "",
    frequency: "",
    intensity: "",
    previousTreatment: "",
    medications: "",
    medicalHistory: "",
    name: "",
    email: "",
    phone: "",
  })

  const [result, setResult] = useState<{
    doctorId: string
    doctorName: string
    specialty: string
    image: string
  } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, symptoms: [...prev.symptoms, value] }
      } else {
        return { ...prev, symptoms: prev.symptoms.filter((s) => s !== value) }
      }
    })
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Lógica simulada para determinar o especialista mais adequado
    // Em um caso real, isso seria feito no servidor com base em um algoritmo mais complexo
    let doctorId = "dr-ana-silva"
    let doctorName = "Dra. Ana Silva"
    let specialty = "Neurologia Clínica"
    const image = "/placeholder.svg?height=300&width=300"

    if (formData.mainSymptom === "dor_cabeca") {
      doctorId = "dra-mariana-costa"
      doctorName = "Dra. Mariana Costa"
      specialty = "Cefaleia e Dor"
    } else if (formData.age === "menor_18") {
      doctorId = "dr-carlos-santos"
      doctorName = "Dr. Carlos Santos"
      specialty = "Neurologia Pediátrica"
    } else if (formData.mainSymptom === "memoria" || formData.symptoms.includes("esquecimento")) {
      doctorId = "dr-roberto-oliveira"
      doctorName = "Dr. Roberto Oliveira"
      specialty = "Neurologia Cognitiva"
    }

    setResult({
      doctorId,
      doctorName,
      specialty,
      image,
    })

    nextStep()
  }

  return (
    <Card className="shadow-lg border-2 border-gray-100">
      <CardContent className="p-6 md:p-8">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-6">Informações Básicas</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-base">Faixa Etária</Label>
                <RadioGroup
                  value={formData.age}
                  onValueChange={(value) => handleRadioChange("age", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="menor_18" id="menor_18" />
                    <Label htmlFor="menor_18" className="font-normal">
                      Menor de 18 anos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="18_30" id="18_30" />
                    <Label htmlFor="18_30" className="font-normal">
                      18 a 30 anos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="31_50" id="31_50" />
                    <Label htmlFor="31_50" className="font-normal">
                      31 a 50 anos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="51_65" id="51_65" />
                    <Label htmlFor="51_65" className="font-normal">
                      51 a 65 anos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="acima_65" id="acima_65" />
                    <Label htmlFor="acima_65" className="font-normal">
                      Acima de 65 anos
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">Gênero</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleRadioChange("gender", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino" className="font-normal">
                      Feminino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino" className="font-normal">
                      Masculino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outro" id="outro" />
                    <Label htmlFor="outro" className="font-normal">
                      Outro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefiro_nao_dizer" id="prefiro_nao_dizer" />
                    <Label htmlFor="prefiro_nao_dizer" className="font-normal">
                      Prefiro não dizer
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={nextStep}
                  disabled={!formData.age || !formData.gender}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-6">Sintomas</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-base">Qual é o principal sintoma que te trouxe ao neurologista?</Label>
                <RadioGroup
                  value={formData.mainSymptom}
                  onValueChange={(value) => handleRadioChange("mainSymptom", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dor_cabeca" id="dor_cabeca" />
                    <Label htmlFor="dor_cabeca" className="font-normal">
                      Dor de cabeça
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tontura" id="tontura" />
                    <Label htmlFor="tontura" className="font-normal">
                      Tontura ou vertigem
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="convulsao" id="convulsao" />
                    <Label htmlFor="convulsao" className="font-normal">
                      Convulsão ou desmaio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tremor" id="tremor" />
                    <Label htmlFor="tremor" className="font-normal">
                      Tremor ou movimentos involuntários
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="memoria" id="memoria" />
                    <Label htmlFor="memoria" className="font-normal">
                      Problemas de memória ou cognição
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formigamento" id="formigamento" />
                    <Label htmlFor="formigamento" className="font-normal">
                      Formigamento ou dormência
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fraqueza" id="fraqueza" />
                    <Label htmlFor="fraqueza" className="font-normal">
                      Fraqueza muscular
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outro" id="outro_sintoma" />
                    <Label htmlFor="outro_sintoma" className="font-normal">
                      Outro
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">
                  Você apresenta algum destes sintomas adicionais? (Selecione todos que se aplicam)
                </Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nausea"
                      checked={formData.symptoms.includes("nausea")}
                      onCheckedChange={(checked) => handleCheckboxChange("nausea", checked as boolean)}
                    />
                    <Label htmlFor="nausea" className="font-normal">
                      Náusea ou vômito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sensibilidade_luz"
                      checked={formData.symptoms.includes("sensibilidade_luz")}
                      onCheckedChange={(checked) => handleCheckboxChange("sensibilidade_luz", checked as boolean)}
                    />
                    <Label htmlFor="sensibilidade_luz" className="font-normal">
                      Sensibilidade à luz ou som
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="alteracao_visual"
                      checked={formData.symptoms.includes("alteracao_visual")}
                      onCheckedChange={(checked) => handleCheckboxChange("alteracao_visual", checked as boolean)}
                    />
                    <Label htmlFor="alteracao_visual" className="font-normal">
                      Alterações visuais
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dificuldade_fala"
                      checked={formData.symptoms.includes("dificuldade_fala")}
                      onCheckedChange={(checked) => handleCheckboxChange("dificuldade_fala", checked as boolean)}
                    />
                    <Label htmlFor="dificuldade_fala" className="font-normal">
                      Dificuldade para falar
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="desequilibrio"
                      checked={formData.symptoms.includes("desequilibrio")}
                      onCheckedChange={(checked) => handleCheckboxChange("desequilibrio", checked as boolean)}
                    />
                    <Label htmlFor="desequilibrio" className="font-normal">
                      Desequilíbrio ao andar
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="esquecimento"
                      checked={formData.symptoms.includes("esquecimento")}
                      onCheckedChange={(checked) => handleCheckboxChange("esquecimento", checked as boolean)}
                    />
                    <Label htmlFor="esquecimento" className="font-normal">
                      Esquecimento frequente
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="alteracao_sono"
                      checked={formData.symptoms.includes("alteracao_sono")}
                      onCheckedChange={(checked) => handleCheckboxChange("alteracao_sono", checked as boolean)}
                    />
                    <Label htmlFor="alteracao_sono" className="font-normal">
                      Alterações no sono
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ansiedade_depressao"
                      checked={formData.symptoms.includes("ansiedade_depressao")}
                      onCheckedChange={(checked) => handleCheckboxChange("ansiedade_depressao", checked as boolean)}
                    />
                    <Label htmlFor="ansiedade_depressao" className="font-normal">
                      Ansiedade ou depressão
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="border-blue-200 text-blue-700">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button onClick={nextStep} disabled={!formData.mainSymptom} className="bg-blue-800 hover:bg-blue-900">
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-6">Detalhes dos Sintomas</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-base">Há quanto tempo você apresenta o sintoma principal?</Label>
                <RadioGroup
                  value={formData.duration}
                  onValueChange={(value) => handleRadioChange("duration", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="menos_1_semana" id="menos_1_semana" />
                    <Label htmlFor="menos_1_semana" className="font-normal">
                      Menos de 1 semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1_4_semanas" id="1_4_semanas" />
                    <Label htmlFor="1_4_semanas" className="font-normal">
                      1 a 4 semanas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1_6_meses" id="1_6_meses" />
                    <Label htmlFor="1_6_meses" className="font-normal">
                      1 a 6 meses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6_12_meses" id="6_12_meses" />
                    <Label htmlFor="6_12_meses" className="font-normal">
                      6 a 12 meses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mais_1_ano" id="mais_1_ano" />
                    <Label htmlFor="mais_1_ano" className="font-normal">
                      Mais de 1 ano
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">Com que frequência o sintoma ocorre?</Label>
                <RadioGroup
                  value={formData.frequency}
                  onValueChange={(value) => handleRadioChange("frequency", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="diariamente" id="diariamente" />
                    <Label htmlFor="diariamente" className="font-normal">
                      Diariamente
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="semanalmente" id="semanalmente" />
                    <Label htmlFor="semanalmente" className="font-normal">
                      Semanalmente
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mensalmente" id="mensalmente" />
                    <Label htmlFor="mensalmente" className="font-normal">
                      Mensalmente
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="raramente" id="raramente" />
                    <Label htmlFor="raramente" className="font-normal">
                      Raramente
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="constante" id="constante" />
                    <Label htmlFor="constante" className="font-normal">
                      É constante
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">Qual a intensidade do sintoma?</Label>
                <RadioGroup
                  value={formData.intensity}
                  onValueChange={(value) => handleRadioChange("intensity", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="leve" id="leve" />
                    <Label htmlFor="leve" className="font-normal">
                      Leve - não interfere nas atividades diárias
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderada" id="moderada" />
                    <Label htmlFor="moderada" className="font-normal">
                      Moderada - interfere um pouco nas atividades diárias
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severa" id="severa" />
                    <Label htmlFor="severa" className="font-normal">
                      Severa - interfere significativamente nas atividades diárias
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="incapacitante" id="incapacitante" />
                    <Label htmlFor="incapacitante" className="font-normal">
                      Incapacitante - impede a realização de atividades diárias
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="
outline"
                  onClick={prevStep}
                  className="border-blue-200 text-blue-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!formData.duration || !formData.frequency || !formData.intensity}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-6">Histórico Médico</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-base">Você já realizou algum tratamento para este problema?</Label>
                <RadioGroup
                  value={formData.previousTreatment}
                  onValueChange={(value) => handleRadioChange("previousTreatment", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim_melhorou" id="sim_melhorou" />
                    <Label htmlFor="sim_melhorou" className="font-normal">
                      Sim, e melhorou
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim_nao_melhorou" id="sim_nao_melhorou" />
                    <Label htmlFor="sim_nao_melhorou" className="font-normal">
                      Sim, mas não melhorou
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="nao" />
                    <Label htmlFor="nao" className="font-normal">
                      Não
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="medications" className="text-base">
                  Você utiliza algum medicamento regularmente? Se sim, quais?
                </Label>
                <Textarea
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  placeholder="Liste os medicamentos que você utiliza regularmente"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="medicalHistory" className="text-base">
                  Você possui alguma condição médica diagnosticada? (Ex: hipertensão, diabetes, etc.)
                </Label>
                <Textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  placeholder="Liste suas condições médicas diagnosticadas"
                  className="mt-2"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="border-blue-200 text-blue-700">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!formData.previousTreatment}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-6">Seus Dados de Contato</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base">
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu e-mail"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Digite seu telefone"
                  className="mt-2"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="border-blue-200 text-blue-700">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 6 && result && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Obrigado por responder ao quiz!</h2>
            <p className="text-gray-700 mb-8">
              Com base nas suas respostas, identificamos o especialista mais adequado para o seu caso.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Especialista Recomendado</h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative h-32 w-32 rounded-full overflow-hidden">
                  <Image
                    src={result.image || "/placeholder.svg"}
                    alt={result.doctorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-semibold text-blue-900">{result.doctorName}</h4>
                  <p className="text-aqua-600 font-medium mb-4">{result.specialty}</p>
                  <Link href={`/profissionais/${result.doctorId}`}>
                    <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      Ver Perfil do Especialista
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Entraremos em contato em breve para agendar sua consulta. Se preferir, você pode agendar diretamente
              agora.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contato">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white">Agendar Consulta</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  Voltar para a Página Inicial
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

