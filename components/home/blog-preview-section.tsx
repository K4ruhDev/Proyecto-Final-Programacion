import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BlogPreviewSection() {
  const blogPosts = [
    {
      id: 1,
      title: "El Arte del Pour Over",
      excerpt: "Domina la técnica de preparación pour over para una taza limpia y llena de sabor cada vez.",
      date: "Mayo 11, 2023",
      image: "/images/pour-over.png",
      slug: "el-arte-del-pour-over",
    },
    {
      id: 2,
      title: "Entendiendo los Orígenes del Café",
      excerpt: "Cómo la geografía, el clima y los métodos de procesamiento afectan el perfil de sabor de tu café.",
      date: "Mayo 12, 2023",
      image: "/images/coffee-origins.png",
      slug: "entendiendo-los-origenes-del-cafe",
    },
    {
      id: 3,
      title: "Preparando el Espresso Perfecto",
      excerpt: "Consejos y trucos de nuestros baristas para extraer el shot perfecto de espresso.",
      date: "Mayo 13, 2023",
      image: "/images/espresso.png",
      slug: "preparando-el-espresso-perfecto",
    },
  ]

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 animate-fadeIn">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-800">
              Conocimiento del Café
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary-900">De Nuestro Blog</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sumérgete en el mundo del café especial con nuestros últimos artículos y guías de preparación.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-primary-200 text-primary-700 hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
            >
              Ver Todos los Artículos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface BlogPostCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    date: string
    image: string
    slug: string
  }
  index: number
}

function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <Card
      className="overflow-hidden border border-primary-100 transition-all hover:shadow-lg animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          width={500}
          height={300}
          alt={post.title}
          className="object-cover w-full transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
        <h3 className="text-xl font-bold mb-2 text-primary-900">{post.title}</h3>
        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="text-primary-700 font-medium inline-flex items-center group">
          Leer Más <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
