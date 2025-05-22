import { UpdatePasswordForm } from "@/components/auth/update-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Actualizar contraseña",
  description: "Actualiza tu contraseña de Onsen Coffee",
}

export default function UpdatePasswordPage() {
  return (
    <div className="container py-10 md:py-16">
      <UpdatePasswordForm />
    </div>
  )
}
