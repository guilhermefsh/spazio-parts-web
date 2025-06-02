"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import { HomeSkeleton } from "@/components/home-skeleton"
import type { Product } from "@/lib/types"
import { ErrorBoundary } from "react-error-boundary"

const fetchProducts = async () => {
  const res = await fetch(`/api/products`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const handleCategoryChange = useCallback((category: string) => {
    if (category === "all") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product: Product) => product.category === category)
      setFilteredProducts(filtered)
    }
  }, [products])

  useEffect(() => {
    const category = searchParams.get('categoria')
    if (category) {
      handleCategoryChange(category)
    }
  }, [handleCategoryChange, searchParams])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data.products)
        setFilteredProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const handleSearchChange = (search: string) => {
    const filtered = products.filter(
      (product: Product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  if (loading) return <HomeSkeleton />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Peças Automotivas Premium
      </h1>
      <ProductFilters
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-red-500">Erro ao carregar produtos: {error.message}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <ErrorBoundary fallback={<ErrorFallback error={new Error('Failed to load products')} />}>
      <Suspense fallback={<HomeSkeleton />}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  )
}
