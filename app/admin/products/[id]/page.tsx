import { getServerSupabaseClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = getServerSupabaseClient()

  // Obtener el producto
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single()

  if (productError || !product) {
    notFound()
  }

  return (
      <div className="container py-10 md:py-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Editar producto</h1>
          <ProductForm initialData={product} />
        </div>
      </div>
  )
}
