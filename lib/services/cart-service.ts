import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"
import type { CartItem } from "@/lib/types"

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Función para verificar el stock de un producto
export async function checkProductStock(productId: number, quantity: number): Promise<boolean> {
    const { data, error } = await supabase.from("products").select("stock").eq("id", productId).single()

    if (error || !data) {
        console.error("Error al verificar stock del producto:", error)
        return false
    }

    return data.stock >= quantity
}

// Función para crear una orden
export async function createOrder(
    userId: string,
    cartItems: CartItem[],
    shippingAddress: any,
    total: number,
): Promise<number | null> {
    // Verificar stock de todos los productos
    for (const item of cartItems) {
        const hasStock = await checkProductStock(item.id, item.quantity)
        if (!hasStock) {
            throw new Error(`No hay suficiente stock para el producto: ${item.name}`)
        }
    }

    // Crear la orden
    const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
            {
                user_id: userId,
                total,
                shipping_address: shippingAddress,
                status: "pending",
            },
        ])
        .select()

    if (orderError || !orderData || orderData.length === 0) {
        console.error("Error al crear la orden:", orderError)
        return null
    }

    const orderId = orderData[0].id

    // Crear los items de la orden
    const orderItems = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
        console.error("Error al crear los items de la orden:", itemsError)
        // Eliminar la orden si hay error al crear los items
        await supabase.from("orders").delete().eq("id", orderId)
        return null
    }

    // Actualizar el stock de los productos
    for (const item of cartItems) {
        await supabase.rpc("decrease_product_stock", {
            p_id: item.id,
            quantity: item.quantity,
        })
    }

    return orderId
}

// Función para obtener órdenes de un usuario
export async function getUserOrders(userId: string) {
    const { data, error } = await supabase
        .from("orders")
        .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error al obtener órdenes del usuario:", error)
        return []
    }

    return data
}

// Función para obtener una orden por ID
export async function getOrderById(orderId: number) {
    const { data, error } = await supabase
        .from("orders")
        .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
        .eq("id", orderId)
        .single()

    if (error) {
        console.error("Error al obtener orden por ID:", error)
        return null
    }

    return data
}
