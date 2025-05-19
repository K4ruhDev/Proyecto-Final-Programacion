"use client"

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, isCartOpen, setIsCartOpen } =
    useCart()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Carrito de Compras" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Carrito de Compras</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Tu Carrito ({cartCount})
          </SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-auto py-4">
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-medium hover:text-primary-700 transition-colors"
                          onClick={() => setIsCartOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.origin} · {item.roast}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-input rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-r-none h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Disminuir cantidad</span>
                          </Button>
                          <div className="px-3 py-1 text-center w-8">{item.quantity}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-l-none h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar cantidad</span>
                          </Button>
                        </div>
                        <div className="font-medium">{(item.price * item.quantity).toFixed(2)} €</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span>Calculado al finalizar</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  className="bg-primary-600 hover:bg-primary-700 transition-transform hover:scale-[1.02]"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/checkout">Finalizar Compra</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="transition-transform hover:translate-x-[-4px]"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/products">Continuar Comprando</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full bg-primary-50 p-6">
              <ShoppingBag className="h-10 w-10 text-primary-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">Tu carrito está vacío</h3>
              <p className="text-muted-foreground mt-1">Parece que aún no has añadido ningún café a tu carrito.</p>
            </div>
            <Button asChild className="mt-4 bg-primary-600 hover:bg-primary-700" onClick={() => setIsCartOpen(false)}>
              <Link href="/products">Explorar Productos</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
