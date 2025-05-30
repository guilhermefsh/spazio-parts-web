"use client"

import { use, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import type { Product } from "@/lib/types"
import Footer from "@/components/footer"
import { ErrorBoundary } from "react-error-boundary"

const fetchProducts = fetch('/api/products').then(res => {
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
})

function ProductList() {
  const { products: fetchedProducts } = use(fetchProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(fetchedProducts)
  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('categoria')
    if (category) {
      handleCategoryChange(category)
    }
  }, [searchParams])

  const handleSearchChange = (search: string) => {
    const filtered = fetchedProducts.filter(
      (product: Product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setFilteredProducts(fetchedProducts)
    } else {
      const filtered = fetchedProducts.filter((product: Product) => product.category === category)
      setFilteredProducts(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Peças Automotivas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva de peças automotivas com design e qualidade superior
          </p>
        </div>

        <ProductFilters onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
          </div>
        )}
      </main>
      <Footer />
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
      <ProductList />
    </ErrorBoundary>
  )
}
