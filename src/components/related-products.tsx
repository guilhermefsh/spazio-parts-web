import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Produtos Relacionados</h2>
        <p className="text-muted-foreground">Outros produtos que podem interessar você</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
