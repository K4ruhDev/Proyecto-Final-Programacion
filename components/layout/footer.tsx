import type React from "react"
import { Coffee } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FacebookIcon from "@/components/icons/facebook-icon"
import InstagramIcon from "@/components/icons/instagram-icon"
import TwitterIcon from "@/components/icons/twitter-icon"

const currentYear: String = new Date().getFullYear().toString();

export default function Footer() {
  return (
    <footer className="border-t bg-primary-50">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Coffee className="h-6 w-6 text-primary-600" />
              <span className="text-lg">Onsen Coffee</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Cuidadosamente seleccionado, expertamente tostado y entregado fresco a tu puerta.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Tienda</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/products">Todos los Productos</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/about">Sobre Nosotros</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contacto</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Boletín</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Suscríbete a nuestro boletín para recibir consejos de preparación y ofertas especiales.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Tu email" className="border-primary-200 focus-visible:ring-primary-500" />
              <Button className="bg-primary-600 hover:bg-primary-700 whitespace-nowrap">Suscribirse</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-primary-200">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Onsen Coffee. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <SocialLink href="#" icon={<FacebookIcon className="h-5 w-5" />} label="Facebook" />
            <SocialLink href="#" icon={<InstagramIcon className="h-5 w-5" />} label="Instagram" />
            <SocialLink href="#" icon={<TwitterIcon className="h-5 w-5" />} label="Twitter" />
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link href={href} className="text-muted-foreground hover:text-primary-700 transition-colors">
        {children}
      </Link>
    </li>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-primary-700 transition-colors hover:scale-110 transform duration-200 inline-block"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Link>
  )
}
