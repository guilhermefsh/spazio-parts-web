"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { createProduct, updateProduct } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ImageUpload from "@/components/image-upload"
import { categories } from "@/lib/types"
import { productSchema, type ProductFormData } from "@/lib/validations"
import type { Product } from "@/lib/types"

interface ProductFormProps {
  product?: Product
  isEditing?: boolean
}

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter()

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price?.toString() || "0",
      category: product?.category || "",
      images: product?.images?.map(img => img.url) || [],
      mercadoPago: product?.mercadoPago || "",
      weight: product?.weight || undefined,
      dimensions: product?.dimensions || undefined
    },
  } as const)

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    watch,
    setValue,
  } = form

  const onSubmit = async (data: ProductFormData) => {
    try {
      const productData = {
        ...data,
        price: Number(data.price),
        images: data.images.map(url => ({ url, name: url.split('/').pop() || '', uid: url }))
      }

      let result
      if (isEditing && product) {
        result = await updateProduct(product.id, productData)
      } else {
        result = await createProduct(productData)
      }

      if (result.error) {
        setError("root", { message: result.error })
      } else {
        router.push("/admin")
      }
    } catch {
      setError("root", { message: "Erro inesperado. Tente novamente." })
    }
  }

  const watchedImages = watch("images")

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{isEditing ? "Editar Produto" : "Novo Produto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {errors.root && (
              <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}

            {/* Informações Básicas */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Aerofólio Traseiro Esportivo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição detalhada do produto, características, compatibilidade, etc..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$) *</FormLabel>
                      <FormControl>
                        <Input
                          type="string"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="max-w-xs"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value === "" ? "0" : e.target.value;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          placeholder="0.0"
                          className="max-w-xs"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value === "" ? 0 : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Dimensões (cm)</h4>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="dimensions.length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comprimento</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0.1"
                            step="0.1"
                            placeholder="0.0"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              const value = e.target.value === "" ? 0 : Number(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Largura</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0.1"
                            step="0.1"
                            placeholder="0.0"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              const value = e.target.value === "" ? 0 : Number(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altura</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0.1"
                            step="0.1"
                            placeholder="0.0"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              const value = e.target.value === "" ? 0 : Number(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Upload de Imagens */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Imagens do Produto</h3>
              <FormField
                control={form.control}
                name="images"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        images={watchedImages}
                        onImagesChange={(images) => setValue("images", images)}
                        maxImages={8}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-4 pt-6 border-t border-border">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Salvando..." : isEditing ? "Atualizar Produto" : "Criar Produto"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin")} className="flex-1">
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
