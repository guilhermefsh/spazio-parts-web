import { CheckoutFormData } from '@/types/checkout';

export const CHECKOUT_EXPIRY = 24 * 60 * 60 * 1000;

export const checkoutStore = new Map<string, {
    data: {
        products: CheckoutFormData['products'];
        shipping: CheckoutFormData['shipping'];
    };
    expiresAt: number;
}>();

setInterval(() => {
    const now = Date.now();
    for (const [id, checkout] of checkoutStore.entries()) {
        if (checkout.expiresAt < now) {
            checkoutStore.delete(id);
        }
    }
}, 60 * 60 * 1000);
