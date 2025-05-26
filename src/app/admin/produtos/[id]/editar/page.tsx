"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import ProductForm from "@/components/product-form"
import { getProduct } from "@/lib/products"
import type { Product } from "@/lib/types"

export default function EditProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        const productData = await getProduct(params.id as string)
        setProduct(productData)
      }
      setLoading(false)
    }

    loadProduct()
  }, [params.id])

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </AdminLayout>
    )
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">Produto não encontrado</h1>
          <p className="text-muted-foreground">O produto que você está tentando editar não existe.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Editar Produto</h1>
          <p className="text-muted-foreground">Modifique as informações do produto</p>
        </div>

        <ProductForm product={product} isEditing={true} />
      </div>
    </AdminLayout>
  )
}
