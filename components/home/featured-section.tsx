import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/products/product-card"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay productos destacados disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  )
}
