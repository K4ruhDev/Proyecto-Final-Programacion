"use client"

import { ArrowLeft, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddToCartButton from "@/components/products/add-to-cart-button"
import ProductQuantity from "@/components/products/product-quantity"
import ProductReviews from "@/components/products/product-reviews"
import { getProductBySlug, getRelatedProducts, reviews } from "@/lib/data"
import ProductCard from "@/components/products/product-card"
import { useState } from "react"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(params.slug, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-primary-700 mb-6 transition-transform hover:translate-x-[-4px]"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver a Productos
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4 animate-fadeIn">
            <div className="overflow-hidden rounded-lg border border-primary-100 shadow-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="aspect-square object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-md border border-primary-100 cursor-pointer hover:border-primary-300 transition-all duration-300"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`Imagen del producto ${i}`}
                    width={150}
                    height={150}
                    className="aspect-square object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col animate-fadeInRight">
            <div className="mb-2 text-sm text-primary-600">{product.origin}</div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-primary-500 text-primary-500" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reseñas)</span>
            </div>
            <div className="text-2xl font-semibold text-primary-900 mb-4">{product.price.toFixed(2)} €</div>
            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="grid gap-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Nivel de Tueste</div>
                  <div className="text-sm text-muted-foreground">{product.roast}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Proceso</div>
                  <div className="text-sm text-muted-foreground">{product.process || "Lavado"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Altitud</div>
                  <div className="text-sm text-muted-foreground">{product.altitude || "1,200-1,800 metros"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Peso</div>
                  <div className="text-sm text-muted-foreground">{product.weight}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2">Notas de Sabor</div>
              <div className="flex flex-wrap gap-2">
                {product.flavor_notes?.map((note) => (
                  <div
                    key={note}
                    className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 transition-transform hover:scale-105"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <ProductQuantityWithAddToCart product={product} />

            <Separator className="my-6" />

            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-700 data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-primary-900"
                >
                  Descripción
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-700 data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-primary-900"
                >
                  Detalles
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-700 data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-primary-900"
                >
                  Reseñas (24)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <div className="text-muted-foreground">
                  <p className="mb-4">{product.description}</p>
                  <p>
                    Tostamos estos granos con un perfil {product.roast.toLowerCase()} para preservar sus delicadas
                    características y su brillante acidez. Este café es perfecto para métodos de preparación pour-over
                    que resaltan su complejo perfil de sabor.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <div className="text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Origen: {product.origin}</li>
                    <li>Altitud: {product.altitude || "1,200-1,800 metros"}</li>
                    <li>Proceso: {product.process || "Lavado"}</li>
                    <li>Variedad: {product.origin === "Etiopía" ? "Heirloom Etíope" : "Típica, Bourbon"}</li>
                    <li>Nivel de Tueste: {product.roast}</li>
                    <li>Notas de Sabor: {product.flavor_notes?.join(", ")}</li>
                    <li>Preparación Recomendada: Pour Over, Aeropress, Goteo</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <ProductReviews reviews={reviews} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">También Te Podría Gustar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductQuantityWithAddToCart({ product }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex items-center gap-4 mb-6">
      <ProductQuantity initialQuantity={1} onChange={setQuantity} />
      <AddToCartButton product={product} quantity={quantity} showQuantity />
    </div>
  )
}
