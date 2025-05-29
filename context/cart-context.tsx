"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product, CartItem } from "@/lib/types"

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  isCartOpen: boolean
  favoriteItems: string[]
  recentlyRemoved: CartItem | null
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number | string) => void
  updateQuantity: (productId: number | string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setIsCartOpen: (open: boolean) => void
  addToFavorites: (productId: string) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  undoRemove: () => void
  getItemQuantity: (productId: number | string) => number
  isInCart: (productId: number | string) => boolean
  applyDiscount: (code: string) => boolean
  removeDiscount: () => void
  discountCode: string | null
  discountAmount: number
  finalTotal: number
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  favoriteItems: [],
  recentlyRemoved: null,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  toggleCart: () => {},
  setIsCartOpen: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
  undoRemove: () => {},
  getItemQuantity: () => 0,
  isInCart: () => false,
  applyDiscount: () => false,
  removeDiscount: () => {},
  discountCode: null,
  discountAmount: 0,
  finalTotal: 0,
})

// Códigos de descuento válidos
const DISCOUNT_CODES = {
  "MVP": -1,
  "ONSEN15": 0.15,
  "ESTADOINICIAL": 0.5,
  "ECLIPSE1": 0.1,
  "ELCHIVO5": 0.05,
  "LORENZO22": 0.22,
  "BYETHOST25": 0.25,
  "BRAIS10": 0.1,
  "NONINA": 1

}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState<string[]>([])
  const [recentlyRemoved, setRecentlyRemoved] = useState<CartItem | null>(null)
  const [discountCode, setDiscountCode] = useState<string | null>(null)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const storedFavorites = localStorage.getItem("favorites")
    const storedDiscount = localStorage.getItem("discount")

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error)
      }
    }

    if (storedFavorites) {
      try {
        setFavoriteItems(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error al cargar favoritos desde localStorage:", error)
      }
    }

    if (storedDiscount) {
      try {
        const discount = JSON.parse(storedDiscount)
        setDiscountCode(discount.code)
        setDiscountAmount(discount.amount)
      } catch (error) {
        console.error("Error al cargar descuento desde localStorage:", error)
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

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favoriteItems))
    }
  }, [favoriteItems, isInitialized])

  // Guardar descuento en localStorage cuando cambie
  useEffect(() => {
    if (isInitialized) {
      if (discountCode && discountAmount > 0) {
        localStorage.setItem("discount", JSON.stringify({ code: discountCode, amount: discountAmount }))
      } else {
        localStorage.removeItem("discount")
      }
    }
  }, [discountCode, discountAmount, isInitialized])

  // Limpiar elemento recientemente eliminado después de 10 segundos
  useEffect(() => {
    if (recentlyRemoved) {
      const timer = setTimeout(() => {
        setRecentlyRemoved(null)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [recentlyRemoved])

  // Calcular totales
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discountTotal = cartTotal * discountAmount
  const finalTotal = cartTotal - discountTotal

  // Añadir producto al carrito
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        return [...prevItems, { ...product, quantity }]
      }
    })

    // Abrir el carrito con animación suave
    if (!isCartOpen) {
      setIsCartOpen(true)
    }
  }

  // Eliminar producto del carrito con opción de deshacer
  const removeFromCart = (productId: number | string) => {
    const itemToRemove = cartItems.find(item => item.id === productId)
    if (itemToRemove) {
      setRecentlyRemoved(itemToRemove)
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    }
  }

  // Deshacer eliminación
  const undoRemove = () => {
    if (recentlyRemoved) {
      setCartItems(prevItems => [...prevItems, recentlyRemoved])
      setRecentlyRemoved(null)
    }
  }

  // Actualizar cantidad de un producto
  const updateQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        )
    )
  }

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([])
    setRecentlyRemoved(null)
  }

  // Abrir/cerrar carrito
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  // Gestión de favoritos
  const addToFavorites = (productId: string) => {
    setFavoriteItems(prev => [...prev, productId])
  }

  const removeFromFavorites = (productId: string) => {
    setFavoriteItems(prev => prev.filter(id => id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favoriteItems.includes(productId)
  }

  // Utilidades
  const getItemQuantity = (productId: number | string) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const isInCart = (productId: number | string) => {
    return cartItems.some(item => item.id === productId)
  }

  // Gestión de descuentos
  const applyDiscount = (code: string): boolean => {
    const upperCode = code.toUpperCase()
    if (DISCOUNT_CODES[upperCode as keyof typeof DISCOUNT_CODES]) {
      setDiscountCode(upperCode)
      setDiscountAmount(DISCOUNT_CODES[upperCode as keyof typeof DISCOUNT_CODES])
      return true
    }
    return false
  }

  const removeDiscount = () => {
    setDiscountCode(null)
    setDiscountAmount(0)
  }

  return (
      <CartContext.Provider
          value={{
            cartItems,
            cartCount,
            cartTotal,
            isCartOpen,
            favoriteItems,
            recentlyRemoved,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toggleCart,
            setIsCartOpen,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            undoRemove,
            getItemQuantity,
            isInCart,
            applyDiscount,
            removeDiscount,
            discountCode,
            discountAmount,
            finalTotal,
          }}
      >
        {children}
      </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}