"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddToCartButton from "@/components/add-to-cart-button"

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("bestsellers")

  const products = {
    bestsellers: [
      {
        id: 1,
        name: "Etiopía Yirgacheffe",
        price: 18.99,
        description: "Notas florales brillantes con acidez cítrica",
        origin: "Etiopía",
        roast: "Ligero",
        slug: "ethiopian-yirgacheffe",
        image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2069&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Colombia Supremo",
        price: 16.99,
        description: "Sabores dulces a caramelo y nueces",
        origin: "Colombia",
        roast: "Medio",
        slug: "colombian-supremo",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 3,
        name: "Sumatra Mandheling",
        price: 17.99,
        description: "Notas terrosas y herbales con cuerpo completo",
        origin: "Indonesia",
        roast: "Oscuro",
        slug: "sumatra-mandheling",
        image: "https://images.unsplash.com/photo-1559525839-d9ac848e1c50?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Guatemala Antigua",
        price: 18.99,
        description: "Notas de chocolate y especias con un final suave",
        origin: "Guatemala",
        roast: "Medio",
        slug: "guatemala-antigua",
        image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=2070&auto=format&fit=crop",
      },
    ],
    newArrivals: [
      {
        id: 5,
        name: "Costa Rica Tarrazu",
        price: 19.99,
        description: "Taza brillante y limpia con notas de miel y cítricos",
        origin: "Costa Rica",
        roast: "Medio-Ligero",
        slug: "costa-rica-tarrazu",
        image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2069&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Kenia AA",
        price: 21.99,
        description: "Acidez audaz tipo vino con notas de grosella negra",
        origin: "Kenia",
        roast: "Medio",
        slug: "kenya-aa",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 7,
        name: "Brasil Cerrado",
        price: 15.99,
        description: "Notas de chocolate y nueces con dulzura suave",
        origin: "Brasil",
        roast: "Medio-Oscuro",
        slug: "brazil-cerrado",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 8,
        name: "Panamá Geisha",
        price: 34.99,
        description: "Excepcionales cualidades florales y similares al té",
        origin: "Panamá",
        roast: "Ligero",
        slug: "panama-geisha",
        image: "https://images.unsplash.com/photo-1559525839-d9ac848e1c50?q=80&w=1974&auto=format&fit=crop",
      },
    ],
    singleOrigin: [
      {
        id: 1,
        name: "Etiopía Yirgacheffe",
        price: 18.99,
        description: "Notas florales brillantes con acidez cítrica",
        origin: "Etiopía",
        roast: "Ligero",
        slug: "ethiopian-yirgacheffe",
        image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2069&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Costa Rica Tarrazu",
        price: 19.99,
        description: "Taza brillante y limpia con notas de miel y cítricos",
        origin: "Costa Rica",
        roast: "Medio-Ligero",
        slug: "costa-rica-tarrazu",
        image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Kenia AA",
        price: 21.99,
        description: "Acidez audaz tipo vino con notas de grosella negra",
        origin: "Kenia",
        roast: "Medio",
        slug: "kenya-aa",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 8,
        name: "Panamá Geisha",
        price: 34.99,
        description: "Excepcionales cualidades florales y similares al té",
        origin: "Panamá",
        roast: "Ligero",
        slug: "panama-geisha",
        image: "https://images.unsplash.com/photo-1559525839-d9ac848e1c50?q=80&w=1974&auto=format&fit=crop",
      },
    ],
  }

  return (
    <div className="mt-8">
      <Tabs defaultValue="bestsellers" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList className="bg-primary-50 mb-8">
            <TabsTrigger value="bestsellers">Más Vendidos</TabsTrigger>
            <TabsTrigger value="newArrivals">Nuevos Productos</TabsTrigger>
            <TabsTrigger value="singleOrigin">Origen Único</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bestsellers" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="newArrivals" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="singleOrigin" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.singleOrigin.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden border border-primary-100 transition-all hover:shadow-md group">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
      <CardContent className="p-4">
        <div className="text-sm text-primary-600 mb-1">{product.origin}</div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary-700 transition-colors">{product.name}</h3>
        </Link>
        <div className="text-sm text-muted-foreground mb-2">Tueste {product.roast}</div>
        <p className="text-primary-900 font-medium">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}
