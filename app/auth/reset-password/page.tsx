import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Restablecer contraseña",
  description: "Restablece tu contraseña de Onsen Coffee",
}

export default function ResetPasswordPage() {
  return (
    <div className="container py-10 md:py-16">
      <ResetPasswordForm />
    </div>
  )
}
