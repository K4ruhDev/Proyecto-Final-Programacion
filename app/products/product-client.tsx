"use client"

import { useState } from "react"
import { Filter, Grid3X3, List, Search, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ProductFilters from "@/components/products/product-filters"
import ProductCard from "@/components/products/product-card"
import ProductSort from "@/components/products/product-sort"
import type { Product } from "@/lib/types"

interface ProductsClientProps {
  initialProducts: Product[]
  activeFilters: string[]
  searchParams?: {
    category?: string
    origin?: string
    roast?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    search?: string
    featured?: string
    new?: string
  }
}

export default function ProductsClient({ 
  initialProducts, 
  activeFilters, 
  searchParams = {} 
}: ProductsClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Remove a specific filter
  const removeFilter = (filter: string) => {
    const newSearchParams = new URLSearchParams()

    // Copy current search params except the one being removed
    Object.entries(searchParams).forEach(([key, value]) => {
      if (
        (filter.startsWith("Categoría") && key === "category") ||
        (filter.startsWith("Origen") && key === "origin") ||
        (filter.startsWith("Tueste") && key === "roast") ||
        (filter === "Destacados" && key === "featured") ||
        (filter === "Nuevos" && key === "new") ||
        (filter.startsWith("Precio") && (key === "minPrice" || key === "maxPrice"))
      ) {
        return // Skip this param as we're removing it
      }

      if (value) {
        newSearchParams.append(key, value)
      }
    })

    // Redirect to new URL
    const newUrl = newSearchParams.toString() 
      ? `/products?${newSearchParams.toString()}`
      : '/products'
    window.location.href = newUrl
  }

  // Clear all filters
  const clearAllFilters = () => {
    window.location.href = "/products"
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchValue = formData.get('search') as string
    
    const newSearchParams = new URLSearchParams()
    
    // Keep existing params except search
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'search' && value) {
        newSearchParams.append(key, value)
      }
    })
    
    // Add new search if provided
    if (searchValue?.trim()) {
      newSearchParams.append('search', searchValue.trim())
    }
    
    const newUrl = newSearchParams.toString() 
      ? `/products?${newSearchParams.toString()}`
      : '/products'
    window.location.href = newUrl
  }

  return (
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
          <DropdownMenuContent className="w-[90vw] p-4" align="start">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filtros</h3>
              <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                <Link href="/products">Limpiar</Link>
              </Button>
            </div>
            <ProductFilters />
          </DropdownMenuContent>
        </DropdownMenu>
        <ProductSort />
      </div>

      {/* Search and Sort - Desktop */}
      <div className="hidden md:flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <form onSubmit={handleSearchSubmit}>
            <Input
              name="search"
              placeholder="Buscar cafés..."
              className="pl-8 bg-white border-primary-200 focus-visible:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
              defaultValue={searchParams.search || ''}
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
        </div>
        <div className="flex items-center gap-2">
          <Tabs
            value={viewMode}
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
              className="flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-300 cursor-pointer hover:bg-primary-100"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="h-3 w-3" />
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
          Mostrando <span className="font-medium text-foreground">{initialProducts.length}</span> productos
        </p>
      </div>

      {/* Product Grid/List */}
      {initialProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {initialProducts.map((product, index) =>
            viewMode === "grid" ? (
              <ProductCard key={product.id} product={product} index={index} />
            ) : (<ProductCard key={product.id} product={product} index={index} viewMode="list"/>)
          )}
        </div>
      ) : (
        /* No Products Found */
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
      )}
    </div>
  )
}