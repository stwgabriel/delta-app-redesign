"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt")
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white shadow-sm"} rounded-3xl`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/logo.png?height=40&width=40"
              alt="Instituto Delta Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2 items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/" ? "text-blue-700 bg-blue-50" : "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              {t("nav.home")}
            </Link>

            <Link
              href="/sobre"
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/sobre"
                ? "text-blue-700 bg-blue-50"
                : "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              {t("nav.about")}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${pathname.startsWith("/servicos")
                    ? "text-blue-700 bg-blue-50"
                    : "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  {t("nav.services")} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/servicos" className="w-full cursor-pointer">
                    {language === "pt" ? "Todos os Serviços" : "All Services"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servicos/cefaleia" className="w-full cursor-pointer">
                    {language === "pt" ? "Cefaleia e Enxaqueca" : "Headache and Migraine"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servicos/epilepsia" className="w-full cursor-pointer">
                    {language === "pt" ? "Epilepsia" : "Epilepsy"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servicos/alzheimer" className="w-full cursor-pointer">
                    {language === "pt" ? "Alzheimer e Demências" : "Alzheimer's and Dementias"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servicos/parkinson" className="w-full cursor-pointer">
                    {language === "pt" ? "Doença de Parkinson" : "Parkinson's Disease"}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${pathname.startsWith("/profissionais")
                    ? "text-blue-700 bg-blue-50"
                    : "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  {t("nav.professionals")} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profissionais" className="w-full cursor-pointer">
                    {language === "pt" ? "Todos os Profissionais" : "All Professionals"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profissionais/dr-ana-silva" className="w-full cursor-pointer">
                    Dra. Ana Silva
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profissionais/dr-carlos-santos" className="w-full cursor-pointer">
                    Dr. Carlos Santos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profissionais/dra-mariana-costa" className="w-full cursor-pointer">
                    Dra. Mariana Costa
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contato"
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/contato"
                ? "text-blue-700 bg-blue-50"
                : "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              {t("nav.contact")}
            </Link>

            <Button variant="default" size="sm" className="ml-1 bg-blue-800 hover:bg-blue-900 text-white rounded-full">
              {t("nav.patientArea")}
            </Button>


          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {/* <Button variant="ghost" size="icon" onClick={toggleLanguage} className="mr-2 text-blue-800">
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button> */}
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-blue-800">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 flex gap-2 flex-col space-y-2 md:hidden">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/" ? "bg-blue-50 text-blue-700" : "text-blue-800"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/sobre"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/sobre" ? "bg-blue-50 text-blue-700" : "text-blue-800"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>

            <div className="px-3 py-2">
              <div className="font-medium text-sm text-blue-800 mb-1">{t("nav.services")}</div>
              <div className="pl-4 space-y-1 text-sm">
                <Link href="/servicos" className="block py-1 text-blue-700" onClick={() => setIsMenuOpen(false)}>
                  {language === "pt" ? "Todos os Serviços" : "All Services"}
                </Link>
                <Link
                  href="/servicos/cefaleia"
                  className="block py-1 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === "pt" ? "Cefaleia e Enxaqueca" : "Headache and Migraine"}
                </Link>
                <Link
                  href="/servicos/epilepsia"
                  className="block py-1 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === "pt" ? "Epilepsia" : "Epilepsy"}
                </Link>
                <Link
                  href="/servicos/alzheimer"
                  className="block py-1 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === "pt" ? "Alzheimer e Demências" : "Alzheimer's and Dementias"}
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <div className="font-medium text-sm text-blue-800 mb-1">{t("nav.professionals")}</div>
              <div className="pl-4 space-y-1 text-sm">
                <Link href="/profissionais" className="block py-1 text-blue-700" onClick={() => setIsMenuOpen(false)}>
                  {language === "pt" ? "Todos os Profissionais" : "All Professionals"}
                </Link>
                <Link
                  href="/profissionais/dr-ana-silva"
                  className="block py-1 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dra. Ana Silva
                </Link>
                <Link
                  href="/profissionais/dr-carlos-santos"
                  className="block py-1 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dr. Carlos Santos
                </Link>
                <Link
                  href="/profissionais/dra-mariana-costa"
                  className="block py-1 text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dra. Mariana Costa
                </Link>
              </div>
            </div>

            <Link
              href="/contato"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/contato" ? "bg-blue-50 text-blue-700" : "text-blue-800"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            <Button
              variant="default"
              className="bg-blue-800 hover:bg-blue-900 text-white w-full mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.patientArea")}
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}

