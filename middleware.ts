import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Si el usuario no está autenticado y está intentando acceder a rutas protegidas
    if (!session && (req.nextUrl.pathname.startsWith("/account") || req.nextUrl.pathname.startsWith("/admin"))) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/auth/auth"
        redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    // Si el usuario está intentando acceder al panel de administración
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!session) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = "/auth/auth"
            redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
            return NextResponse.redirect(redirectUrl)
        }

        // Verificar si el usuario es administrador
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

        if (!profile || profile.role !== "admin") {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = "/"
            return NextResponse.redirect(redirectUrl)
        }
    }

    return res
}

export const config = {
    matcher: ["/account/:path*", "/admin/:path*"],
}
