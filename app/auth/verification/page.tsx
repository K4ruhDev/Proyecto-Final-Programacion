import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Verificación de correo",
  description: "Verifica tu correo electrónico para completar el registro",
}

export default function VerificationPage() {
  return (
    <div className="container py-10 md:py-16">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Verifica tu correo electrónico</CardTitle>
          <CardDescription>
            Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, haz clic en el enlace para
            completar tu registro.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground">
            Si no has recibido el correo, revisa tu carpeta de spam o solicita un nuevo enlace de verificación.
          </p>
          <Button asChild>
            <Link href="/auth/login">Volver a iniciar sesión</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
