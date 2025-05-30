"use client"

import { use, useState } from "react"
import Header from "@/components/header"
import ProductImageCarousel from "@/components/product-image-carousel"
import ProductActions from "@/components/product-actions"
import ProductInfo from "@/components/product-info"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

const productCache = new Map<string, Promise<{ product: Product }>>()

const fetchProduct = (id: string) => {
  if (productCache.has(id)) {
    return productCache.get(id)!
  }

  const promise = fetch(`/api/products/${id}`, {
    cache: 'no-store'
  }).then(res => {
    if (!res.ok) throw new Error('Failed to fetch product')
    return res.json()
  })

  productCache.set(id, promise)
  return promise
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { product } = use(fetchProduct(id))
  const [quantity, setQuantity] = useState(1)
  // const relatedProducts: Product[] = [] // TODO: Fetch related products based on category or other criteria

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao catálogo
            </Button>
          </Link>
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="capitalize">{product.category ? product.category.replace("-", " ") : "Sem categoria"}</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <ProductImageCarousel images={product.images} productName={product.name} />
          </div>

          <div className="space-y-8">
            <ProductInfo product={product} />
            <ProductActions
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>

        {/* ! feature */}
        {/* {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />} */}
      </main>

      <Footer />
    </div>
  )
}
