import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"
import type { Review } from "@/lib/types"

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Función para obtener reseñas de un producto
export async function getProductReviews(productId: number): Promise<Review[]> {
    const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("status", "approved")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error al obtener reseñas de producto:", error)
        return []
    }

    return data.map((review) => ({
        id: review.id,
        name: review.title || "Usuario",
        rating: review.rating,
        date: new Date(review.created_at).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        comment: review.content || "",
    }))
}

// Función para crear una reseña de producto
export async function createProductReview(
    productId: number,
    userId: string,
    rating: number,
    title: string,
    content: string,
): Promise<boolean> {
    const { error } = await supabase.from("product_reviews").insert([
        {
            product_id: productId,
            user_id: userId,
            rating,
            title,
            content,
            status: "pending",
        },
    ])

    if (error) {
        console.error("Error al crear reseña de producto:", error)
        return false
    }

    return true
}
