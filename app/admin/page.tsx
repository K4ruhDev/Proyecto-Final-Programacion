import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminProductList } from "@/components/admin/product-list"
import { AdminOrderList } from "@/components/admin/order-list"

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Gestiona productos, pedidos y usuarios de Onsen Coffee",
}

export default function AdminPage() {
  return (
      <div className="container py-10 md:py-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <AdminProductList />
            </TabsContent>
            <TabsContent value="orders">
              <AdminOrderList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}
