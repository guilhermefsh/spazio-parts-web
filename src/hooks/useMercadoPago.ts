import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ShippingData {
    name: string;
    price: number;
    estimatedDays: number;
}

interface ProductData {
    id: string;
    name: string;
    price: number;
    quantity: number;
    mercadoPago?: string;
}

export const useMercadoPago = () => {
    const router = useRouter();

    const handleCheckout = async (product: ProductData, shipping?: ShippingData) => {
        try {
            if (!shipping) {
                toast.error('Por favor, selecione um frete antes de prosseguir.');
                return;
            }

            const checkoutData = {
                products: [{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                }],
                shipping: {
                    name: shipping.name,
                    price: shipping.price,
                    estimatedDays: shipping.estimatedDays
                }
            };

            const response = await fetch('/api/checkout/init', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutData),
            });

            if (!response.ok) {
                throw new Error('Failed to initialize checkout');
            }

            const { checkoutId } = await response.json();
            router.push(`/checkout?id=${checkoutId}`);
        } catch (error) {
            console.error('Error handling Mercado Pago checkout:', error);
            toast.error('Erro ao processar pagamento. Tente novamente.');
        }
    };

    return { handleCheckout };
}; 