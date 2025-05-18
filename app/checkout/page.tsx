"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formErrors, setFormErrors] = useState({})

  const shipping = 5.99
  const total = cartTotal + shipping

  const validateForm = (formData) => {
    const errors = {}

    // Contact information validation
    if (!formData.get("firstName").trim()) errors.firstName = "El nombre es requerido"
    if (!formData.get("lastName").trim()) errors.lastName = "Los apellidos son requeridos"
    if (!formData.get("email").trim()) errors.email = "El email es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.get("email"))) errors.email = "Email inválido"
    if (!formData.get("phone").trim()) errors.phone = "El teléfono es requerido"

    // Shipping address validation
    if (!formData.get("address").trim()) errors.address = "La dirección es requerida"
    if (!formData.get("city").trim()) errors.city = "La ciudad es requerida"
    if (!formData.get("postalCode").trim()) errors.postalCode = "El código postal es requerido"
    if (!formData.get("country").trim()) errors.country = "El país es requerido"

    // Payment information validation
    if (paymentMethod === "card") {
      if (!formData.get("cardNumber").trim()) errors.cardNumber = "El número de tarjeta es requerido"
      if (!formData.get("expiryDate").trim()) errors.expiryDate = "La fecha de expiración es requerida"
      if (!formData.get("cvv").trim()) errors.cvv = "El CVV es requerido"
      if (!formData.get("cardName").trim()) errors.cardName = "El nombre en la tarjeta es requerido"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    if (!validateForm(formData)) {
      toast({
        title: "Error en el formulario",
        description: "Por favor, completa todos los campos requeridos correctamente.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "¡Pedido completado!",
        description: "Tu pedido ha sido procesado correctamente.",
      })
      clearCart()
      router.push("/checkout/success")
      setIsSubmitting(false)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container px-4 md:px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-6">Añade algunos productos antes de proceder al pago.</p>
          <Button asChild>
            <Link href="/products">Explorar Productos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary-50 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight text-primary-900">Finalizar Compra</h1>
            <p className="text-muted-foreground">Completa tu información para procesar tu pedido.</p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 animate-fadeInLeft">
              <form onSubmit={handleSubmit}>
                <Card className="mb-8 border-primary-100">
                  <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          className={`border-primary-200 ${formErrors.firstName ? "border-red-500" : ""}`}
                        />
                        {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellidos</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          className={`border-primary-200 ${formErrors.lastName ? "border-red-500" : ""}`}
                        />
                        {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className={`border-primary-200 ${formErrors.email ? "border-red-500" : ""}`}
                      />
                      {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={`border-primary-200 ${formErrors.phone ? "border-red-500" : ""}`}
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-8 border-primary-100">
                  <CardHeader>
                    <CardTitle>Dirección de Envío</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        name="address"
                        className={`border-primary-200 ${formErrors.address ? "border-red-500" : ""}`}
                      />
                      {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          name="city"
                          className={`border-primary-200 ${formErrors.city ? "border-red-500" : ""}`}
                        />
                        {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Código Postal</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          className={`border-primary-200 ${formErrors.postalCode ? "border-red-500" : ""}`}
                        />
                        {formErrors.postalCode && <p className="text-red-500 text-sm">{formErrors.postalCode}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Input
                        id="country"
                        name="country"
                        className={`border-primary-200 ${formErrors.country ? "border-red-500" : ""}`}
                        defaultValue="España"
                      />
                      {formErrors.country && <p className="text-red-500 text-sm">{formErrors.country}</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-8 border-primary-100">
                  <CardHeader>
                    <CardTitle>Método de Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      defaultValue="card"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-primary-50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Tarjeta de Crédito/Débito
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-primary-50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className={`border-primary-200 ${formErrors.cardNumber ? "border-red-500" : ""}`}
                          />
                          {formErrors.cardNumber && <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/AA"
                              className={`border-primary-200 ${formErrors.expiryDate ? "border-red-500" : ""}`}
                            />
                            {formErrors.expiryDate && <p className="text-red-500 text-sm">{formErrors.expiryDate}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              className={`border-primary-200 ${formErrors.cvv ? "border-red-500" : ""}`}
                            />
                            {formErrors.cvv && <p className="text-red-500 text-sm">{formErrors.cvv}</p>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            className={`border-primary-200 ${formErrors.cardName ? "border-red-500" : ""}`}
                          />
                          {formErrors.cardName && <p className="text-red-500 text-sm">{formErrors.cardName}</p>}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    "Completar Pedido"
                  )}
                </Button>
              </form>
            </div>

            <div className="animate-fadeInRight">
              <Card className="border-primary-100 sticky top-20">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between py-2">
                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded overflow-hidden mr-3">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full text-center text-sm text-muted-foreground">
                    <p>
                      Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia y otros fines
                      descritos en nuestra política de privacidad.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
