import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import ImageSlider from "@/components/ui/image-slider"

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />

      <div className="relative h-[600px] md:h-[700px]">
        <ImageSlider />
      </div>

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 animate-fadeIn">
              Descubre el Arte del Café de Especialidad
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 animate-fadeIn animation-delay-200">
              Café de especialidad tostado artesanalmente y enviado directamente a tu puerta. Explora nuestras
              selecciones únicas de todo el mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
              <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                <Link href="/products">
                  Comprar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                <Link href="/about">Conocer más</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
