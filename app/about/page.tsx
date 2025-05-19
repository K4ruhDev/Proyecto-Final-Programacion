import Image from "next/image"
import { Coffee, Leaf, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Onsen Coffee",
  description:
    "Descubre la pasión y dedicación detrás de cada taza de Onsen Coffee. Conoce nuestra historia, valores y el equipo que hace posible nuestro café excepcional.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-50 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 animate-fadeIn">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary-900">Nuestra Historia</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Descubre la pasión y dedicación detrás de cada taza de Onsen Coffee.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 animate-fadeInLeft">
              <h2 className="text-3xl font-bold tracking-tighter text-primary-900">De la Semilla a la Taza</h2>
              <p className="text-muted-foreground">
                Onsen Coffee nació en 2015 de la pasión de un grupo de amigos por el café excepcional. Lo que comenzó
                como una pequeña cafetería en el centro de la ciudad ha crecido hasta convertirse en una marca
                reconocida por su compromiso con la calidad y la sostenibilidad.
              </p>
              <p className="text-muted-foreground">
                Nuestro nombre, "Onsen", se inspira en los baños termales japoneses, simbolizando nuestro enfoque en la
                armonía, la pureza y el equilibrio perfecto en cada taza de café que servimos.
              </p>
              <p className="text-muted-foreground">
                Trabajamos directamente con agricultores de todo el mundo, estableciendo relaciones duraderas basadas en
                el respeto mutuo y prácticas comerciales justas. Cada grano que tostamos cuenta una historia única sobre
                su origen, cultivo y las personas que lo hicieron posible.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl animate-fadeInRight">
              <Image src="/images/coffee-origins.png" alt="Barista preparando café" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-20 bg-primary-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 animate-fadeIn">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-900">Nuestros Valores</h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              Estos principios guían todo lo que hacemos, desde la selección de nuestros granos hasta el servicio al
              cliente.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<Coffee className="h-10 w-10 text-primary-600" />}
              title="Calidad sin Compromiso"
              description="Seleccionamos y tostamos solo los mejores granos de café, garantizando una experiencia excepcional en cada taza."
              index={0}
            />
            <ValueCard
              icon={<Leaf className="h-10 w-10 text-primary-600" />}
              title="Sostenibilidad"
              description="Nos comprometemos con prácticas sostenibles en toda nuestra cadena de suministro, desde el cultivo hasta el empaque."
              index={1}
            />
            <ValueCard
              icon={<Award className="h-10 w-10 text-primary-600" />}
              title="Transparencia"
              description="Creemos en la transparencia total sobre el origen de nuestros cafés y nuestras prácticas comerciales."
              index={2}
            />
            <ValueCard
              icon={<Users className="h-10 w-10 text-primary-600" />}
              title="Comunidad"
              description="Apoyamos a las comunidades productoras de café y fomentamos un ambiente acogedor para nuestros clientes."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 animate-fadeIn">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-900">Nuestro Proceso de Tostado</h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              El arte y la ciencia detrás de cada lote de café que tostamos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-xl overflow-hidden shadow-xl animate-fadeInLeft">
              <Image src="/images/coffee-roasting.png" alt="Proceso de tostado de café" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2 space-y-4 animate-fadeInRight">
              <h3 className="text-2xl font-bold text-primary-900">Artesanía y Precisión</h3>
              <p className="text-muted-foreground">
                Nuestro proceso de tostado combina tradición artesanal con tecnología moderna. Cada lote se tuesta en
                pequeñas cantidades para garantizar un control preciso y consistencia en el perfil de sabor.
              </p>
              <p className="text-muted-foreground">
                Nuestros maestros tostadores, con años de experiencia, supervisan cada paso del proceso, ajustando
                parámetros como temperatura y tiempo para resaltar las características únicas de cada origen.
              </p>
              <p className="text-muted-foreground">
                Después del tostado, cada lote pasa por un riguroso control de calidad, incluyendo catas profesionales,
                antes de ser empacado y enviado a tu puerta, garantizando la máxima frescura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 md:py-20 bg-primary-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 animate-fadeIn">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-900">Nuestro Equipo</h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              Conoce a las personas apasionadas que hacen posible Onsen Coffee.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Carlos Méndez"
              role="Fundador y Maestro Tostador"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
              index={0}
            />
            <TeamMember
              name="María González"
              role="Directora de Operaciones"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              index={1}
            />
            <TeamMember
              name="Alejandro Rodríguez"
              role="Barista Principal"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 animate-fadeIn">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-900">Únete a Nuestra Comunidad</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg">
              ¿Tienes preguntas o comentarios? Nos encantaría saber de ti. Contáctanos o visita nuestra tienda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700">
                <Link href="/contact">Contáctanos</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">Explorar Productos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ValueCard({ icon, title, description, index }) {
  return (
    <Card className="border border-primary-100 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="rounded-full bg-primary-100 p-4 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-primary-900">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function TeamMember({ name, role, image, index }) {
  return (
    <div className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <h3 className="text-xl font-bold text-primary-900">{name}</h3>
      <p className="text-muted-foreground">{role}</p>
    </div>
  )
}
