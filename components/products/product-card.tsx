import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import AddToCartButton from "@/components/products/add-to-cart-button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden border border-primary-100 transition-all hover:shadow-lg group animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.image || "/images/brazil.png"}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
        {product.new && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            Nuevo
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white text-s font-medium px-2 py-1 rounded-full">
            No hay stock
          </div>
        )}
      </Link>
      <CardContent className="p-4">
        <div className="text-sm text-primary-600 mb-1">{product.origin}</div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary-700 transition-colors">{product.name}</h3>
        </Link>
        <div className="text-sm text-muted-foreground mb-2">
          Tueste {product.roast} · {product.weight}
        </div>
        <p className="text-primary-900 font-medium">{product.price.toFixed(2)} €</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}
