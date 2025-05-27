// app/products/[slug]/page.tsx
import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Remove AddToCartButton and ProductQuantity if they are only used inside ProductQuantityWithAddToCart
// import AddToCartButton from "@/components/products/add-to-cart-button";
// import ProductQuantity from "@/components/products/product-quantity";
import ProductReviews from "@/components/products/product-reviews";
import ProductCard from "@/components/products/product-card";

// IMPORT THE NEWLY MOVED CLIENT COMPONENT
import ProductQuantityWithAddToCart from "@/components/products/product-quantity-with-add-to-cart";

// Import the server-side function
import { getProductBySlugServer, getProductsServer } from "@/lib/services/product-service";
import type { Product } from "@/lib/types";

// Define a simple mock for reviews as they are not coming from your product-service
const reviews = [
  {
    id: "1",
    author: "Juan Pérez",
    rating: 5,
    comment: "Excelente café, muy aromático y con un sabor delicioso. Lo recomiendo totalmente.",
    date: "2023-04-10",
  },
  {
    id: "2",
    author: "María García",
    rating: 4,
    comment: "Muy buen café, aunque un poco caro. La calidad es innegable.",
    date: "2023-04-15",
  },
  {
    id: "3",
    author: "Carlos Ruiz",
    rating: 5,
    comment: "Mi café favorito. Sabor intenso y fresco, ideal para empezar el día.",
    date: "2023-04-20",
  },
];


// This component will be a Server Component
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlugServer(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProductsServer({ category: product.category, limit: 5 });
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);


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
                    width={800}
                    height={800}
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="grid items-center justify-center">
                {[1].map((i) => (
                    <div
                        key={i}
                        className="overflow-hidden  rounded-md border border-primary-100 cursor-pointer hover:border-primary-300 transition-all duration-300"
                    >
                      <Image
                          src={product.image || "/placeholder.svg"}
                          alt={`${product.name} image ${i}`}
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
                  {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                          key={i}
                          className={`h-5 w-5 ${
                              i < (product.rating || 0) ? "fill-primary-500 text-primary-500" : "text-gray-300"
                          }`}
                      />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reseñas)</span>
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
                    <div className="text-sm text-muted-foreground">{product.altitude || "No especificada"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Peso</div>
                    <div className="text-sm text-muted-foreground">{product.weight}</div>
                  </div>
                </div>
              </div>

              {product.flavor_notes && product.flavor_notes.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm font-medium mb-2">Notas de Sabor</div>
                    <div className="flex flex-wrap gap-2">
                      {product.flavor_notes.map((note) => (
                          <div
                              key={note}
                              className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 transition-transform hover:scale-105"
                          >
                            {note}
                          </div>
                      ))}
                    </div>
                  </div>
              )}

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
                    Reseñas ({product.reviews})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-4">
                  <div className="text-muted-foreground">
                    <p className="mb-4">{product.description}</p>
                    <p>
                      Tostamos estos granos con un perfil {product.roast?.toLowerCase() || "medio"} para preservar sus delicadas
                      características y su brillante acidez. Este café es perfecto para métodos de preparación pour-over
                      que resaltan su complejo perfil de sabor.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <div className="text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Origen: {product.origin}</li>
                      <li>Altitud: {product.altitude || "No especificada"}</li>
                      <li>Proceso: {product.process || "Lavado"}</li>
                      <li>Variedad: {product.varietal || (product.origin === "Etiopía" ? "Heirloom Etíope" : "Típica, Bourbon")}</li>
                      <li>Nivel de Tueste: {product.roast}</li>
                      {product.flavor_notes && product.flavor_notes.length > 0 && (
                          <li>Notas de Sabor: {product.flavor_notes.join(", ")}</li>
                      )}
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
              {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}