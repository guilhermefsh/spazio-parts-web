import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import type { Product } from '@/lib/types'

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