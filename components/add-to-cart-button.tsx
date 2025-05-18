"use client"

import { ShoppingCart } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function AddToCartButton({ product, className = "" }) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate adding to cart
    setTimeout(() => {
      toast({
        title: "Añadido al carrito",
        description: `${product.name} ha sido añadido a tu carrito.`,
      })
      setIsAdding(false)
    }, 600)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`bg-primary-600 hover:bg-primary-700 w-full ${className} transition-all duration-300 transform hover:scale-105`}
    >
      {isAdding ? (
        "Añadiendo..."
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al Carrito
        </>
      )}
    </Button>
  )
}
