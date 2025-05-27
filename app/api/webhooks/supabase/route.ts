import { headers } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
  const headersList = headers()
  const signature = headersList.get("x-supabase-webhook-signature")
  try {
    const payload = await req.json()
    const eventType = payload.type

    console.log(`Received webhook event: ${eventType}`)

    // Manejar diferentes tipos de eventos
    switch (eventType) {
      case "INSERT":
        // Manejar inserción de datos
        break
      case "UPDATE":
        // Manejar actualización de datos
        break
      case "DELETE":
        // Manejar eliminación de datos
        break
      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 400 })
  }
}

// Función para verificar la firma del webhook
function verifySignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false

  const crypto = require("crypto")
  const hmac = crypto.createHmac("sha256", secret)
  const digest = hmac.update(payload).digest("hex")

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}
