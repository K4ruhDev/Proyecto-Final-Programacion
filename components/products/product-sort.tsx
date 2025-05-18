"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get("sort") || "featured"

  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set("sort", sort)
    router.push(`/products?${newParams.toString()}`)
  }

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case "featured":
        return "Destacados"
      case "newest":
        return "Más recientes"
      case "price-asc":
        return "Precio: Bajo a alto"
      case "price-desc":
        return "Precio: Alto a bajo"
      case "name-asc":
        return "Nombre: A-Z"
      default:
        return "Destacados"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Ordenar: {getSortLabel(currentSort)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSortChange("featured")}>Destacados</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSortChange("newest")}>Más recientes</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSortChange("price-asc")}>Precio: Bajo a alto</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSortChange("price-desc")}>Precio: Alto a bajo</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSortChange("name-asc")}>Nombre: A-Z</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
