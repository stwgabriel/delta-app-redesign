"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type CTASectionProps = {
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  buttonText: string
  buttonTextEn?: string
  buttonLink: string
  secondaryButtonText?: string
  secondaryButtonTextEn?: string
  secondaryButtonLink?: string
  bgColor?: string
}

export default function CTASection({
  title,
  titleEn,
  description,
  descriptionEn,
  buttonText,
  buttonTextEn,
  buttonLink,
  secondaryButtonText,
  secondaryButtonTextEn,
  secondaryButtonLink,
  bgColor = "bg-blue-900",
}: CTASectionProps) {
  const { language } = useLanguage()

  return (
    <section className={`py-16 ${bgColor} text-white`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{language === "pt" ? title : titleEn || title}</h2>
          <p className="text-lg text-blue-100 mb-8">{language === "pt" ? description : descriptionEn || description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={buttonLink}>
              <Button className="bg-aqua-500 hover:bg-aqua-600 text-white px-8">
                {language === "pt" ? buttonText : buttonTextEn || buttonText}
              </Button>
            </Link>

            {secondaryButtonText && secondaryButtonLink && (
              <Link href={secondaryButtonLink}>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  {language === "pt" ? secondaryButtonText : secondaryButtonTextEn || secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

