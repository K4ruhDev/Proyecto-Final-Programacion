"use client"

import { useState, useEffect } from "react"
import { Search, X, Coffee, FileText, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductsBySearch, getBlogPostsBySearch } from "@/lib/data"
import type { Product, BlogPost } from "@/lib/types"

export default function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("products")
  const [isSearching, setIsSearching] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const router = useRouter()

  // Perform search when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        setIsSearching(true)

        // Search products
        const foundProducts = getProductsBySearch(query)
        setProducts(foundProducts)

        // Search blog posts
        const foundPosts = getBlogPostsBySearch(query)
        setPosts(foundPosts)

        setIsSearching(false)
      } else {
        setProducts([])
        setPosts([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleNavigate = (url: string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Buscar">
          <Search className="h-5 w-5" />
          <span className="sr-only">Buscar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0">
        <DialogHeader className="px-4 pt-5 pb-0">
          <DialogTitle className="sr-only">Buscar</DialogTitle>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar productos, artículos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              autoFocus
            />
            {query && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQuery("")}>
                <X className="h-4 w-4" />
                <span className="sr-only">Limpiar</span>
              </Button>
            )}
          </div>
        </DialogHeader>
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <TabsContent value="products" className="m-0">
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                </div>
              ) : products.length > 0 ? (
                <div className="divide-y">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      className="flex w-full items-center gap-4 p-4 hover:bg-primary-50 text-left transition-colors"
                      onClick={() => handleNavigate(`/products/${product.slug}`)}
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="font-medium text-primary-900 truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {product.origin} · {product.roast}
                        </p>
                      </div>
                      <div className="font-medium">${product.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              ) : query.length > 2 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Coffee className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-1">No se encontraron productos</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    No pudimos encontrar productos que coincidan con "{query}". Intenta con otros términos.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-1">Busca productos</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Escribe al menos 3 caracteres para buscar productos por nombre, origen o tipo de tueste.
                  </p>
                </div>
              )}
              {products.length > 0 && (
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setOpen(false)
                      router.push(`/products?search=${encodeURIComponent(query)}`)
                    }}
                  >
                    Ver todos los resultados
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="blog" className="m-0">
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                </div>
              ) : posts.length > 0 ? (
                <div className="divide-y">
                  {posts.map((post) => (
                    <button
                      key={post.id}
                      className="flex w-full items-center gap-4 p-4 hover:bg-primary-50 text-left transition-colors"
                      onClick={() => handleNavigate(`/blog/${post.slug}`)}
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="font-medium text-primary-900 truncate">{post.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{post.category}</p>
                      </div>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              ) : query.length > 2 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-1">No se encontraron artículos</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    No pudimos encontrar artículos que coincidan con "{query}". Intenta con otros términos.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-1">Busca artículos</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Escribe al menos 3 caracteres para buscar artículos por título, contenido o categoría.
                  </p>
                </div>
              )}
              {posts.length > 0 && (
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setOpen(false)
                      router.push(`/blog?search=${encodeURIComponent(query)}`)
                    }}
                  >
                    Ver todos los resultados
                  </Button>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
