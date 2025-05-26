"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { ChevronDown } from "lucide-react"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([10, 40])
  const [openCategories, setOpenCategories] = useState(true)
  const [openOrigin, setOpenOrigin] = useState(true)
  const [openRoast, setOpenRoast] = useState(true)
  const [openPrice, setOpenPrice] = useState(true)

  // Get current filters from URL
  const currentCategory = searchParams.get("category") || "all"
  const currentOrigin = searchParams.get("origin") || ""
  const currentRoast = searchParams.get("roast") || ""
  const currentMinPrice = searchParams.get("minPrice") || "10"
  const currentMaxPrice = searchParams.get("maxPrice") || "40"

  // Update URL with filters
  const updateFilters = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString())

    // Update or delete params
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })

    router.push(`/products?${newParams.toString()}`)
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    updateFilters({ category })
  }

  // Handle origin change
  const handleOriginChange = (origin: string) => {
    updateFilters({ origin })
  }

  // Handle roast change
  const handleRoastChange = (roast: string) => {
    updateFilters({ roast })
  }

  // Handle price change
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    updateFilters({ minPrice: values[0].toString(), maxPrice: values[1].toString() })
  }

  // Clear all filters
  const clearFilters = () => {
    router.push("/products")
    setPriceRange([10, 40])
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filtros</h3>
        <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
          Limpiar Todo
        </Button>
      </div>

      <Separator />

      <Collapsible open={openCategories} onOpenChange={setOpenCategories}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <span>Categoría</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all"
                checked={currentCategory === "all"}
                onCheckedChange={() => handleCategoryChange("")}
              />
              <Label htmlFor="all" className="font-normal">
                Todos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="single-origin"
                checked={currentCategory === "single-origin"}
                onCheckedChange={() => handleCategoryChange("single-origin")}
              />
              <Label htmlFor="single-origin" className="font-normal">
                Origen Único
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="blends"
                checked={currentCategory === "blends"}
                onCheckedChange={() => handleCategoryChange("blends")}
              />
              <Label htmlFor="blends" className="font-normal">
                Mezclas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="decaf"
                checked={currentCategory === "decaf"}
                onCheckedChange={() => handleCategoryChange("decaf")}
              />
              <Label htmlFor="decaf" className="font-normal">
                Descafeinado
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={openOrigin} onOpenChange={setOpenOrigin}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <span>Origen</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ethiopia"
                checked={currentOrigin === "Etiopía"}
                onCheckedChange={() => handleOriginChange(currentOrigin === "Etiopía" ? "" : "Etiopía")}
              />
              <Label htmlFor="ethiopia" className="font-normal">
                Etiopía
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="colombia"
                checked={currentOrigin === "Colombia"}
                onCheckedChange={() => handleOriginChange(currentOrigin === "Colombia" ? "" : "Colombia")}
              />
              <Label htmlFor="colombia" className="font-normal">
                Colombia
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="brazil"
                checked={currentOrigin === "Brasil"}
                onCheckedChange={() => handleOriginChange(currentOrigin === "Brasil" ? "" : "Brasil")}
              />
              <Label htmlFor="brazil" className="font-normal">
                Brasil
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="guatemala"
                checked={currentOrigin === "Guatemala"}
                onCheckedChange={() => handleOriginChange(currentOrigin === "Guatemala" ? "" : "Guatemala")}
              />
              <Label htmlFor="guatemala" className="font-normal">
                Guatemala
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="costa-rica"
                checked={currentOrigin === "Costa Rica"}
                onCheckedChange={() => handleOriginChange(currentOrigin === "Costa Rica" ? "" : "Costa Rica")}
              />
              <Label htmlFor="costa-rica" className="font-normal">
                Costa Rica
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={openRoast} onOpenChange={setOpenRoast}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <span>Nivel de Tueste</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="light"
                checked={currentRoast === "Ligero"}
                onCheckedChange={() => handleRoastChange(currentRoast === "Ligero" ? "" : "Ligero")}
              />
              <Label htmlFor="light" className="font-normal">
                Ligero
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medium-light"
                checked={currentRoast === "Medio-Ligero"}
                onCheckedChange={() => handleRoastChange(currentRoast === "Medio-Ligero" ? "" : "Medio-Ligero")}
              />
              <Label htmlFor="medium-light" className="font-normal">
                Medio-Ligero
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medium"
                checked={currentRoast === "Medio"}
                onCheckedChange={() => handleRoastChange(currentRoast === "Medio" ? "" : "Medio")}
              />
              <Label htmlFor="medium" className="font-normal">
                Medio
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medium-dark"
                checked={currentRoast === "Medio-Oscuro"}
                onCheckedChange={() => handleRoastChange(currentRoast === "Medio-Oscuro" ? "" : "Medio-Oscuro")}
              />
              <Label htmlFor="medium-dark" className="font-normal">
                Medio-Oscuro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dark"
                checked={currentRoast === "Oscuro"}
                onCheckedChange={() => handleRoastChange(currentRoast === "Oscuro" ? "" : "Oscuro")}
              />
              <Label htmlFor="dark" className="font-normal">
                Oscuro
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={openPrice} onOpenChange={setOpenPrice}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <span>Rango de Precio</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4">
          <div className="space-y-4">
            <Slider
              defaultValue={[Number.parseFloat(currentMinPrice), Number.parseFloat(currentMaxPrice)]}
              max={50}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              onValueCommit={handlePriceChange}
              className="py-4"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
