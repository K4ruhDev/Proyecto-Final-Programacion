"use client"

import type React from "react"

import { Coffee } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import UserIcon from "@/components/icons/user-icon"
import MenuIcon from "@/components/icons/menu-icon"
import CartDrawer from "@/components/ui/cart-drawer"
import SearchDialog from "@/components/search/search-dialog"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Coffee className="h-6 w-6 text-primary-600" />
              <span className="text-lg">Onsen Coffee</span>
            </Link>
            <Separator className="my-4" />
            <nav className="grid gap-2 text-lg font-medium">
              <NavLink href="/" mobile active={pathname === "/"}>
                Inicio
              </NavLink>
              <NavLink href="/products" mobile active={pathname.startsWith("/products")}>
                Tienda
              </NavLink>
              <NavLink href="/blog" mobile active={pathname.startsWith("/blog")}>
                Blog
              </NavLink>
              <NavLink href="/about" mobile active={pathname === "/about"}>
                Nosotros
              </NavLink>
              <NavLink href="/contact" mobile active={pathname === "/contact"}>
                Contacto
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold mr-6">
          <Coffee className="h-6 w-6 text-primary-600" />
          <span className="hidden md:inline-block text-lg">Onsen Coffee</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink href="/" active={pathname === "/"}>
            Inicio
          </NavLink>
          <NavLink href="/products" active={pathname.startsWith("/products")}>
            Tienda
          </NavLink>
          <NavLink href="/blog" active={pathname.startsWith("/blog")}>
            Blog
          </NavLink>
          <NavLink href="/about" active={pathname === "/about"}>
            Nosotros
          </NavLink>
          <NavLink href="/contact" active={pathname === "/contact"}>
            Contacto
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchDialog />
          <CartDrawer />
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  mobile?: boolean
  active?: boolean
  onClick?: () => void
}

function NavLink({ href, children, mobile, active, onClick }: NavLinkProps) {
  if (mobile) {
    return (
      <Link href={href} className="hover:text-primary-700 transition-colors py-2" onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`relative py-2 hover:text-primary-700 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full ${active ? "text-primary-700 after:w-full" : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
