"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BlogPostCard from "@/components/blog/blog-post-card"
import { blogPosts, getBlogPostsByCategory, getBlogPostsBySearch } from "@/lib/data"

export default function BlogPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const category = searchParams.get("category") || "Todos"
  const search = searchParams.get("search") || ""

  useEffect(() => {
    setIsLoading(true)

    // Get filtered blog posts
    const filteredPosts = search ? getBlogPostsBySearch(search) : getBlogPostsByCategory(category)

    setPosts(filteredPosts)
    setIsLoading(false)
  }, [category, search])

  const featuredPost = posts[0] || blogPosts[0]
  const regularPosts = posts.slice(1)

  const categories = [
    "Todos",
    "Guías de Preparación",
    "Conocimiento del Café",
    "Ciencia del Café",
    "Sostenibilidad",
  ]

  const handleCategoryChange = (value) => {
    if (value === "Todos") {
      router.push("/blog")
    } else {
      router.push(`/blog?category=${value}`)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const searchQuery = formData.get("search")

    if (searchQuery) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/blog")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary-50 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight text-primary-900">Conocimiento del Café</h1>
            <p className="text-muted-foreground">
              Sumérgete en el mundo del café especial con nuestros últimos artículos y guías de preparación.
            </p>
            {search && (
              <p className="text-sm mt-2">
                Mostrando resultados para: <span className="font-medium">"{search}"</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-8">
          <div className="grid gap-8">
            {/* Search and Categories */}
            <div className="flex flex-col md:flex-row gap-4 justify-between animate-fadeIn">
              <div className="relative w-full md:w-1/3">
                <form onSubmit={handleSearch}>
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="search"
                    placeholder="Buscar artículos..."
                    className="pl-8 bg-white border-primary-200 focus-visible:ring-primary-500"
                    defaultValue={search}
                  />
                </form>
              </div>
              <Tabs defaultValue={category} className="w-full md:w-auto">
                <TabsList className="bg-primary-50 p-1 h-auto flex flex-wrap">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      className="data-[state=active]:bg-white rounded-md px-3 py-1.5 text-sm"
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : posts.length > 0 ? (
              <>
                <BlogPostCard post={featuredPost} featured />

                <Separator className="my-2" />

                {/* All Posts */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {regularPosts.map((post, index) => (
                    <BlogPostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-primary-50 p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-primary-600"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary-900 mb-2">No se encontraron artículos</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  No pudimos encontrar artículos que coincidan con tu búsqueda. Intenta con otros términos.
                </p>
                <Button asChild>
                  <Link href="/blog">Ver Todos los Artículos</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
