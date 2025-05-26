import type { Product } from './types'

export async function fetchProduct(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch product')
    }

    const data = await res.json()
    return data.product
}

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch('/api/products', {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch products')
    }

    const data = await res.json()
    return data.products
} 