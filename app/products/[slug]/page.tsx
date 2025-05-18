import { ProductPageClient } from "./ProductPageClient"
import type { Metadata } from "next"
import { getProductBySlug } from "@/lib/data"

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Producto no encontrado | Onsen Coffee",
      description: "Lo sentimos, el producto que buscas no está disponible.",
    }
  }

  return {
    title: `${product.name} | Onsen Coffee`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Onsen Coffee`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductPageClient params={params} />
}
