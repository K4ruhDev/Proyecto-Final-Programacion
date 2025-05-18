import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-primary-900">
                Descubre el Arte del Café Especial
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Cuidadosamente seleccionado, expertamente tostado y entregado fresco a tu puerta. Experimenta los
                sabores únicos de Onsen Coffee.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
                >
                  Comprar Ahora
                  <ShoppingBag className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-200 text-primary-700 hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
                >
                  Leer Nuestro Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative lg:ml-auto">
            <Image
              src="/images/hero-coffee.png"
              width={400}
              height={550}
              alt="Granos y preparación de Onsen Coffee"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-lg transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
