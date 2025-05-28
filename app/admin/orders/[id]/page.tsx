import { getServerSupabaseClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { OrderStatusForm } from "@/components/admin/order-status-form"

export default async function AdminOrderDetailsPage({ params }: { params: { id: string } }) {
  const supabase = getServerSupabaseClient()

  // Obtener el pedido
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(`
      *,
      profiles (
        full_name,
        email
      )
    `)
    .eq("id", params.id)
    .single()

  if (orderError || !order) {
    notFound()
  }

  // Obtener los items del pedido
  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .select(`
      *,
      products (
        name,
        image,
        slug
      )
    `)
    .eq("order_id", order.id)

  if (itemsError) {
    console.error("Error al obtener los items del pedido:", itemsError)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Pendiente
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Procesando
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Completado
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
      <div className="container py-10 md:py-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Pedido #{order.id}</h1>
            <Button variant="outline" asChild>
              <Link href="/admin">Volver al panel</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Número de pedido:</dt>
                    <dd>{order.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Fecha:</dt>
                    <dd>{formatDate(order.created_at)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Estado:</dt>
                    <dd>{getStatusBadge(order.status)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Total:</dt>
                    <dd className="font-bold">{order.total.toFixed(2)} €</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Nombre:</dt>
                    <dd>{order.profiles?.full_name || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Email:</dt>
                    <dd>{order.profiles?.email || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">ID de usuario:</dt>
                    <dd className="truncate max-w-[200px]">{order.user_id}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actualizar estado</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderStatusForm orderId={order.id} currentStatus={order.status} />
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Link href={`/products/${item.products?.slug}`} className="font-medium hover:underline">
                            {item.products?.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right">{item.price.toFixed(2)} €</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{(item.price * item.quantity).toFixed(2)} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {order.shipping_address && (
              <Card>
                <CardHeader>
                  <CardTitle>Dirección de envío</CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic">
                    {order.shipping_address.name}
                    <br />
                    {order.shipping_address.street}
                    <br />
                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                    <br />
                    {order.shipping_address.country}
                  </address>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
  )
}
