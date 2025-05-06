"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  // const { t, language } = useLanguage()

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden pt-12">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Animated circles for visual interest */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-aqua-500/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {/* {t("hero.title")} */}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              {/* {t("hero.subtitle")} */}
            </p>
            <p className="text-lg mb-8 text-blue-100/90 max-w-2xl">
              Somos uma equipe de neurologistas especialistas dedicados a
              oferecer diagnósticos precisos e tratamentos personalizados para
              condições neurológicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contato">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-aqua-500 hover:bg-aqua-600 text-white px-8 py-6 text-lg"
                >
                  CTA
                </Button>
              </Link>
              <Link href="/quiz">
                <Button variant="outline" size="lg" className="w-full">
                  QUIZ
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt="Patient"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-blue-100">
                  Mais de 2.000 pacientes satisfeitos
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Doctor"
                  alt="Neurologist"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Brain"
                  alt="Brain Scan"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary backdrop-blur-md rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <p className="text-sm text-blue-100">
                    Atendimento Especializado
                  </p>
                  <p className="text-2xl font-bold text-white">15+ anos</p>
                  <p className="text-xs text-blue-100">de experiência</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
