import { getSupabaseClient } from "@/lib/supabase/client"
import { getServerSupabaseClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/types"

// Función para obtener todos los posts del blog (cliente)
export async function getBlogPosts(): Promise<BlogPost[]> {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })

    if (error) {
        console.error("Error al obtener posts del blog:", error)
        return []
    }

    return data.map(mapBlogPostFromDb) || []
}

// Función para obtener todos los posts del blog (servidor)
export async function getBlogPostsServer(): Promise<BlogPost[]> {
    const supabase = getServerSupabaseClient()
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })

    if (error) {
        console.error("Error al obtener posts del blog:", error)
        return []
    }

    return data.map(mapBlogPostFromDb) || []
}

// Función para obtener un post del blog por slug (cliente)
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

    if (error) {
        console.error("Error al obtener post del blog por slug:", error)
        return null
    }

    return mapBlogPostFromDb(data)
}

// Función para obtener un post del blog por slug (servidor)
export async function getBlogPostBySlugServer(slug: string): Promise<BlogPost | null> {
    const supabase = getServerSupabaseClient()
    const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

    if (error) {
        console.error("Error al obtener post del blog por slug:", error)
        return null
    }

    return mapBlogPostFromDb(data)
}

// Función para mapear un post del blog de la base de datos al tipo BlogPost
function mapBlogPostFromDb(dbPost: any): BlogPost {
    return {
        id: dbPost.id,
        title: dbPost.title,
        excerpt: dbPost.excerpt || "",
        content: dbPost.content || "",
        date: new Date(dbPost.published_at || dbPost.created_at).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        readTime: calculateReadTime(dbPost.content || ""),
        category: dbPost.category || "General",
        author: {
            name: "Equipo Onsen Coffee",
            role: "Autor",
            image: "/placeholder.svg?height=100&width=100&text=A",
        },
        image: dbPost.image_url || "/placeholder.svg?height=600&width=1200&text=Blog",
        slug: dbPost.slug,
    }
}

// Función para calcular el tiempo de lectura
function calculateReadTime(content: string): string {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min de lectura`
}
