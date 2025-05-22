"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

interface AuthCheckProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function AuthCheck({ children, adminOnly = false }: AuthCheckProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
          return
        }

        if (adminOnly) {
          const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

          if (error || data?.role !== "admin") {
            router.push("/")
            return
          }
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname, adminOnly])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
