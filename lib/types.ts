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
