"use server"

import { getServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteOrder(orderId: number) {
    const supabase = getServerSupabaseClient()

    // First, verify the order status before deletion
    const { data: order, error: orderFetchError } = await supabase
        .from("orders")
        .select("status")
        .eq("id", orderId)
        .single()

    if (orderFetchError || !order) {
        console.error("Error fetching order for deletion:", orderFetchError?.message)
        return { success: false, message: "Order not found or an error occurred." }
    }

    if (order.status !== "completed" && order.status !== "cancelled") {
        return { success: false, message: "Only completed or cancelled orders can be deleted." }
    }

    // Delete order items first due to foreign key constraint
    const { error: itemsError } = await supabase
        .from("order_items")
        .delete()
        .eq("order_id", orderId)

    if (itemsError) {
        console.error("Error deleting order items:", itemsError.message)
        return { success: false, message: "Error deleting order items." }
    }

    // Then delete the order
    const { error: orderError } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId)

    if (orderError) {
        console.error("Error deleting order:", orderError.message)
        return { success: false, message: "Error deleting order." }
    }

    revalidatePath("/admin") // Revalidate the admin dashboard to reflect the changes
    redirect("/admin") // Redirect to the admin dashboard after successful deletion
}