import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import type { Product } from '@/lib/types'

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    try {
        const { id } = await Promise.resolve(context.params)
        const docRef = doc(db, "parts", id)
        const snapshot = await getDoc(docRef)

        if (!snapshot.exists()) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            )
        }

        const data = snapshot.data()
        const product: Product = {
            id: snapshot.id,
            name: data.name,
            description: data.description || '',
            price: data.price,
            category: data.category || 'uncategorized',
            images: data.images || [],
            createdAt: data.created?.toDate() || new Date(),
            updatedAt: data.updated?.toDate() || new Date(),
            year: data.year,
            model: data.model,
            uid: data.uid,
            whatsapp: data.whatsapp,
            owner: data.owner,
            mercadoPago: data.mercadoPago,
            frete: data.frete
        }

        return NextResponse.json({ product })
    } catch (error) {
        console.error('Error fetching product:', error)
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        )
    }
} 