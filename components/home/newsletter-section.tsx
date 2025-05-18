import NewsletterSignup from "@/components/newsletter-signup"

export default function NewsletterSection() {
  return (
    <section className="py-12 md:py-24 bg-primary-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 animate-fadeIn">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Únete a Nuestra Comunidad de Café</h2>
            <p className="mx-auto max-w-[700px] text-primary-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Suscríbete a nuestro boletín para recibir consejos de preparación, ofertas especiales y acceso anticipado
              a nuevos lanzamientos.
            </p>
          </div>
          <div className="w-full max-w-md animate-fadeInUp">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  )
}
