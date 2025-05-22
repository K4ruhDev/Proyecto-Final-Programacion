export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    price: number
                    sale_price: number | null
                    image_url: string | null
                    category: string | null
                    tags: string[] | null
                    stock_quantity: number
                    is_featured: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    price: number
                    sale_price?: number | null
                    image_url?: string | null
                    category?: string | null
                    tags?: string[] | null
                    stock_quantity?: number
                    is_featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    price?: number
                    sale_price?: number | null
                    image_url?: string | null
                    category?: string | null
                    tags?: string[] | null
                    stock_quantity?: number
                    is_featured?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            product_variants: {
                Row: {
                    id: string
                    product_id: string
                    name: string
                    price_adjustment: number
                    stock_quantity: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    name: string
                    price_adjustment?: number
                    stock_quantity?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    name?: string
                    price_adjustment?: number
                    stock_quantity?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            reviews: {
                Row: {
                    id: string
                    product_id: string
                    user_id: string
                    rating: number
                    title: string | null
                    content: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    user_id: string
                    rating: number
                    title?: string | null
                    content?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    user_id?: string
                    rating?: number
                    title?: string | null
                    content?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string | null
                    status: string
                    total_amount: number
                    shipping_address: Json | null
                    billing_address: Json | null
                    payment_intent_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    status?: string
                    total_amount: number
                    shipping_address?: Json | null
                    billing_address?: Json | null
                    payment_intent_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    status?: string
                    total_amount?: number
                    shipping_address?: Json | null
                    billing_address?: Json | null
                    payment_intent_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string | null
                    variant_id: string | null
                    quantity: number
                    unit_price: number
                    total_price: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id?: string | null
                    variant_id?: string | null
                    quantity: number
                    unit_price: number
                    total_price: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string | null
                    variant_id?: string | null
                    quantity?: number
                    unit_price?: number
                    total_price?: number
                    created_at?: string
                }
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: string | null
                    excerpt: string | null
                    author_id: string | null
                    image_url: string | null
                    published: boolean
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    content?: string | null
                    excerpt?: string | null
                    author_id?: string | null
                    image_url?: string | null
                    published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    content?: string | null
                    excerpt?: string | null
                    author_id?: string | null
                    image_url?: string | null
                    published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            contact_messages: {
                Row: {
                    id: string
                    name: string
                    email: string
                    subject: string | null
                    message: string
                    is_read: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    subject?: string | null
                    message: string
                    is_read?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    subject?: string | null
                    message?: string
                    is_read?: boolean
                    created_at?: string
                }
            }
            newsletter_subscribers: {
                Row: {
                    id: string
                    email: string
                    status: string
                    source: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    email: string
                    status?: string
                    source?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    status?: string
                    source?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
