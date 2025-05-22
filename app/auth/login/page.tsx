import { LoginForm } from "@/components/auth/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Iniciar sesión",
    description: "Inicia sesión en tu cuenta de Onsen Coffee",
}

export default function LoginPage() {
    return (
        <div className="container py-10 md:py-16">
            <LoginForm />
        </div>
    )
}
