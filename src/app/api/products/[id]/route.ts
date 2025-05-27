import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'
import type { Product } from '@/lib/types'
import { deleteProduct } from '@/lib/products'
import { productSchema } from '@/lib/validations'

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

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const validatedData = productSchema.parse(body)

        const docRef = doc(db, "parts", params.id)
        const snapshot = await getDoc(docRef)

        if (!snapshot.exists()) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            )
        }

        const images = validatedData.images.map(url => ({
            name: url.split('/').pop() || 'image',
            uid: Math.random().toString(36).substring(7),
            url,
        }))

        await updateDoc(docRef, {
            ...validatedData,
            price: parseFloat(validatedData.price),
            images,
            updated: Timestamp.now(),
        })

        return NextResponse.json({
            message: 'Product updated successfully'
        })
    } catch (error) {
        console.error('Error updating product:', error)
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { error } = await deleteProduct(params.id)

        if (error) {
            return NextResponse.json(
                { error: 'Failed to delete product' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: 'Product deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Internal server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 