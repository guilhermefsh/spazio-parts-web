import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.id}`}>
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-transparent transition-all duration-300 group h-full flex flex-col relative">
        <div className="absolute inset-0 rounded-lg group-hover:opacity-50 transition-all duration-300 pointer-events-none z-0" />

        <div className="aspect-square relative overflow-hidden z-10">
          <Image
            src={product.images[0]?.url || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col relative z-10">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem] leading-6  transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 capitalize flex-1 transition-colors duration-300">
            {product.category ? product.category.replace("-", " ") : "Sem categoria"}
          </p>
          <p className="text-lg font-bold text-gray-300 mt-auto  transition-colors duration-300">
            R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </Link>
  )
}
