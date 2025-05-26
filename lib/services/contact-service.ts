import { getSupabaseClient } from "@/lib/supabase/client"
import { getServerSupabaseClient } from "@/lib/supabase/server"


export async function sendContactMessage(name: string, email: string, subject: string | null, message: string) {
    const supabase = getServerSupabaseClient();
    const { data, error } = await supabase
        .from("contact_messages")
        .insert([
            {
                name,
                email,
                subject,
                message,
                status: "pendiente",
                created_at: new Date().toISOString(),
            },
        ])
        .select();

    if (error) {
        console.error("Error al enviar mensaje de contacto:", error);
        throw error;
    }
    return data;
}

// Función para suscribirse al boletín (cliente)
export async function subscribeToNewsletter(email: string, source = "homepage") {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert([
            {
                email,
                status: "active",
                source,
            },
        ])
        .select()

    if (error) {
        // Si el error es por duplicado, no lo consideramos un error real
        if (error.code === "23505") {
            // Código de error de PostgreSQL para violación de restricción única
            return { success: true, message: "Ya estás suscrito a nuestro boletín" }
        }

        console.error("Error al suscribirse al boletín:", error)
        throw error
    }

    return { success: true, message: "¡Gracias por suscribirte a nuestro boletín!" }
}

// Función para obtener mensajes de contacto (servidor, solo admin)
export async function getContactMessagesServer() {
    const supabase = getServerSupabaseClient()
    const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

    if (error) {
        console.error("Error al obtener mensajes de contacto:", error)
        return []
    }

    return data
}

// Función para marcar un mensaje como leído (servidor, solo admin)
export async function markContactMessageAsReadServer(id: string) {
    const supabase = getServerSupabaseClient()
    const { error } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id)

    if (error) {
        console.error("Error al marcar mensaje como leído:", error)
        throw error
    }

    return true
}
