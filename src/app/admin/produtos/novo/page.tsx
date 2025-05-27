"use client"

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
import { createProduct } from "@/lib/products"
import { productSchema, type ProductFormData } from "@/lib/validations"
import { categories } from "@/lib/types"
import type { PartsImageProps } from "@/lib/types"
import ImageUpload from "@/components/image-upload"

export default function NewProductPage() {
  const router = useRouter()

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

  const onSubmit = async (data: ProductFormData) => {
    try {
      const images: PartsImageProps[] = data.images.map(url => ({
        name: url.split('/').pop() || 'image',
        uid: Math.random().toString(36).substring(7),
        url,
      }))

      const { error } = await createProduct({
        ...data,
        price: parseFloat(data.price),
        images,
      })

      if (error) {
        throw new Error(error)
      }

      router.push("/admin")
    } catch (error) {
      console.error("Error creating product:", error)
    }
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Novo Produto</h1>
        <p className="text-muted-foreground">
          Adicione um novo produto ao catálogo
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
                            field.onChange(number.toFixed(2))
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
                  Criar Produto
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
