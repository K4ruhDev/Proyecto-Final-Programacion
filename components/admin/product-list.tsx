"use client"

import { useState, useEffect } from "react"
import { getProducts } from "@/lib/services/product-service" // Make sure this path is correct
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase/client" // Adjust path if necessary
import type { Product } from "@/lib/types" // Make sure this path is correct

export function AdminProductList() {
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // We will rely on getProducts from the service to fetch all necessary fields
        const controllerData = await getProducts({
          sort: "name-asc"
        })

        setProducts(controllerData)
      } catch (error: any) {
        console.error("Error fetching products:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, []) // Empty dependency array means this runs once on mount

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return
    }

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) {
        throw error
      }

      setProducts(products.filter((product) => product.id !== id))
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al eliminar el producto",
        variant: "destructive",
      })
    }
  }

  // Local filtering of products based on search term
  const filteredProducts = products.filter(
      (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase()), // Added optional chaining for category
  )

  return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Productos</CardTitle>
              <CardDescription>Gestiona el catálogo de productos</CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo producto
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Buscar productos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
          ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No se encontraron productos</p>
              </div>
          ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagen</TableHead> {/* New TableHead for Image */}
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            {/* Use product.image as per your Product interface */}
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.price.toFixed(2)} €</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {product.featured && (
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                                    Destacado
                                  </Badge>
                              )}
                              {product.new && (
                                  <Badge
                                      variant="outline"
                                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  >
                                    Nuevo
                                  </Badge>
                              )}
                              {product.stock === 0 && (
                                  <Badge
                                      variant="outline"
                                      className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  >
                                    Agotado
                                  </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon" asChild>
                                <Link href={`/admin/products/${product.id}`}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Editar</span>
                                </Link>
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
          )}
        </CardContent>
      </Card>
  )
}