"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag, Heart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  index?: number
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({
                                      product,
                                      index = 0,
                                      viewMode = 'grid'
                                    }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido a tu carrito.`,
      duration: 3000,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)

    toast({
      title: isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: `${product.name} ${isFavorite ? 'eliminado de' : 'añadido a'} favoritos.`,
      duration: 2000,
    })
  }

  // Animación con delay basado en el índice
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  // Calcular descuento si hay precio anterior
  const discountPercentage = product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0

  // Renderizar estrellas de rating
  const renderStars = (rating: number = 4.5) => {
    return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
              <Star
                  key={star}
                  className={`h-3 w-3 ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
              />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating})</span>
        </div>
    )
  }

  if (viewMode === 'list') {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="product-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          <Link href={`/products/${product.slug}`} className="block">
            <div className="flex gap-4 p-4">
              {/* Imagen del producto */}
              <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-700">
                <Image
                    src={product.image || "/placeholder.svg?height=400&width=400&text=Café"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500"
                    style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.featured && (
                      <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 text-xs">
                        Destacado
                      </Badge>
                  )}
                  {product.new && (
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-xs">
                        Nuevo
                      </Badge>
                  )}
                  {product.oldPrice && (
                      <Badge variant="default" className="bg-red-600 hover:bg-red-700 text-xs">
                        -{discountPercentage}%
                      </Badge>
                  )}
                </div>
              </div>

              {/* Información del producto */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1 text-gray-900 dark:text-white">
                      {product.name}
                    </h3>

                    {/* Acciones rápidas */}
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={handleToggleFavorite}
                          aria-label="Añadir a favoritos"
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                      </Button>
                      <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          aria-label="Vista rápida"
                      >
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>

                  {/* Descripción breve */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description || "Delicioso café de alta calidad con notas únicas y sabor excepcional."}
                  </p>

                  {/* Rating */}
                  <div className="mb-3">
                    {renderStars(4.5)}
                  </div>

                  {/* Categorías */}
                  <div className="flex items-center gap-2 mb-3">
                    {product.category && (
                        <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    )}
                    {product.origin && (
                        <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {product.origin}
                    </span>
                    )}
                  </div>
                </div>

                {/* Precio y botón */}
                <div className="flex items-center justify-between">
                  <div>
                    {product.oldPrice ? (
                        <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        €{product.price.toFixed(2)}
                      </span>
                          <span className="text-sm text-muted-foreground line-through">
                        €{product.oldPrice.toFixed(2)}
                      </span>
                        </div>
                    ) : (
                        <span className="font-bold text-xl text-gray-900 dark:text-white">
                      €{product.price.toFixed(2)}
                    </span>
                    )}
                  </div>

                  <Button
                      variant="default"
                      size="default"
                      className="bg-green-600 hover:bg-green-700 text-white px-6"
                      onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Añadir al carrito
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
    )
  }

  // Modo Grid (mejorado)
  return (
      <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="product-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-gray-700">
            <Image
                src={product.image || "/placeholder.svg?height=400&width=400&text=Café"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                  <Badge variant="default"  className="bg-blue-600 hover:bg-blue-700 text-xs">
                    Destacado
                  </Badge>
              )}
              {product.new && (
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-xs">
                    Nuevo
                  </Badge>
              )}
              {product.oldPrice && (
                  <Badge variant="default" className="bg-red-600 hover:bg-red-700 text-xs">
                    -{discountPercentage}%
                  </Badge>
              )}
            </div>

            {/* Quick actions */}
            <div
                className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(-10px)'
                }}
            >
              <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 shadow-sm"
                  onClick={handleToggleFavorite}
                  aria-label="Añadir a favoritos"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-green-600 shadow-sm"
                  aria-label="Vista rápida"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Overlay con información adicional */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300"
                style={{ opacity: isHovered ? 1 : 0 }}
            >
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm line-clamp-2">
                  {product.description || "Delicioso café de alta calidad"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mb-3">
              {renderStars(4.5)}
            </div>

            <div className="flex items-center gap-2 mb-3">
              {product.category && (
                  <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {product.category}
              </span>
              )}
              {product.origin && (
                  <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {product.origin}
              </span>
              )}
            </div>

            <div className="flex items-end justify-between mt-auto">
              <div>
                {product.oldPrice ? (
                    <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-gray-900 dark:text-white">
                    €{product.price.toFixed(2)}
                  </span>
                      <span className="text-sm text-muted-foreground line-through">
                    €{product.oldPrice.toFixed(2)}
                  </span>
                    </div>
                ) : (
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                  €{product.price.toFixed(2)}
                </span>
                )}
              </div>

              <Button
                  variant="default"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Añadir
              </Button>
            </div>
          </div>
        </Link>
      </motion.div>
  )
}