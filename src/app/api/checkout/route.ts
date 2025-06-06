import { NextResponse } from 'next/server';
import { CheckoutFormData } from '@/types/checkout';
import { preference } from '@/lib/mercado-pago';

export async function POST(request: Request) {
    try {
        const formData: CheckoutFormData = await request.json();

        const preferenceData = {
            items: [
                ...formData.products.map((product) => ({
                    id: product.id,
                    title: product.name,
                    unit_price: Number(product.price),
                    quantity: product.quantity,
                })),
                {
                    id: 'shipping',
                    title: `Frete - ${formData.shipping.name}`,
                    unit_price: Number(formData.shipping.price),
                    quantity: 1,
                },
            ],
            payer: {
                name: formData.name,
                email: formData.email,
                identification: {
                    type: 'CPF',
                    number: formData.cpf.replace(/\D/g, ''),
                },
                address: {
                    zip_code: formData.address.cep,
                    street_name: formData.address.street,
                    street_number: formData.address.number,
                    neighborhood: formData.address.neighborhood,
                    city: formData.address.city,
                    federal_unit: formData.address.state,
                },
                phone: {
                    area_code: formData.phone.substring(0, 2),
                    number: formData.phone.substring(2).replace(/\D/g, ''),
                },
            },
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
                failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/failure`,
                pending: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/pending`,
            },
            auto_return: 'approved',
            external_reference: `ORDER-${Date.now()}`,
            metadata: {
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                cpf: formData.cpf,
                address: JSON.stringify(formData.address),
                products: JSON.stringify(formData.products),
                shipping: JSON.stringify(formData.shipping),
                total: formData.total,
            },
        };

        const response = await preference.create({ body: preferenceData });

        return NextResponse.json({
            checkoutUrl: process.env.NODE_ENV === 'development'
                ? response.sandbox_init_point
                : response.init_point,
        });
    } catch (error) {
        console.error('Error creating checkout:', error);
        return NextResponse.json(
            { error: 'Error creating checkout' },
            { status: 500 }
        );
    }
}
