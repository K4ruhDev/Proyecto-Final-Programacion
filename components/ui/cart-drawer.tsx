"use client"

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Heart,
  X,
  Tag,
  Gift,
  Undo2,
  AlertCircle,
  Check,
  Coffee
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useEffect, useState } from "react"

export default function EnhancedCartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    finalTotal,
    isCartOpen,
    setIsCartOpen,
    recentlyRemoved,
    undoRemove,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    applyDiscount,
    removeDiscount,
    discountCode,
    discountAmount
  } = useCart()

  const [isMounted, setIsMounted] = useState(false)
  const [discountInput, setDiscountInput] = useState("")
  const [discountError, setDiscountError] = useState("")
  const [discountSuccess, setDiscountSuccess] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Reset discount messages after 3 seconds
  useEffect(() => {
    if (discountError || discountSuccess) {
      const timer = setTimeout(() => {
        setDiscountError("")
        setDiscountSuccess(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [discountError, discountSuccess])

  const handleDiscountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!discountInput.trim()) return

    const success = applyDiscount(discountInput.trim())
    if (success) {
      setDiscountSuccess(true)
      setDiscountInput("")
      setDiscountError("")
    } else {
      setDiscountError("Código de descuento inválido")
      setDiscountSuccess(false)
    }
  }

  const handleFavoriteToggle = (productId: string) => {
    if (isFavorite(productId)) {
      removeFromFavorites(productId)
    } else {
      addToFavorites(productId)
    }
  }

  if (!isMounted) {
    return null
  }

  const shippingThreshold = 50
  const isEligibleForFreeShipping = cartTotal >= shippingThreshold
  const amountForFreeShipping = shippingThreshold - cartTotal

  return (
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button
              variant="ghost"
              size="icon"
              aria-label="Carrito de Compras"
              className="relative group transition-all duration-200 hover:scale-105"
          >
            <ShoppingBag className="h-5 w-5 transition-transform group-hover:rotate-12" />
            {cartCount > 0 && (
                <Badge
                    variant="default"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-bounce bg-green-500 hover:bg-green-600"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
            )}
            <span className="sr-only">Carrito de Compras</span>
          </Button>
        </SheetTrigger>

        <SheetContent className="flex w-full flex-col sm:max-w-lg overflow-hidden">
          <SheetHeader className="space-y-2.5 pr-6 border-b pb-4">
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                <span>Mi Carrito</span>
                {cartCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}
                    </Badge>
                )}
              </div>
            </SheetTitle>

            {/* Free Shipping Progress */}
            {cartCount > 0 && (
                <div className="space-y-2">
                  {isEligibleForFreeShipping ? (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Check className="h-4 w-4" />
                        <span>¡Envío gratuito incluido!</span>
                      </div>
                  ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Envío gratuito desde {shippingThreshold}€</span>
                          <span className="font-medium">Faltan {amountForFreeShipping.toFixed(2)}€</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((cartTotal / shippingThreshold) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                  )}
                </div>
            )}
          </SheetHeader>

          {/* Undo Remove Alert */}
          {recentlyRemoved && (
              <Alert className="mx-4 mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>Producto eliminado del carrito</span>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={undoRemove}
                      className="ml-2 h-8"
                  >
                    <Undo2 className="h-3 w-3 mr-1" />
                    Deshacer
                  </Button>
                </AlertDescription>
              </Alert>
          )}

          {cartItems.length > 0 ? (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-auto py-4 px-4 space-y-4">
                  {cartItems.map((item, index) => (
                      <div
                          key={item.id}
                          className="group bg-white rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:shadow-md hover:border-gray-200"
                          style={{
                            animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                          }}
                      >
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-50 flex-shrink-0">
                            <Image
                                src={item.image || "/api/placeholder/80/80"}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>

                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0">
                                <Link
                                    href={`/products/${item.slug}`}
                                    className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                  {item.name}
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {item.origin} · {item.roast}
                            </span>
                                  <Badge variant="outline" className="text-xs">
                                    {item.price.toFixed(2)}€
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 ml-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleFavoriteToggle(item.id.toString())}
                                >
                                  <Heart
                                      className={`h-4 w-4 ${isFavorite(item.id.toString()) ? 'fill-red-500 text-red-500' : ''}`}
                                  />
                                  <span className="sr-only">Favorito</span>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Eliminar</span>
                                </Button>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center border border-input rounded-lg overflow-hidden">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 rounded-none hover:bg-gray-100"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                  <span className="sr-only">Disminuir cantidad</span>
                                </Button>
                                <div className="px-3 py-1 text-center min-w-12 text-sm font-medium bg-gray-50">
                                  {item.quantity}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 rounded-none hover:bg-gray-100"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                  <span className="sr-only">Aumentar cantidad</span>
                                </Button>
                              </div>

                              <div className="text-right">
                                <div className="font-semibold text-lg">
                                  {(item.price * item.quantity).toFixed(2)}€
                                </div>
                                {item.quantity > 1 && (
                                    <div className="text-xs text-muted-foreground">
                                      {item.price.toFixed(2)}€ cada uno
                                    </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>

                {/* Discount Code Section */}
                <div className="px-4 space-y-4">
                  <Separator />

                  {!discountCode ? (
                      <form onSubmit={handleDiscountSubmit} className="space-y-2">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Código de descuento"
                                value={discountInput}
                                onChange={(e) => setDiscountInput(e.target.value)}
                                className="pl-10"
                            />
                          </div>
                          <Button type="submit" variant="outline" disabled={!discountInput.trim()}>
                            Aplicar
                          </Button>
                        </div>

                        {discountError && (
                            <div className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {discountError}
                            </div>
                        )}

                        {discountSuccess && (
                            <div className="text-sm text-green-600 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              ¡Descuento aplicado correctamente!
                            </div>
                        )}
                      </form>
                  ) : (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                      Código: {discountCode}
                    </span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            -{(discountAmount * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeDiscount}
                            className="text-green-600 hover:text-green-700 hover:bg-green-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                  )}
                </div>

                {/* Cart Summary */}
                <div className="px-4 space-y-4 pt-4 border-t bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{cartTotal.toFixed(2)}€</span>
                    </div>

                    {discountCode && discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Descuento ({discountCode})</span>
                          <span>-{(cartTotal * discountAmount).toFixed(2)}€</span>
                        </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envío</span>
                      <span>{isEligibleForFreeShipping ? 'Gratis' : 'A calcular'}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{finalTotal.toFixed(2)}€</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                        onClick={() => setIsCartOpen(false)}
                    >
                      <Link href="/checkout" className="flex items-center justify-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Finalizar Compra
                      </Link>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                          variant="outline"
                          asChild
                          className="transition-all duration-200 hover:translate-y-[-2px]"
                          onClick={() => setIsCartOpen(false)}
                      >
                        <Link href="/products" className="flex items-center justify-center gap-1">
                          <Coffee className="h-4 w-4" />
                          Seguir Comprando
                        </Link>
                      </Button>

                      <Button
                          variant="ghost"
                          className="hover:bg-red-50 hover:text-red-600 transition-colors"
                          onClick={clearCart}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Vaciar
                      </Button>
                    </div>
                  </div>
                </div>
              </>
          ) : (
              /* Empty Cart State */
              <div className="flex flex-1 flex-col items-center justify-center space-y-6 py-12 px-8">
                <div className="relative">
                  <div className="rounded-full bg-gradient-to-br from-primary/10 to-primary/20 p-8">
                    <ShoppingBag className="h-12 w-12 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">0</span>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Tu carrito está vacío</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Descubre nuestros increíbles cafés y añade algunos a tu carrito para comenzar.
                  </p>
                </div>

                <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                    onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/products" className="flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    Explorar Productos
                  </Link>
                </Button>
              </div>
          )}
        </SheetContent>

        <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      </Sheet>
  )
}