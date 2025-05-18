import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pedido Completado | Onsen Coffee",
  description: "Tu pedido ha sido procesado correctamente. Gracias por tu compra.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-primary-100 p-6 mb-6 animate-fadeIn">
          <Check className="h-12 w-12 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4 animate-fadeIn">¡Pedido Completado!</h1>
        <p className="text-muted-foreground mb-8 max-w-md animate-fadeIn">
          Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando. Recibirás un email de confirmación en
          breve.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp">
          <Button asChild size="lg">
            <Link href="/products">Seguir Comprando</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
