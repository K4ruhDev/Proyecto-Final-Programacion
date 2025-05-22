"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "@supabase/supabase-js"
import {
    getCurrentUser,
    signIn,
    signOut,
    signUp,
    requestPasswordReset,
    updatePassword,
} from "@/lib/services/auth-service"

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<any>
    signUp: (email: string, password: string, fullName: string) => Promise<any>
    signOut: () => Promise<boolean>
    requestPasswordReset: (email: string) => Promise<any>
    updatePassword: (newPassword: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => ({}),
    signUp: async () => ({}),
    signOut: async () => false,
    requestPasswordReset: async () => ({}),
    updatePassword: async () => ({}),
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser()
                setUser(user)
            } catch (error) {
                console.error("Error al obtener el usuario actual:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const value = {
        user,
        loading,
        signIn: async (email: string, password: string) => {
            const { user } = await signIn(email, password)
            setUser(user)
            return user
        },
        signUp: async (email: string, password: string, fullName: string) => {
            const { user } = await signUp(email, password, fullName)
            setUser(user)
            return user
        },
        signOut: async () => {
            await signOut()
            setUser(null)
            return true
        },
        requestPasswordReset,
        updatePassword,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
