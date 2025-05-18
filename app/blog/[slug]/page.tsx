import { ArrowLeft, Calendar, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/data"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Artículo no encontrado | Onsen Coffee",
      description: "Lo sentimos, el artículo que buscas no está disponible.",
    }
  }

  return {
    title: `${post.title} | Blog de Onsen Coffee`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author.name] : undefined,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(params.slug, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-primary-700 mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver al Blog
        </Link>

        <article className="max-w-3xl mx-auto">
          <div className="mb-8 animate-fadeIn">
            <div className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {post.date}
              </div>
              {post.readTime && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.readTime}
                </div>
              )}
            </div>
          </div>

          <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden shadow-xl animate-fadeIn">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          {post.author && (
            <div className="flex items-center gap-4 mb-8 animate-fadeIn">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md">
                <Image
                  src={post.author.image || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.role}</div>
              </div>
            </div>
          )}

          <div
            className="prose prose-green max-w-none mb-8 animate-fadeIn dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
          />

          <Separator className="my-8" />

          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="font-medium">Comparte este artículo</div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full transition-transform hover:scale-110">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Compartir en Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full transition-transform hover:scale-110">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Compartir en Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full transition-transform hover:scale-110">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Compartir en LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full transition-transform hover:scale-110">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Compartir en Instagram</span>
              </Button>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-primary-900 mb-6 animate-fadeIn">Artículos Relacionados</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden border border-primary-100 transition-all hover:shadow-lg animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 mb-3">
                      {relatedPost.category}
                    </div>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-primary-700 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {relatedPost.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
