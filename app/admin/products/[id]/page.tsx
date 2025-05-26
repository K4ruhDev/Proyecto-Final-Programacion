import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import { AuthCheck } from "@/components/auth/auth-check"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Verificar si el usuario está autenticado y es admin
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect(`/auth/login?redirect=${encodeURIComponent(`/admin/products/${params.id}`)}`)
  }

  // Verificar si el usuario es admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single()

  if (profileError || profile?.role !== "admin") {
    redirect("/")
  }

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
    <AuthCheck adminOnly>
      <div className="container py-10 md:py-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Editar producto</h1>
          <ProductForm initialData={product} />
        </div>
      </div>
    </AuthCheck>
  )
}
