import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null

export const getSupabaseClient = () => {
    if (!supabaseClient) {
        supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
    }
    return supabaseClient
}

// Exportar una instancia del cliente para uso directo
export const supabase = getSupabaseClient()
