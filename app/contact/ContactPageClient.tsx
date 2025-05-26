"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { sendContactMessage } from "@/lib/services/contact-service"

export default function ContactPageClient() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await sendContactMessage(formData.name, formData.email, formData.subject, formData.message)

      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos lo antes posible.",
      })

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error al enviar el mensaje:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-50 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 animate-fadeIn">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary-900">Contáctanos</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Estamos aquí para responder tus preguntas y escuchar tus comentarios.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="animate-fadeInLeft">
              <Card className="border border-primary-100 dark:border-dark-border">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-primary-900 dark:text-primary-300">
                    Envíanos un Mensaje
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`border-primary-200 dark:border-dark-border ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`border-primary-200 dark:border-dark-border ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`border-primary-200 dark:border-dark-border ${errors.subject ? "border-red-500" : ""}`}
                      />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`min-h-[150px] border-primary-200 dark:border-dark-border ${errors.message ? "border-red-500" : ""}`}
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
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
                          Enviando...
                        </>
                      ) : (
                        "Enviar Mensaje"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fadeInRight">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-primary-900 dark:text-primary-300">
                  Información de Contacto
                </h2>
                <div className="space-y-4">
                  <ContactInfo
                    icon={<MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
                    title="Dirección"
                    content="Calle del Café 123, 28001 Madrid, España"
                  />
                  <ContactInfo
                    icon={<Phone className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
                    title="Teléfono"
                    content="+34 912 345 678"
                  />
                  <ContactInfo
                    icon={<Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
                    title="Email"
                    content="info@onsencoffee.com"
                  />
                  <ContactInfo
                    icon={<Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
                    title="Horario"
                    content="Lunes a Viernes: 9:00 - 18:00, Sábados: 10:00 - 14:00"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary-900 dark:text-primary-300">Nuestra Ubicación</h2>
                <div className="rounded-lg overflow-hidden h-[300px] border border-primary-100 dark:border-dark-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12147.354030289067!2d-3.7037974302246107!3d40.41677007936128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Spain!5e0!3m2!1sen!2sus!4v1621345678901!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-primary-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 animate-fadeIn">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-900 dark:text-primary-300">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              Respuestas a las preguntas más comunes sobre nuestros productos y servicios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FaqItem
              question="¿Cuánto tiempo tardan en llegar mis pedidos?"
              answer="Los pedidos suelen procesarse en 1-2 días hábiles. El tiempo de entrega depende de tu ubicación, pero generalmente es de 2-5 días hábiles adicionales."
              index={0}
            />
            <FaqItem
              question="¿Ofrecen envío internacional?"
              answer="Sí, enviamos a varios países. Los costos y tiempos de envío varían según la ubicación. Puedes ver las opciones disponibles durante el proceso de pago."
              index={1}
            />
            <FaqItem
              question="¿Cómo puedo saber qué café es adecuado para mí?"
              answer="Recomendamos comenzar con nuestro pack de degustación o contactar con nuestro equipo para una recomendación personalizada basada en tus preferencias de sabor."
              index={2}
            />
            <FaqItem
              question="¿Cuál es la mejor forma de almacenar el café?"
              answer="Para mantener la frescura, almacena el café en un recipiente hermético, en un lugar fresco y seco, alejado de la luz directa. Evita el refrigerador, ya que el café puede absorber olores."
              index={3}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactInfo({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h3 className="font-medium text-primary-900 dark:text-primary-300">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
      </div>
    </div>
  )
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  return (
    <Card
      className="border border-primary-100 dark:border-dark-border animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2 text-primary-900 dark:text-primary-300">{question}</h3>
        <p className="text-muted-foreground">{answer}</p>
      </CardContent>
    </Card>
  )
}
