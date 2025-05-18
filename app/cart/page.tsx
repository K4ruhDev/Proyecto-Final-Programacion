"use client"

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const shipping = cartItems.length > 0 ? 5.99 : 0
  const total = cartTotal + shipping - discount

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "onsen10") {
      setDiscount(cartTotal * 0.1)
      setCouponApplied(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary-50 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight text-primary-900">Tu Carrito</h1>
            <p className="text-muted-foreground">Revisa tus artículos y procede al pago.</p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-8">
          {cartItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 animate-fadeInLeft">
                <Card className="border-primary-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle>Carrito de Compras ({cartItems.length} artículos)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Producto</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Cantidad</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id} className="hover:bg-primary-50 transition-colors duration-200">
                            <TableCell>
                              <div className="w-[80px] h-[80px] relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`/products/${item.slug}`}
                                className="font-medium hover:text-primary-700 transition-colors"
                              >
                                {item.name}
                              </Link>
                              <div className="text-sm text-muted-foreground mt-1">
                                {item.origin} · {item.roast}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center border border-input rounded-md w-[120px]">
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
                                <div className="px-3 py-1 text-center flex-1">{item.quantity}</div>
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
                            </TableCell>
                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar artículo</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild className="transition-transform hover:translate-x-[-4px]">
                      <Link href="/products">Continuar Comprando</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="mt-8 border-primary-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>¿Tienes un cupón?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Código de cupón"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={handleApplyCoupon} disabled={couponApplied}>
                        Aplicar
                      </Button>
                    </div>
                    {couponApplied && (
                      <p className="mt-2 text-sm text-green-500">Cupón aplicado. Descuento: ${discount.toFixed(2)}</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="animate-fadeInRight">
                <Card className="border-primary-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Resumen del pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between">
                          <span>Descuento</span>
                          <span className="text-green-500">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/checkout">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Proceder al pago
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 animate-fadeIn">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">Tu carrito está vacío</h2>
              <p className="mt-2 text-muted-foreground">Explora nuestros productos y añade algo que te guste.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Ir a la tienda</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
