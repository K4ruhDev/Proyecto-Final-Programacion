import { NextRequest, NextResponse } from "next/server"
import { getServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json()

        // Validaciones básicas
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Todos los campos son requeridos" },
                { status: 400 }
            )
        }

        // Validar formato de email
        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Email inválido" },
                { status: 400 }
            )
        }

        const supabase = getServerSupabaseClient()

        const { data, error } = await supabase
            .from("contact_messages")
            .insert([
                {
                    name: name.trim(),
                    email: email.trim(),
                    subject: subject.trim(),
                    message: message.trim(),
                    status: "new",
                },
            ])
            .select()

        if (error) {
            console.error("Error al enviar mensaje de contacto:", error)
            return NextResponse.json(
                {
                    success: false,
                    error: "Error al guardar el mensaje en la base de datos",
                    details: error.message
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "Mensaje enviado correctamente",
                data
            },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error en API de contacto:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Error interno del servidor",
                details: error instanceof Error ? error.message : "Error desconocido"
            },
            { status: 500 }
        )
    }
}