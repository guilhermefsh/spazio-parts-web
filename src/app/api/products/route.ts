import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, getDocs, addDoc } from 'firebase/firestore'
import type { Product } from '@/lib/types'
import { productSchema } from '@/lib/validations'

export async function GET() {
    try {
        const partsRef = collection(db, "parts")
        const queryRef = query(partsRef, orderBy("created", "desc"))

        const snapshot = await getDocs(queryRef)
        const products: Product[] = []

        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description || '',
                price: doc.data().price,
                category: doc.data().category || 'uncategorized',
                images: (doc.data().images || []),
                createdAt: doc.data().created?.toDate() || new Date(),
                updatedAt: doc.data().updated?.toDate() || new Date(),
            })
        })

        return NextResponse.json({ products })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const validatedData = productSchema.parse(body)

        const partsRef = collection(db, "parts")
        const docRef = await addDoc(partsRef, {
            ...validatedData,
            price: validatedData.price,
            images: validatedData.images.map(url => ({
                name: url.split('/').pop() || 'image',
                uid: Math.random().toString(36).substring(7),
                url,
            })),
            created: new Date(),
            updated: new Date(),
        })

        return NextResponse.json({
            id: docRef.id,
            message: 'Product created successfully'
        })
    } catch (error) {
        console.error('Error creating product:', error)
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message, details: error },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
} 