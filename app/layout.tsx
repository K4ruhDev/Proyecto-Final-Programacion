import type React from "react"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Suspense } from "react"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: {
    default: "Onsen Coffee - Tienda de Café de Especialidad",
    template: "%s | Onsen Coffee",
  },
  description:
    "Descubre el arte del café de especialidad con Onsen Coffee. Granos frescos, tostados artesanalmente y enviados directamente a tu puerta.",
  keywords: ["café", "café de especialidad", "tienda de café", "café gourmet", "café online", "comprar café"],
  authors: [{ name: "Onsen Coffee" }],
  creator: "Onsen Coffee",
  publisher: "Onsen Coffee",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
