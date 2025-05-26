export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: PartsImageProps[]
  createdAt: Date
  updatedAt: Date
  year?: string
  model?: string
  uid?: string
  whatsapp?: string
  owner?: string
  mercadoPago?: boolean
  frete?: boolean
}

export interface PartsImageProps {
  name: string;
  uid: string;
  url: string;
}

export interface Category {
  id: string
  name: string
  slug: string
}

export const categories: Category[] = [
  { id: "1", name: "Aerofólios", slug: "aerofolios" },
  { id: "2", name: "Para-choques", slug: "para-choques" },
  { id: "3", name: "Spoilers", slug: "spoilers" },
  { id: "4", name: "Saias Laterais", slug: "saias-laterais" },
  { id: "5", name: "Capôs", slug: "capos" },
  { id: "6", name: "Rodas", slug: "rodas" },
]
