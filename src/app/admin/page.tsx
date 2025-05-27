"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus, Eye, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import ProductSkeleton from "@/components/product-skeleton"

export default function AdminPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        cache: 'no-store'
      })
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return

    try {
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete product')
      }

      setProducts(products.filter((p) => p.id !== productToDelete))
      setDeleteModalOpen(false)
      setProductToDelete(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao excluir produto')
    }
  }

  if (loading) {
    return <ProductSkeleton />
  }

  return (
    <AdminLayout>
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setProductToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Excluir Produto"
        description="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
        confirmText="Excluir"
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seus produtos e estoque
          </p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={product.images[0]?.url || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="capitalize">
                  {product.category ? product.category.replace("-", " ") : "Sem categoria"}
                </Badge>
                <span className="text-lg font-bold text-primary">
                  R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link href={`/produto/${product.id}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/produtos/${product.id}/editar`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(product.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Comece adicionando seu primeiro produto
          </p>
          <Link href="/admin/produtos/novo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </Link>
        </div>
      )}
    </AdminLayout>
  )
}
