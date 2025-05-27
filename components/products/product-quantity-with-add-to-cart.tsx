"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductQuantity from "@/components/products/product-quantity";
import AddToCartButton from "@/components/products/add-to-cart-button";
import type { Product } from "@/lib/types";

interface ProductQuantityWithAddToCartProps {
    product: Product;
}

export default function ProductQuantityWithAddToCart({ product }: ProductQuantityWithAddToCartProps) {
    const [quantity, setQuantity] = useState(1);

    if (product.stock === 0) {
        return (
            <div className="flex flex-col gap-2 mb-2">
                <span className="text-red-600 text-lg font-semibold">Sin stock</span>
                <span className="text-sm text-muted-foreground">
          Este producto no está disponible en este momento. Te avisaremos cuando vuelva a estar en stock.
        </span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 mb-6">
            <ProductQuantity initialQuantity={1} onChange={setQuantity} />
            <AddToCartButton product={product} quantity={quantity} showQuantity />
        </div>
    );
}