import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"

export default function FeaturedSection() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 animate-fadeIn">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-800">
              Colección Destacada
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary-900">
              Nuestros Cafés Especiales
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explora nuestra selección de los mejores cafés especiales de todo el mundo.
            </p>
          </div>
        </div>
        <FeaturedProducts />
        <div className="flex justify-center mt-10">
          <Link href="/products">
            <Button
              variant="outline"
              className="border-primary-200 text-primary-700 hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
            >
              Ver Todos los Productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
