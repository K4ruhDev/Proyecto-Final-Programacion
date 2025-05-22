import { RegisterForm } from "@/components/auth/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Crear cuenta",
    description: "Regístrate para comenzar a comprar café de especialidad en Onsen Coffee",
}

export default function RegisterPage() {
    return (
        <div className="container py-10 md:py-16">
            <RegisterForm />
        </div>
    )
}
