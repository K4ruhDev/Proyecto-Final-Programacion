"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Product, CartItem } from "@/lib/types"

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  isCartOpen: boolean
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number | string) => void
  updateQuantity: (productId: number | string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  toggleCart: () => {},
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isInitialized])

  // Calcular total y cantidad
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Añadir producto al carrito
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Si el producto ya está en el carrito, actualizar cantidad
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Si el producto no está en el carrito, añadirlo
        return [...prevItems, { ...product, quantity }]
      }
    })

    // Abrir el carrito al añadir un producto
    setIsCartOpen(true)
  }

  // Eliminar producto del carrito
  const removeFromCart = (productId: number | string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Actualizar cantidad de un producto
  const updateQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([])
  }

  // Abrir/cerrar carrito
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  return (
      <CartContext.Provider
          value={{
            cartItems,
            cartCount,
            cartTotal,
            isCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toggleCart,
          }}
      >
        {children}
      </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
