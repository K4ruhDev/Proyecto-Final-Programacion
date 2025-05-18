"use client"

import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProductQuantityProps {
  initialQuantity?: number
  onChange?: (quantity: number) => void
  min?: number
  max?: number
}

export default function ProductQuantity({ initialQuantity = 1, onChange, min = 1, max = 99 }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  return (
    <div className="flex items-center border border-input rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-r-none h-10"
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Disminuir cantidad</span>
      </Button>
      <div className="px-4 py-2 text-center w-12">{quantity}</div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-l-none h-10"
        onClick={handleIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Aumentar cantidad</span>
      </Button>
    </div>
  )
}
