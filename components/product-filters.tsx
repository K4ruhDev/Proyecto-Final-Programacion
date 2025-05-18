"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([10, 40])
  const [openCategories, setOpenCategories] = useState(true)
  const [openOrigin, setOpenOrigin] = useState(true)
  const [openRoast, setOpenRoast] = useState(true)
  const [openPrice, setOpenPrice] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filtros</h3>
        <Button variant="outline" size="sm" className="w-full">
          Limpiar Todo
        </Button>
      </div>

      <Separator />

      <Collapsible open={openCategories} onOpenChange={setOpenCategories}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <span>Categoría</span>
          <ChevronDownIcon className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="coffee-beans" />
              <Label htmlFor="coffee-beans" className="font-normal">
                Granos de Café
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="ground-coffee" />
              <Label htmlFor="ground-coffee" className="font-normal">
                Café Molido
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="coffee-pods" />
              <Label htmlFor="coffee-pods" className="font-normal">
                Cápsulas de Café
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="brewing-equipment" />
              <Label htmlFor="brewing-equipment" className="font-normal">
                Equipos de Preparación
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="gift-sets" />
              <Label htmlFor="gift-sets" className="font-normal">
                Sets de Regalo
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={openOrigin} onOpenChange={setOpenOrigin}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <span>Origen</span>
          <ChevronDownIcon className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="ethiopia" />
              <Label htmlFor="ethiopia" className="font-normal">
                Etiopía
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="colombia" />
              <Label htmlFor="colombia" className="font-normal">
                Colombia
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="brazil" />
              <Label htmlFor="brazil" className="font-normal">
                Brasil
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="guatemala" />
              <Label htmlFor="guatemala" className="font-normal">
                Guatemala
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="costa-rica" />
              <Label htmlFor="costa-rica" className="font-normal">
                Costa Rica
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="kenya" />
              <Label htmlFor="kenya" className="font-normal">
                Kenia
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="indonesia" />
              <Label htmlFor="indonesia" className="font-normal">
                Indonesia
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={openRoast} onOpenChange={setOpenRoast}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <span>Nivel de Tueste</span>
          <ChevronDownIcon className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="light" />
              <Label htmlFor="light" className="font-normal">
                Ligero
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium-light" />
              <Label htmlFor="medium-light" className="font-normal">
                Medio-Ligero
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium" />
              <Label htmlFor="medium" className="font-normal">
                Medio
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium-dark" />
              <Label htmlFor="medium-dark" className="font-normal">
                Medio-Oscuro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="dark" />
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
          <ChevronDownIcon className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4">
          <div className="space-y-4">
            <Slider
              defaultValue={[10, 40]}
              max={50}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
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

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
