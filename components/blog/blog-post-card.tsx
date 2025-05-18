import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/types"

interface BlogPostCardProps {
  post: BlogPost
  index?: number
  featured?: boolean
}

export default function BlogPostCard({ post, index = 0, featured = false }: BlogPostCardProps) {
  if (featured) {
    return (
      <Card className="overflow-hidden border-none shadow-lg animate-fadeIn">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <CardContent className="p-6 flex flex-col justify-center">
            <div className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 mb-4">
              {post.category}
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 hover:text-primary-700 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {post.date}
              </div>
              {post.readTime && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {post.readTime}
                </div>
              )}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="text-primary-700 font-medium hover:underline inline-flex items-center"
            >
              Leer Artículo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="overflow-hidden border border-primary-100 transition-all hover:shadow-lg animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 mb-3">
          {post.category}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary-700 transition-colors line-clamp-2">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {post.date}
        </div>
      </CardContent>
    </Card>
  )
}
