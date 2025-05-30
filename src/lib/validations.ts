import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
  price: z.string().min(0.01, "Preço deve ser maior que zero").max(999999.99, "Preço deve ser menor que R$ 999.999,99"),
  category: z.string().min(1, "Categoria é obrigatória"),
  images: z
    .array(z.string().url("URL da imagem inválida"))
    .min(1, "Pelo menos uma imagem é obrigatória")
    .max(8, "Máximo de 8 imagens permitidas"),
  mercadoPago: z.string().url("URL do Mercado Pago inválida").optional(),
  weight: z.number({ required_error: "Peso deve ser maior que zero" }).min(0.1, "Peso deve ser maior que zero"),
  dimensions: z.object({
    length: z.number({ required_error: "Comprimento é obrigatório" }).min(0.1, "Comprimento deve ser maior que zero"),
    width: z.number({ required_error: "Largura é obrigatória" }).min(0.1, "Largura deve ser maior que zero"),
    height: z.number({ required_error: "Altura é obrigatória" }).min(0.1, "Altura deve ser maior que zero")
  }),
})

export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").min(1, "Senha é obrigatória"),
})

export const freightSchema = z.object({
  cep: z
    .string()
    .max(9, "CEP deve conter exatamente 8 dígitos")
})

export const addressSchema = z.object({
  cep: z
    .string()
    .regex(/^\d{8}$/, "CEP deve conter exatamente 8 dígitos")
    .min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
})

export type ProductFormData = z.infer<typeof productSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type FreightFormData = z.infer<typeof freightSchema>
export type AddressFormData = z.infer<typeof addressSchema>
