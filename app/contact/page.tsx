import ContactPageClient from "./ContactPageClient"
import type { Metadata } from "next"

// Metadata needs to be in a separate file for client components
export const metadata: Metadata = {
  title: "Contacto | Onsen Coffee",
  description:
    "Ponte en contacto con nosotros para cualquier consulta, sugerencia o colaboración. Estamos aquí para ayudarte.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
