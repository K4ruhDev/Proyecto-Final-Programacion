import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="py-12 md:py-24 bg-primary-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative animate-fadeIn order-2 lg:order-1">
            <Image
              src="/images/coffee-roasting.png"
              width={400}
              height={550}
              alt="Proceso de tostado de café"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 animate-slideInRight order-1 lg:order-2">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-900">
                Nuestro Viaje del Café
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                En Onsen Coffee, creemos en el equilibrio perfecto entre tradición e innovación. Nuestro viaje comenzó
                con una simple pasión por el café excepcional y ha evolucionado hacia un compromiso con la
                sostenibilidad, la calidad y la comunidad.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-primary-200 text-primary-700 hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
                >
                  Conoce Más Sobre Nosotros
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
