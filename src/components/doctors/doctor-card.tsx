"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type DoctorCardProps = {
  id: string
  name: string
  nameEn?: string
  specialty: string
  specialtyEn?: string
  image: string
  shortBio?: string
  shortBioEn?: string
  compact?: boolean
}

export default function DoctorCard({
  id,
  name,
  nameEn,
  specialty,
  specialtyEn,
  image,
  shortBio,
  shortBioEn,
  compact = false,
}: DoctorCardProps) {
  const { language } = useLanguage()

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow ${compact ? "flex" : ""}`}
    >
      <div className={`${compact ? "w-24 h-24 flex-shrink-0" : "h-64 w-full"} relative`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={language === "pt" ? name : nameEn || name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className={`${compact ? "text-base" : "text-xl"} font-semibold text-blue-900 mb-1`}>
          {language === "pt" ? name : nameEn || name}
        </h3>
        <p className="text-aqua-600 font-medium text-sm mb-2">
          {language === "pt" ? specialty : specialtyEn || specialty}
        </p>
        {!compact && shortBio && (
          <p className="text-gray-600 mb-4 text-sm">{language === "pt" ? shortBio : shortBioEn || shortBio}</p>
        )}
        <Link href={`/profissionais/${id}`}>
          <Button
            variant={compact ? "link" : "default"}
            className={`${compact ? "p-0 h-auto text-blue-600" : "w-full bg-blue-800 hover:bg-blue-900 text-white"}`}
          >
            {language === "pt" ? "Ver Perfil" : "View Profile"}
          </Button>
        </Link>
      </div>
    </div>
  )
}

