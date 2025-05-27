import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Truck, Award, Headphones } from "lucide-react"
import type { Product } from "@/lib/types"
import { convertPriceToNumber } from "@/utils/functions/convertPriceToNumber"

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const price = convertPriceToNumber(product.price)
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary" className="mb-3 capitalize">
          {product.category ? product.category.replace("-", " ") : "Sem categoria"}
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>

        {/* ! feature */}

        {/* <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(4.8) • 127 avaliações</span>
        </div> */}

        <div className="mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-foreground">
              R$ {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              R$ {(price * 1.2).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-sm text-green-500 font-medium">Economize 20% no pagamento à vista</p>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-3">Descrição do Produto</h3>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Características</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
            <Shield className="w-5 h-5 text-italia-green" />
            <div>
              <p className="font-medium text-foreground">Garantia</p>
              <p className="text-sm text-muted-foreground">6 meses</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
            <Award className="w-5 h-5 text-italia-green" />
            <div>
              <p className="font-medium text-foreground">Qualidade</p>
              <p className="text-sm text-muted-foreground">Premium</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
            <Truck className="w-5 h-5 text-italia-green" />
            <div>
              <p className="font-medium text-foreground">Entrega</p>
              <p className="text-sm text-muted-foreground">Todo Brasil</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
            <Headphones className="w-5 h-5 text-italia-green" />
            <div>
              <p className="font-medium text-foreground">Suporte</p>
              <p className="text-sm text-muted-foreground">7 dias por semana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
