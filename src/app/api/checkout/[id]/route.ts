import { NextResponse } from 'next/server';

import { checkoutStore } from '../init/route';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const checkout = checkoutStore.get(params.id);

        if (!checkout) {
            return NextResponse.json(
                { error: 'Checkout not found' },
                { status: 404 }
            );
        }

        if (checkout.expiresAt < Date.now()) {
            checkoutStore.delete(params.id);
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