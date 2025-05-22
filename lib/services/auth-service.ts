import { getSupabaseClient } from "@/lib/supabase/client"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function signUp(email: string, password: string, fullName: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: "customer",
            },
        },
    })

    if (error) {
        throw error
    }

    return data
}

export async function signIn(email: string, password: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        throw error
    }

    return data
}

export async function signOut() {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw error
    }

    return true
}

export async function getCurrentUser() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        return null
    }

    return data.user
}

export async function getCurrentUserServer() {
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name: string, options: any) {
                    cookieStore.set({ name, value: "", ...options })
                },
            },
        },
    )

    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        return null
    }

    return data.user
}

export async function requestPasswordReset(email: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
        throw error
    }

    return data
}

export async function updatePassword(newPassword: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    })

    if (error) {
        throw error
    }

    return data
}
