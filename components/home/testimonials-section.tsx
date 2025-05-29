import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Barista profesional",
    content:
      "El café de Onsen Coffee es simplemente excepcional. Los sabores son complejos y equilibrados, y la frescura es incomparable. Lo recomiendo a todos mis clientes.",
    avatar: "https://plus.unsplash.com/premium_photo-1708110770130-73646eb669d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGJvYnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Entusiasta del café",
    content:
      "Desde que descubrí Onsen Coffee, no puedo tomar otro café. La calidad es constante y el servicio al cliente es excelente. Siempre recibo mi pedido a tiempo y en perfectas condiciones.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
  {
    id: 3,
    name: "Laura Martínez",
    role: "Chef y propietaria de restaurante",
    content:
      "Utilizamos exclusivamente café de Onsen Coffee en nuestro restaurante. Nuestros clientes siempre comentan lo delicioso que es el café que servimos. La calidad y consistencia son inigualables.",
    avatar: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2 font-playfair">Lo que dicen nuestros clientes</h2>
          <p className="text-muted-foreground max-w-2xl">
            Descubre por qué nuestros clientes aman nuestro café y vuelven por más.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slideUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary-500 text-primary-500" />
                  ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
