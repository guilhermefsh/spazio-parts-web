import { NextResponse } from 'next/server';
import { CheckoutFormData } from '@/types/checkout';
import { CHECKOUT_EXPIRY, checkoutStore } from '@/lib/checkout-store';

export async function POST(request: Request) {
    try {
        const checkoutData: {
            products: CheckoutFormData['products'];
            shipping: CheckoutFormData['shipping'];
        } = await request.json();

        if (!checkoutData.products?.length || !checkoutData.shipping) {
            return NextResponse.json(
                { error: 'Invalid checkout data' },
                { status: 400 }
            );
        }

        const checkoutId = Math.random().toString(36).substring(2, 15);

        checkoutStore.set(checkoutId, {
            data: checkoutData,
            expiresAt: Date.now() + CHECKOUT_EXPIRY
        });

        return NextResponse.json({
            checkoutId
        });
    } catch (error) {
        console.error('Error initializing checkout:', error);
        return NextResponse.json(
            { error: 'Error initializing checkout' },
            { status: 500 }
        );
    }
} 