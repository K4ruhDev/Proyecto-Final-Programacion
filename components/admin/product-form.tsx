"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

// Create slugify function directly in the component
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  price: z.coerce.number().min(0.01, {
    message: "El precio debe ser mayor que 0.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  shortDescription: z
    .string()
    .min(5, {
      message: "La descripción corta debe tener al menos 5 caracteres.",
    })
    .max(150, {
      message: "La descripción corta no debe exceder los 150 caracteres.",
    }),
  origin: z.string().min(2, {
    message: "El origen debe tener al menos 2 caracteres.",
  }),
  roast: z.string().min(1, {
    message: "Selecciona un nivel de tueste.",
  }),
  weight: z.string().min(1, {
    message: "Ingresa el peso del producto.",
  }),
  process: z.string().optional(),
  altitude: z.string().optional(),
  flavorNotes: z.string().optional(),
  image: z.string().min(1, {
    message: "Ingresa una URL de imagen.",
  }),
  category: z.string().min(1, {
    message: "Selecciona una categoría.",
  }),
  featured: z.boolean().default(false),
  new: z.boolean().default(false),
  stock: z.coerce.number().min(0, {
    message: "El stock no puede ser negativo.",
  }),
})

interface ProductFormProps {
  initialData?: any
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          flavorNotes: initialData.flavor_notes ? initialData.flavor_notes.join(", ") : "",
          shortDescription: initialData.short_description,
        }
      : {
          name: "",
          price: 0,
          description: "",
          shortDescription: "",
          origin: "",
          roast: "",
          weight: "340g",
          process: "",
          altitude: "",
          flavorNotes: "",
          image: "/placeholder.svg?height=400&width=600&text=Café",
          category: "",
          featured: false,
          new: false,
          stock: 0,
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const slug = initialData?.slug || slugify(values.name)
      const flavorNotesArray = values.flavorNotes ? values.flavorNotes.split(",").map((note) => note.trim()) : null

      const productData = {
        name: values.name,
        price: values.price,
        description: values.description,
        short_description: values.shortDescription,
        origin: values.origin,
        roast: values.roast,
        weight: values.weight,
        process: values.process || null,
        altitude: values.altitude || null,
        flavor_notes: flavorNotesArray,
        image: values.image,
        slug,
        category: values.category,
        featured: values.featured,
        new: values.new,
        stock: values.stock,
      }

      if (initialData) {
        // Actualizar producto existente
        const { error } = await supabase.from("products").update(productData).eq("id", initialData.id)

        if (error) throw error

        toast({
          title: "Producto actualizado",
          description: "El producto ha sido actualizado correctamente",
        })
      } else {
        // Crear nuevo producto
        const { error } = await supabase.from("products").insert([productData])

        if (error) throw error

        toast({
          title: "Producto creado",
          description: "El producto ha sido creado correctamente",
        })
      }

      router.push("/admin")
      router.refresh()
    } catch (error: any) {
      setError(error.message || "Error al guardar el producto. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Etiopía Yirgacheffe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="18.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción corta</FormLabel>
                    <FormControl>
                      <Input placeholder="Notas florales brillantes con acidez cítrica" {...field} />
                    </FormControl>
                    <FormDescription>Breve descripción para mostrar en tarjetas de producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single-origin">Origen único</SelectItem>
                        <SelectItem value="blends">Mezclas</SelectItem>
                        <SelectItem value="decaf">Descafeinado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                      <Input placeholder="Etiopía" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roast"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel de tueste</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un nivel de tueste" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ligero">Ligero</SelectItem>
                        <SelectItem value="Medio-Ligero">Medio-Ligero</SelectItem>
                        <SelectItem value="Medio">Medio</SelectItem>
                        <SelectItem value="Medio-Oscuro">Medio-Oscuro</SelectItem>
                        <SelectItem value="Oscuro">Oscuro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input placeholder="340g" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="process"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proceso</FormLabel>
                    <FormControl>
                      <Input placeholder="Lavado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="altitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altitud</FormLabel>
                    <FormControl>
                      <Input placeholder="1,800-2,200 metros" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="flavorNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas de sabor</FormLabel>
                    <FormControl>
                      <Input placeholder="Jazmín, Limón, Bergamota, Té Negro" {...field} />
                    </FormControl>
                    <FormDescription>Separadas por comas</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de imagen</FormLabel>
                    <FormControl>
                      <Input placeholder="/images/coffee.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Destacado</FormLabel>
                        <FormDescription>Mostrar este producto en la sección destacada</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="new"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Nuevo</FormLabel>
                        <FormDescription>Marcar este producto como nuevo</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción completa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción detallada del producto..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : initialData ? "Actualizar producto" : "Crear producto"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}