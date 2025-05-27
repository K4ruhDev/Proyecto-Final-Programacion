export interface Product {
  id: number
  name: string
  price: number
  description: string
  shortDescription?: string
  origin: string
  roast: string
  weight: string
  process?: string
  altitude?: string
  flavor_notes?: string[]
  image: string
  slug: string
  category?: string
  featured?: boolean
  new?: boolean
  stock?: number
  oldPrice?: number
  rating?: number
  reviews?: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content?: string
  date: string
  readTime?: string
  category: string
  author?: {
    name: string
    role: string
    image: string
  }
  image: string
  slug: string
}

export interface Review {
  id: number
  name: string
  rating: number
  date: string
  comment: string
}


export type ContactMessageStatus = 'new' | 'read' | 'replied' | 'archived'

export interface ContactMessage {
  id: number
  created_at: string | null
  name: string
  email: string
  subject: string
  message: string
  status: ContactMessageStatus
}

export interface ContactMessageInsert {
  name: string
  email: string
  subject: string
  message: string
  status?: ContactMessageStatus
}

export interface ContactMessageUpdate {
  name?: string
  email?: string
  subject?: string
  message?: string
  status?: ContactMessageStatus
}

// Para el formulario del cliente
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Para la respuesta de la API
export interface ContactApiResponse {
  success: boolean
  message?: string
  data?: ContactMessage[]
  error?: string
  details?: string
}