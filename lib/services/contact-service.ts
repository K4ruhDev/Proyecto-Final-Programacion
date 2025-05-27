import { getSupabaseClient } from "@/lib/supabase/client"
import { getServerSupabaseClient } from "@/lib/supabase/server"
import type { ContactMessage, ContactMessageStatus, ContactApiResponse } from "@/lib/types"

// Función para enviar mensaje de contacto (cliente) - usando API route
export async function sendContactMessage(name: string, email: string, subject: string, message: string): Promise<ContactApiResponse> {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
            }),
        })

        if (!response.ok) {
            let errorMessage = 'Error al enviar el mensaje'
            try {
                const errorData: ContactApiResponse = await response.json()
                errorMessage = errorData.error || errorMessage
            } catch {
                // Si no se puede parsear el JSON, usar mensaje por defecto
                errorMessage = `Error ${response.status}: ${response.statusText}`
            }
            throw new Error(errorMessage)
        }

        const data: ContactApiResponse = await response.json()
        return data
    } catch (error) {
        console.error("Error al enviar mensaje de contacto:", error)
        // Re-lanzar el error tal como está si ya es un Error
        if (error instanceof Error) {
            throw error
        }
        // Si no es un Error, crear uno nuevo
        throw new Error('Error al enviar el mensaje')
    }
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
export async function getContactMessagesServer(): Promise<ContactMessage[]> {
    const supabase = getServerSupabaseClient()
    const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

    if (error) {
        console.error("Error al obtener mensajes de contacto:", error)
        return []
    }

    return data || []
}

// Función para marcar un mensaje como leído (servidor, solo admin)
export async function markContactMessageAsReadServer(id: string) {
    const supabase = getServerSupabaseClient()
    const { error } = await supabase.from("contact_messages").update({ status: "read" }).eq("id", id)

    if (error) {
        console.error("Error al marcar mensaje como leído:", error)
        throw error
    }

    return true
}

// Función para marcar un mensaje como respondido (servidor, solo admin)
export async function markContactMessageAsRepliedServer(id: string) {
    const supabase = getServerSupabaseClient()
    const { error } = await supabase.from("contact_messages").update({ status: "replied" }).eq("id", id)

    if (error) {
        console.error("Error al marcar mensaje como respondido:", error)
        throw error
    }

    return true
}

// Función para archivar un mensaje (servidor, solo admin)
export async function archiveContactMessageServer(id: string) {
    const supabase = getServerSupabaseClient()
    const { error } = await supabase.from("contact_messages").update({ status: "archived" }).eq("id", id)

    if (error) {
        console.error("Error al archivar mensaje:", error)
        throw error
    }

    return true
}

// Función para obtener mensajes por estado (servidor, solo admin)
export async function getContactMessagesByStatusServer(status?: ContactMessageStatus): Promise<ContactMessage[]> {
    const supabase = getServerSupabaseClient()

    let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

    if (status) {
        query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error al obtener mensajes de contacto:", error)
        return []
    }

    return data || []
}