import Image from "next/image"
import { Coffee, Truck, Package } from "lucide-react"

export default function ProcessSection() {
  return (
    <section className="py-16 bg-primary-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2 font-playfair">Nuestro Proceso</h2>
          <p className="text-muted-foreground max-w-2xl">
            Desde la selección de los mejores granos hasta la entrega en tu puerta, cada paso está diseñado para
            ofrecerte la mejor experiencia de café.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slideUp">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <Coffee className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Selección de Granos</h3>
            <p className="text-muted-foreground">
              Seleccionamos cuidadosamente los mejores granos de café de fincas sostenibles alrededor del mundo.
            </p>
          </div>

          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tostado Artesanal</h3>
            <p className="text-muted-foreground">
              Tostamos en pequeños lotes para garantizar la frescura y resaltar los sabores únicos de cada origen.
            </p>
          </div>

          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slideUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Envío Rápido</h3>
            <p className="text-muted-foreground">
              Enviamos tu café recién tostado directamente a tu puerta para que disfrutes de la máxima frescura.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 animate-slideUp" style={{ animationDelay: "0.6s" }}>
            <h3 className="text-2xl font-bold mb-4 font-playfair">Compromiso con la Calidad</h3>
            <p className="text-muted-foreground mb-4">
              En Onsen Coffee, nos comprometemos a ofrecerte café de la más alta calidad. Trabajamos directamente con
              productores que comparten nuestra pasión por el café excepcional y prácticas sostenibles.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                <span>Granos 100% arábica de especialidad</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                <span>Tostado en pequeños lotes para máxima frescura</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                <span>Comercio directo y precios justos para los productores</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                <span>Prácticas sostenibles y respetuosas con el medio ambiente</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 animate-slideUp" style={{ animationDelay: "0.8s" }}>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/coffee-origins.png"
                alt="Proceso de tostado de café"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
