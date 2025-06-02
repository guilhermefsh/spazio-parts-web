import { checkoutStore } from '@/lib/checkout-store';
import { NextResponse } from 'next/server';


export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const id = (await context.params).id;
    try {
        const checkout = checkoutStore.get(id);

        if (!checkout) {
            return NextResponse.json(
                { error: 'Checkout not found' },
                { status: 404 }
            );
        }

        if (checkout.expiresAt < Date.now()) {
            checkoutStore.delete(id);
            return NextResponse.json(
                { error: 'Checkout has expired' },
                { status: 410 }
            );
        }

        return NextResponse.json(checkout.data);
    } catch (error) {
        console.error('Error fetching checkout:', error);
        return NextResponse.json(
            { error: 'Error fetching checkout' },
            { status: 500 }
        );
    }
} 