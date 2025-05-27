"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Home, LogOut, Package, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function AccountSidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    // Remove login status from localStorage
    localStorage.removeItem("isLoggedIn")

    // Show toast
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    })

    // Redirect to home page
    window.location.href = "/"
  }

  const links = [
    {
      href: "/account",
      label: "Mi Perfil",
      icon: <User className="h-4 w-4 mr-2" />,
    },
    {
      href: "/account/orders",
      label: "Mis Pedidos",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
    {
      href: "/account/addresses",
      label: "Direcciones",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      href: "/account/payment",
      label: "Métodos de Pago",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
    },
    {
      href: "/account/settings",
      label: "Ajustes",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <div
              className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                pathname === link.href
                  ? "bg-primary-100 text-primary-900 font-medium"
                  : "text-muted-foreground hover:text-primary-900 hover:bg-primary-50"
              }`}
            >
              {link.icon}
              {link.label}
            </div>
          </Link>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Cerrar Sesión
      </Button>
    </div>
  )
}
