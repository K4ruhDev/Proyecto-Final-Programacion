import { Filter, Grid3X3, List } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductFilters from "@/components/products/product-filters"
import ProductCard from "@/components/products/product-card"
import ProductSort from "@/components/products/product-sort"
import { getProductsByCategory, getProductsBySearch } from "@/lib/data"
import type { Metadata } from "next"

interface ProductsPageProps {
  searchParams: {
    category?: string
    origin?: string
    roast?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    search?: string
  }
}

export const metadata: Metadata = {
  title: "Tienda de Café | Onsen Coffee",
  description:
    "Explora nuestra selección de cafés especiales de todo el mundo. Granos frescos, tostados artesanalmente y enviados directamente a tu puerta.",
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  // Get filtered products
  let products = searchParams.search
    ? getProductsBySearch(searchParams.search)
    : getProductsByCategory(searchParams.category)

  // Filter by origin
  if (searchParams.origin) {
    products = products.filter((product) => product.origin === searchParams.origin)
  }

  // Filter by roast
  if (searchParams.roast) {
    products = products.filter((product) => product.roast === searchParams.roast)
  }

  // Filter by price
  if (searchParams.minPrice || searchParams.maxPrice) {
    const minPrice = searchParams.minPrice ? Number.parseFloat(searchParams.minPrice) : 0
    const maxPrice = searchParams.maxPrice ? Number.parseFloat(searchParams.maxPrice) : 1000
    products = products.filter((product) => product.price >= minPrice && product.price <= maxPrice)
  }

  // Sort products
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "newest":
        products = [...products].sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1))
        break
      case "price-asc":
        products = [...products].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products = [...products].sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        products = [...products].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Default is featured
        products = [...products].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
    }
  } else {
    // Default sort is featured
    products = [...products].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary-50 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight text-primary-900">Comprar Café</h1>
            <p className="text-muted-foreground">Explora nuestra selección de cafés especiales de todo el mundo.</p>
            {searchParams.search && (
              <p className="text-sm mt-2">
                Mostrando resultados para: <span className="font-medium">"{searchParams.search}"</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-1/4 md:max-w-[260px] animate-fadeInLeft">
              <ProductFilters />
            </div>

            {/* Products */}
            <div className="flex-1">
              <div className="flex flex-col gap-6">
                {/* Search and Sort - Mobile */}
                <div className="flex items-center gap-4 md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[80vw] p-4">
                      <ProductFilters />
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ProductSort />
                </div>

                {/* Search and Sort - Desktop */}
                <div className="hidden md:flex items-center justify-between gap-4 animate-fadeIn">
                  <div className="relative w-full max-w-sm">
                    <form action="/products" method="GET">
                      <Input
                        name="search"
                        placeholder="Buscar cafés..."
                        className="pl-8 bg-white border-primary-200 focus-visible:ring-primary-500"
                        defaultValue={searchParams.search}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                    </form>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tabs defaultValue="grid" className="w-[120px]">
                      <TabsList className="grid w-full grid-cols-2 h-9">
                        <TabsTrigger value="grid" className="h-8 w-8 p-0">
                          <Grid3X3 className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger value="list" className="h-8 w-8 p-0">
                          <List className="h-4 w-4" />
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <ProductSort />
                  </div>
                </div>

                {/* Product Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
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
                    <h2 className="text-2xl font-bold text-primary-900 mb-2">No se encontraron productos</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      No pudimos encontrar productos que coincidan con tus filtros. Intenta con otros criterios de
                      búsqueda.
                    </p>
                    <Button asChild>
                      <Link href="/products">Ver Todos los Productos</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
