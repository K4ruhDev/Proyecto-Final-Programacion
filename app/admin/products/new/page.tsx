import { ProductForm } from "@/components/admin/product-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nuevo producto",
  description: "Añadir un nuevo producto al catálogo de Onsen Coffee",
}

export default function NewProductPage() {
  return (
      <div className="container py-10 md:py-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Nuevo producto</h1>
          <ProductForm />
        </div>
      </div>
    )
}
