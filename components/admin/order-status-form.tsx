"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

interface OrderStatusFormProps {
  orderId: number
  currentStatus: "pending" | "processing" | "completed" | "cancelled"
}

export function OrderStatusForm({ orderId, currentStatus }: OrderStatusFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [status, setStatus] = useState<string>(currentStatus)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "pendiente"
      case "processing":
        return "en procesamiento"
      case "completed":
        return "completado"
      case "cancelled":
        return "cancelado"
      default:
        return status
    }
  }

  async function onSubmit() {
    if (status === currentStatus) {
      toast({
        title: "Sin cambios",
        description: "El estado del pedido no ha cambiado",
      })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase
          .from("orders")
          .update({ status })
          .eq("id", orderId)

      if (error) throw error

      toast({
        title: "Estado actualizado",
        description: `El pedido ahora está ${getStatusText(status)}`,
      })

      // Redirige a la misma página para forzar revalidación
      router.push(`/admin/orders/${orderId}`)
    } catch (error: any) {
      setError(error.message || "Error al actualizar el estado. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="space-y-4">
        {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="processing">Procesando</SelectItem>
            <SelectItem value="completed">Completado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>

        <Button
            onClick={onSubmit}
            disabled={isLoading || status === currentStatus}
            className="w-full"
        >
          {isLoading ? "Actualizando..." : "Actualizar estado"}
        </Button>
      </div>
  )
}
