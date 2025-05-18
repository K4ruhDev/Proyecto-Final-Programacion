import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-bold text-primary-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">Volver al Inicio</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">Explorar Productos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
