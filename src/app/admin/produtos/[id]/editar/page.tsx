"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/admin-layout"
import { getProduct, updateProduct } from "@/lib/products"
import { productSchema, type ProductFormData } from "@/lib/validations"
import { categories } from "@/lib/types"
import type { Product, PartsImageProps } from "@/lib/types"
import ImageUpload from "@/components/image-upload"

type PageParams = {
  id: string
}

export default function EditProductPage({ params }: { params: Promise<PageParams> }) {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const router = useRouter()
  const { id } = use(params)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      category: "",
      images: [],
    },
  })

  const watchedImages = form.watch("images")

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const productData = await getProduct(id)
      if (productData) {
        setProduct(productData)
        form.reset({
          name: productData.name,
          description: productData.description,
          price: productData.price.toString(),
          category: productData.category,
          images: productData.images.map(img => img.url),
        })
      }
    } catch (error) {
      console.error("Error loading product:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      const images: PartsImageProps[] = data.images.map(url => ({
        name: url.split('/').pop() || 'image',
        uid: Math.random().toString(36).substring(7),
        url,
      }))

      const { error } = await updateProduct(id, {
        ...data,
        price: parseFloat(data.price),
        images,
      })

      if (error) {
        throw new Error(error)
      }

      router.push("/admin")
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </AdminLayout>
    )
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Produto não encontrado</h2>
          <Link href="/admin">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para produtos
            </Button>
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <Link href="/admin">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para produtos
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">Editar Produto</h1>
        <p className="text-muted-foreground">
          Atualize as informações do produto
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a descrição do produto"
                        className="min-h-[100px]"
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
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="0,00"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            const number = Number(value) / 100
                            field.onChange(number)
                          }}
                        />
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
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
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
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagens do Produto</FormLabel>
                    <FormControl>
                      <ImageUpload
                        images={watchedImages}
                        onImagesChange={(images) => field.onChange(images)}
                        maxImages={8}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Link href="/admin">
                  <Button variant="outline" type="button">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
