import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Onsen Coffee - Café de especialidad",
  description: "Descubre el mejor café de especialidad, tostado artesanalmente y enviado directamente a tu puerta.",
  keywords: "café, café de especialidad, café orgánico, tienda de café, onsen coffee",
  authors: [{ name: "Onsen Coffee" }],
  creator: "Onsen Coffee",
  publisher: "Onsen Coffee",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://onsencoffee.com",
    title: "Onsen Coffee - Café de especialidad",
    description: "Descubre el mejor café de especialidad, tostado artesanalmente y enviado directamente a tu puerta.",
    siteName: "Onsen Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onsen Coffee - Café de especialidad",
    description: "Descubre el mejor café de especialidad, tostado artesanalmente y enviado directamente a tu puerta.",
    creator: "@onsencoffee",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="es" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </ThemeProvider>
      </body>
      </html>
  )
}
