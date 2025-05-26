import { Suspense } from "react"
import {Search, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductFilters from "@/components/products/product-filters"
import { getProductsServer, type ProductFilter } from "@/lib/services/product-service"
import ProductsClient from "./product-client"

interface ProductsPageProps {
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

// Loading component
function ProductsLoading() {
  return (
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
  )
}

// Convert searchParams to ProductFilter
function buildFilters(searchParams: ProductsPageProps['searchParams']): ProductFilter {
  const filters: ProductFilter = {}

  if (searchParams?.category) filters.category = searchParams.category
  if (searchParams?.origin) filters.origin = searchParams.origin
  if (searchParams?.roast) filters.roast = searchParams.roast
  if (searchParams?.search) filters.search = searchParams.search
  if (searchParams?.sort) filters.sort = searchParams.sort
  
  if (searchParams?.minPrice) {
    filters.minPrice = parseFloat(searchParams.minPrice)
  }
  if (searchParams?.maxPrice) {
    filters.maxPrice = parseFloat(searchParams.maxPrice)
  }
  if (searchParams?.featured === 'true') {
    filters.featured = true
  }
  if (searchParams?.new === 'true') {
    filters.new = true
  }

  return filters
}

// Build active filters array for display
function buildActiveFilters(searchParams: ProductsPageProps['searchParams']): string[] {
  const filters: string[] = []
  
  if (searchParams?.category) filters.push(`Categoría: ${searchParams.category}`)
  if (searchParams?.origin) filters.push(`Origen: ${searchParams.origin}`)
  if (searchParams?.roast) filters.push(`Tueste: ${searchParams.roast}`)
  if (searchParams?.featured === 'true') filters.push('Destacados')
  if (searchParams?.new === 'true') filters.push('Nuevos')
  
  if (searchParams?.minPrice && searchParams?.maxPrice) {
    filters.push(`Precio: $${searchParams.minPrice} - $${searchParams.maxPrice}`)
  } else if (searchParams?.minPrice) {
    filters.push(`Precio: >$${searchParams.minPrice}`)
  } else if (searchParams?.maxPrice) {
    filters.push(`Precio: <$${searchParams.maxPrice}`)
  }

  return filters
}

// Server component that fetches data
async function ProductsContent({ searchParams }: ProductsPageProps) {
  const filters = buildFilters(searchParams)
  const activeFilters = buildActiveFilters(searchParams)
  
  try {
    const products = await getProductsServer(filters)
    
    return (
      <ProductsClient 
        initialProducts={products} 
        activeFilters={activeFilters}
        searchParams={searchParams}
      />
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-red-50 p-6 dark:bg-red-900/30">
          <X className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-2">
          Error al cargar productos
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Hubo un problema al cargar los productos. Por favor, inténtalo de nuevo.
        </p>
        <Button asChild>
          <Link href="/products">Recargar página</Link>
        </Button>
      </div>
    )
  }
}

export default function ProductsPage({ searchParams = {} }: ProductsPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
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

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden md:block w-1/4 md:max-w-[280px]">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </h2>
                  <Button asChild variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-primary-600">
                    <Link href="/products">Limpiar todo</Link>
                  </Button>
                </div>
                <ProductFilters />
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              <Suspense fallback={<ProductsLoading />}>
                <ProductsContent searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}