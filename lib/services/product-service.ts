import { getSupabaseClient } from "@/lib/supabase/client"
import { getServerSupabaseClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/types"
export interface ProductFilter {
    category?: string
    origin?: string
    roast?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    featured?: boolean
    new?: boolean
    sort?: string
    limit?: number
    offset?: number
}

export async function getProductsSimple(): Promise<any[]> {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from("products")
        .select("*")
    
    if (error) throw error
    return data || []
}

// Función para obtener productos con filtros (cliente)
export async function getProducts(filters: ProductFilter = {}): Promise<Product[]> {
    const supabase = getSupabaseClient()
    let query = supabase.from("products").select("*")

    // Aplicar filtros
    if (filters.category) {
        query = query.eq("category", filters.category)
    }

    if (filters.featured !== undefined) {
        query = query.eq("featured", filters.featured)
    }

    if (filters.search) {
        query = query.ilike("name", `%${filters.search}%`)
    }

    if (filters.minPrice !== undefined) {
        query = query.gte("price", filters.minPrice)
    }

    if (filters.maxPrice !== undefined) {
        query = query.lte("price", filters.maxPrice)
    }

    // Aplicar ordenación
    if (filters.sort) {
        switch (filters.sort) {
            case "price-asc":
                query = query.order("price", { ascending: true })
                break
            case "price-desc":
                query = query.order("price", { ascending: false })
                break
            case "name-asc":
                query = query.order("name", { ascending: true })
                break
            case "newest":
                query = query.order("created_at", { ascending: false })
                break
            default:
                // Ordenación por defecto: destacados primero
                query = query.order("featured", { ascending: false })
        }
    } else {
        // Ordenación por defecto: destacados primero
        query = query.order("featured", { ascending: false })
    }

    // Aplicar paginación
    if (filters.limit) {
        query = query.limit(filters.limit)
    }

    if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error al obtener productos:", error)
        throw error
    }

    if (!data) return []
    
    return data.map(mapProductFromDb) || []
}

export async function getProductsServer(filters: ProductFilter = {}): Promise<Product[]> {
    const supabase = getServerSupabaseClient()
    let query = supabase.from("products").select("*")

    // Aplicar filtros (igual que en la función cliente)
    if (filters.category) {
        query = query.eq("category", filters.category)
    }

    if (filters.featured !== undefined) {
        query = query.eq("featured", filters.featured)
    }

    // ... resto de filtros igual que en la función cliente
    if (filters.search) {
        query = query.ilike("name", `%${filters.search}%`)
    }

    if (filters.minPrice !== undefined) {
        query = query.gte("price", filters.minPrice)
    }

    if (filters.maxPrice !== undefined) {
        query = query.lte("price", filters.maxPrice)
    }

    // Aplicar ordenación
    if (filters.sort) {
        switch (filters.sort) {
            case "price-asc":
                query = query.order("price", { ascending: true })
                break
            case "price-desc":
                query = query.order("price", { ascending: false })
                break
            case "name-asc":
                query = query.order("name", { ascending: true })
                break
            case "newest":
                query = query.order("created_at", { ascending: false })
                break
            default:
                // Ordenación por defecto: destacados primero
                query = query.order("featured", { ascending: false })
        }
    } else {
        // Ordenación por defecto: destacados primero
        query = query.order("featured", { ascending: false })
    }

    // Aplicar paginación
    if (filters.limit) {
        query = query.limit(filters.limit)
    }

    if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error al obtener productos:", error)
        return []
    }

    return data.map(mapProductFromDb) || []
}

// Función para obtener un producto por slug (cliente)
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

    if (error) {
        console.error("Error al obtener producto por slug:", error)
        return null
    }

    return mapProductFromDb(data)
}

// Función para obtener un producto por slug (servidor)
export async function getProductBySlugServer(slug: string): Promise<Product | null> {
    const supabase = getServerSupabaseClient()
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

    if (error) {
        console.error("Error al obtener producto por slug:", error)
        return null
    }

    return mapProductFromDb(data)
}

// Obtener productos por categoría (cliente)
export async function getProductsByCategory(category?: string): Promise<Product[]> {
    const supabase = getSupabaseClient()
    let query = supabase.from("products").select("*")
    if (category && category !== "all") {
        query = query.eq("category", category)
    }
    const { data, error } = await query
    if (error) {
        console.error("Error al obtener productos por categoría:", error)
        return []
    }
    return data.map(mapProductFromDb) || []
}

// Obtener productos por búsqueda (cliente)
export async function getProductsBySearch(queryStr: string): Promise<Product[]> {
    const supabase = getSupabaseClient()
    let query = supabase.from("products").select("*")
    if (queryStr) {
        query = query.or([
            `name.ilike.%${queryStr}%`,
            `description.ilike.%${queryStr}%`,
            `origin.ilike.%${queryStr}%`,
            `roast.ilike.%${queryStr}%`
        ].join(','))
    }
    const { data, error } = await query
    if (error) {
        console.error("Error al buscar productos:", error)
        return []
    }
    return data.map(mapProductFromDb) || []
}

function mapProductFromDb(dbProduct: any): Product {
    return {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        description: dbProduct.description || "",
        price: dbProduct.price,
        oldPrice: dbProduct.old_price || undefined,
        image: dbProduct.image,
        category: dbProduct.category || "",
        origin: dbProduct.origin || "",
        roast: dbProduct.roast || "",
        weight: dbProduct.weight || "250g",
        stock: dbProduct.stock_quantity,
        featured: dbProduct.featured,
        new: dbProduct.is_new || false,
        rating: dbProduct.rating || undefined,
        reviews: dbProduct.reviews_count || 0,
        organic: dbProduct.is_organic || false,
        created_at: dbProduct.created_at,
        updated_at: dbProduct.updated_at,
    }
}
