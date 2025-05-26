import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/products/product-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Product } from "@/lib/types"

interface FeaturedSectionProps {
  products: Product[]
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Productos Destacados</h2>
            <p className="text-muted-foreground max-w-2xl">
              Descubre nuestra selección de cafés especiales, cuidadosamente seleccionados para ofrecerte una
              experiencia única.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/products">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {products.length > 0 ? (
          <Carousel
          autoplay
          autoplayInterval={5000}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard product={product} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12" />
            <CarouselNext className="hidden sm:flex -right-12" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay productos destacados disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  )
}