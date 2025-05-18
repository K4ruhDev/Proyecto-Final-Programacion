"use client"

import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
  showQuantity?: boolean
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  showQuantity = false,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Add to cart
    addToCart(product, quantity)

    // Reset button state after a short delay
    setTimeout(() => {
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
          {showQuantity ? `Añadir ${quantity} al Carrito` : "Añadir al Carrito"}
        </>
      )}
    </Button>
  )
}
