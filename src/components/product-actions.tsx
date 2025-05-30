"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { MessageCircle, CreditCard, Truck, Calculator } from "lucide-react"
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
import { useMercadoPago } from "@/hooks/useMercadoPago"
import { maskCEP } from "@/utils/masks"
import { formatDeliveryTime } from "@/utils/functions/formatDeliveryTime"

interface ProductActionsProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
}

interface FreightOption {
  id: number
  name: string
  price: number
  delivery_time: number
  delivery_range: {
    min: number
    max: number
  }
  packages: number
  additional_services: {
    receipt: boolean
    own_hand: boolean
    collect: boolean
  }
  company: {
    id: number
    name: string
    picture: string
  }
}

export default function ProductActions({
  product,
  quantity,
  onQuantityChange
}: ProductActionsProps) {
  const [freightOptions, setFreightOptions] = useState<FreightOption[]>([])
  const [loadingFreight, setLoadingFreight] = useState(false)
  const [selectedShipping, setSelectedShipping] = useState<FreightOption | null>(null)
  const { handleCheckout } = useMercadoPago()

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

  const onFreightSubmit = async (data: FreightFormData) => {
    setLoadingFreight(true)
    setFreightOptions([])
    setSelectedShipping(null)

    try {
      const response = await fetch('/api/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cep: data.cep,
          product: {
            width: product.dimensions?.width || 0,
            height: product.dimensions?.height || 0,
            length: product.dimensions?.length || 0,
            weight: product.weight || 0,
            insurance_value: price * quantity,
            quantity: quantity
          }
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao calcular frete')
      }

      const shippingOption = {
        id: result.id,
        name: result.name,
        price: parseFloat(result.price),
        delivery_time: result.delivery_time,
        delivery_range: {
          min: result.delivery_range.min,
          max: result.delivery_range.max
        },
        packages: result.packages.length,
        additional_services: {
          receipt: result.additional_services.receipt,
          own_hand: result.additional_services.own_hand,
          collect: result.additional_services.collect
        },
        company: {
          id: result.company.id,
          name: result.company.name,
          picture: result.company.picture
        }
      }

      setFreightOptions([shippingOption])
    } catch (error) {
      console.error('Error calculating shipping:', error)
      freightForm.setError('cep', {
        type: 'manual',
        message: 'Erro ao calcular frete. Tente novamente.',
      })
    } finally {
      setLoadingFreight(false)
    }
  }

  const handleShippingSelect = (option: FreightOption) => {
    setSelectedShipping(option)
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
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
            <Button variant="outline" size="sm" onClick={() => onQuantityChange(quantity + 1)}>
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
                        onChange={(e) => field.onChange(maskCEP(e.target.value))}
                        maxLength={9}
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
              {freightOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 ${selectedShipping?.id === option.id ? 'ring-2 ring-primary' : ''
                    }`}
                  onClick={() => handleShippingSelect(option)}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{option.company.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDeliveryTime(option.delivery_range.min, option.delivery_range.max)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      R$ {option.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    {option.additional_services.own_hand && (
                      <Badge variant="secondary" className="text-xs">
                        Mãos próprias
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={() => handleCheckout({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          mercadoPago: product.mercadoPago
        }, selectedShipping ? {
          name: selectedShipping.company.name,
          price: selectedShipping.price,
          estimatedDays: selectedShipping.delivery_range.max
        } : undefined)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white h-11 px-4 rounded-md font-medium transition-colors"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Comprar via Mercado Pago
      </Button>

      <Button
        onClick={() => window.open(handleWhatsApp(), '_blank')}
        className="flex items-center justify-center w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-11 px-4 rounded-md font-medium transition-colors"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Falar no WhatsApp
      </Button>
      {/* features */}
      {/* <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="w-full">
          <MapPin className="w-4 h-4 mr-2" />
          Ver na loja
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          Adicionar à lista
        </Button>
      </div> */}

      <Card>
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
