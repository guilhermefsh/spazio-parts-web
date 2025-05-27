"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { MessageCircle, CreditCard, Truck, MapPin, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { freightSchema, type FreightFormData } from "@/lib/validations"
import type { Product } from "@/lib/types"
import { convertPriceToNumber } from "@/utils/functions/convertPriceToNumber"
import { generateWhatsAppUrl } from "@/utils/functions/generateWhatsAppUrl"

interface ProductActionsProps {
  product: Product
}

interface FreightOption {
  name: string
  price: number
  days: string
  type: "standard" | "express"
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [freightOptions, setFreightOptions] = useState<FreightOption[]>([])
  const [loadingFreight, setLoadingFreight] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const price = convertPriceToNumber(product.price)

  const freightForm = useForm<FreightFormData>({
    resolver: zodResolver(freightSchema),
    defaultValues: {
      cep: "",
    },
  })

  const handleWhatsApp = () => {
    return generateWhatsAppUrl({
      productName: product.name,
      price: product.price,
      quantity,
      totalPrice: price * quantity
    })
  }

  const handleMercadoPago = () => {
    if (product.mercadoPago) {
      return product.mercadoPago
    }
    const totalPrice = product.price * quantity
    alert(
      `Link do Mercado Pago não disponível.\nTotal: R$ ${totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    )
    return "#"
  }

  const onFreightSubmit = async (data: FreightFormData) => {
    setLoadingFreight(true)

    setTimeout(() => {
      const mockOptions: FreightOption[] = [
        {
          name: "PAC",
          price: 25.9,
          days: "8 a 12 dias úteis",
          type: "standard",
        },
        {
          name: "SEDEX",
          price: 45.9,
          days: "3 a 5 dias úteis",
          type: "express",
        },
        {
          name: "Transportadora",
          price: 35.0,
          days: "5 a 8 dias úteis",
          type: "standard",
        },
      ]
      setFreightOptions(mockOptions)
      setLoadingFreight(false)
    }, 1500)
  }

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.slice(0, 8)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quantidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
            <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>
            <div className="ml-auto text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-foreground">
                R$ {(price * quantity).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}

              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Calcular Frete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...freightForm}>
            <form onSubmit={freightForm.handleSubmit(onFreightSubmit)} className="flex space-x-2">
              <FormField
                control={freightForm.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Digite seu CEP"
                        {...field}
                        onChange={(e) => field.onChange(formatCep(e.target.value))}
                        maxLength={8}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loadingFreight}>
                {loadingFreight ? "Calculando..." : "Calcular"}
              </Button>
            </form>
          </Form>

          {freightOptions.length > 0 && (
            <div className="space-y-3">
              <Separator />
              <h4 className="font-medium text-foreground">Opções de entrega:</h4>
              {freightOptions.map((option, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{option.name}</p>
                      <p className="text-sm text-muted-foreground">{option.days}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      R$ {option.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    {option.type === "express" && (
                      <Badge variant="secondary" className="text-xs">
                        Expresso
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <a
          href={handleMercadoPago()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white h-11 px-4 rounded-md font-medium transition-colors"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Comprar via Mercado Pago
        </a>

        <a
          href={handleWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-11 px-4 rounded-md font-medium transition-colors"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Falar no WhatsApp
        </a>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            Ver na loja
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Adicionar à lista
          </Button>
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Pagamento 100% seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Garantia de 6 meses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Entrega para todo o Brasil</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
