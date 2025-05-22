"use client"

import { useState, useEffect } from "react"
import { Filter, Grid3X3, List, Search, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ProductFilters from "@/components/products/product-filters"
import ProductCard from "@/components/products/product-card"
import ProductSort from "@/components/products/product-sort"
import { getProductsByCategory, getProductsBySearch } from "@/lib/data"
import type { Product } from "@/lib/types"
import AddToCartButton from "@/components/products/add-to-cart-button"

interface ProductsPageProps {
  searchParams?: {
    category?: string
    origin?: string
    roast?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    search?: string
  }
}

export default function ProductsPage({ searchParams = {} }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Get filtered products
  useEffect(() => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      let filteredProducts = searchParams.search
          ? getProductsBySearch(searchParams.search)
          : getProductsByCategory(searchParams.category)

      // Filter by origin
      if (searchParams.origin) {
        filteredProducts = filteredProducts.filter((product) => product.origin === searchParams.origin)
      }

      // Filter by roast
      if (searchParams.roast) {
        filteredProducts = filteredProducts.filter((product) => product.roast === searchParams.roast)
      }

      // Filter by price
      if (searchParams.minPrice || searchParams.maxPrice) {
        const minPrice = searchParams.minPrice ? Number.parseFloat(searchParams.minPrice) : 0
        const maxPrice = searchParams.maxPrice ? Number.parseFloat(searchParams.maxPrice) : 1000
        filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)
      }

      // Sort products
      if (searchParams.sort) {
        switch (searchParams.sort) {
          case "newest":
            filteredProducts = [...filteredProducts].sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1))
            break
          case "price-asc":
            filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
            break
          case "price-desc":
            filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
            break
          case "name-asc":
            filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
            break
          default:
            // Default is featured
            filteredProducts = [...filteredProducts].sort((a, b) =>
                a.featured === b.featured ? 0 : a.featured ? -1 : 1,
            )
        }
      } else {
        // Default sort is featured
        filteredProducts = [...filteredProducts].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
      }

      // Build active filters array
      const filters = []
      if (searchParams.category) filters.push(`Categoría: ${searchParams.category}`)
      if (searchParams.origin) filters.push(`Origen: ${searchParams.origin}`)
      if (searchParams.roast) filters.push(`Tueste: ${searchParams.roast}`)
      if (searchParams.minPrice && searchParams.maxPrice) {
        filters.push(`Precio: $${searchParams.minPrice} - $${searchParams.maxPrice}`)
      } else if (searchParams.minPrice) {
        filters.push(`Precio: >$${searchParams.minPrice}`)
      } else if (searchParams.maxPrice) {
        filters.push(`Precio: <$${searchParams.maxPrice}`)
      }

      setActiveFilters(filters)
      setProducts(filteredProducts)
      setIsLoading(false)
    }, 800)
  }, [searchParams])

  // Remove a specific filter
  const removeFilter = (filter: string) => {
    const newSearchParams = new URLSearchParams()

    // Copy current search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (
          (filter.startsWith("Categoría") && key === "category") ||
          (filter.startsWith("Origen") && key === "origin") ||
          (filter.startsWith("Tueste") && key === "roast") ||
          (filter.startsWith("Precio") && (key === "minPrice" || key === "maxPrice"))
      ) {
        // Skip this param as we're removing it
        return
      }

      newSearchParams.append(key, value)
    })

    // Redirect to new URL
    window.location.href = `/products?${newSearchParams.toString()}`
  }

  // Clear all filters
  const clearAllFilters = () => {
    window.location.href = "/products"
  }

  return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-gradient-to-r from-coffee-light to-white dark:from-gray-900 dark:to-gray-900 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white font-heading">
                Comprar Café
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Explora nuestra selección de cafés especiales de todo el mundo, tostados artesanalmente y enviados
                directamente a tu puerta.
              </p>
              {searchParams.search && (
                  <p className="text-sm mt-2 flex items-center">
                    <Search className="h-3.5 w-3.5 mr-1 text-primary-500" />
                    <span>Resultados para: </span>
                    <span className="font-medium ml-1">"{searchParams.search}"</span>
                  </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters - Desktop */}
              <div className="hidden md:block w-1/4 md:max-w-[280px]">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 sticky top-20">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtros
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-8 text-xs text-muted-foreground hover:text-primary-600"
                    >
                      Limpiar todo
                    </Button>
                  </div>
                  <ProductFilters />
                </div>
              </div>

              {/* Products */}
              <div className="flex-1">
                <div className="flex flex-col gap-6">
                  {/* Mobile Filters Button */}
                  <div className="flex items-center gap-4 md:hidden">
                    <DropdownMenu open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Filter className="mr-2 h-4 w-4" />
                          Filtros
                          {activeFilters.length > 0 && (
                              <Badge className="ml-2 bg-primary-500 text-white">{activeFilters.length}</Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[90vw] p-4">
                        <ProductFilters />
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <ProductSort />
                  </div>

                  {/* Search and Sort - Desktop */}
                  <div className="hidden md:flex items-center justify-between gap-4">
                    <div className="relative w-full max-w-sm">
                      <form action="/products" method="GET">
                        <Input
                            name="search"
                            placeholder="Buscar cafés..."
                            className="pl-8 bg-white border-primary-200 focus-visible:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
                            defaultValue={searchParams.search}
                        />
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      </form>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tabs
                          defaultValue={viewMode}
                          onValueChange={(value) => setViewMode(value as "grid" | "list")}
                          className="w-[70px]"
                      >
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

                  {/* Active Filters */}
                  {activeFilters.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center py-2">
                        <span className="text-sm text-muted-foreground">Filtros activos:</span>
                        {activeFilters.map((filter) => (
                            <Badge
                                key={filter}
                                variant="secondary"
                                className="flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-300"
                            >
                              {filter}
                              <X
                                  className="h-3 w-3 cursor-pointer hover:text-primary-900"
                                  onClick={() => removeFilter(filter)}
                              />
                            </Badge>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="h-7 text-xs text-muted-foreground hover:text-primary-600"
                        >
                          Limpiar todo
                        </Button>
                      </div>
                  )}

                  <Separator className="my-1" />

                  {/* Results Count */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Mostrando <span className="font-medium text-foreground">{products.length}</span> productos
                    </p>
                  </div>

                  {/* Loading State */}
                  {isLoading && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm animate-pulse"
                            >
                              <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                              <div className="p-4">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/4 mb-4"></div>
                                <div className="flex justify-between items-center mb-4">
                                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                                </div>
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}

                  {/* Product Grid */}
                  {!isLoading && products.length > 0 ? (
                      <div
                          className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "flex flex-col gap-3"
                          }
                      >
                        {products.map((product, index) =>
                            viewMode === "grid" ? (
                                <ProductCard key={product.id} product={product} index={index} />
                            ) : (<ProductCard product={product} index={0} viewMode="list" />),
                        )}
                      </div>
                  ) : !isLoading ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 rounded-full bg-primary-50 p-6 dark:bg-primary-900/30">
                          <Search className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-300 mb-2">
                          No se encontraron productos
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          No pudimos encontrar productos que coincidan con tus filtros. Intenta con otros criterios de
                          búsqueda.
                        </p>
                        <Button asChild>
                          <Link href="/products">Ver Todos los Productos</Link>
                        </Button>
                      </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
