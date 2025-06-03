import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail, sendOwnerNotificationEmail } from "@/lib/email";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
    // Check if we're in development environment
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: "This endpoint is only available in development environment" },
            { status: 403 }
        );
    }

    try {
        const testOrderDetails = {
            name: "João Silva",
            email: "joao@exemplo.com",
            phone: "11999999999",
            products: [
                {
                    name: "Peça Teste 1",
                    quantity: 2,
                    price: 150.50
                },
                {
                    name: "Peça Teste 2",
                    quantity: 1,
                    price: 299.90
                }
            ],
            shipping: {
                name: "Frete Expresso",
                price: 45.90
            },
            total: 646.80,
            address: {
                street: "Rua Teste",
                number: "123",
                neighborhood: "Centro",
                city: "São Paulo",
                state: "SP",
                cep: "01234-567"
            }
        };

        const confirmationResult = await sendOrderConfirmationEmail(testOrderDetails);
        const notificationResult = await sendOwnerNotificationEmail(testOrderDetails);

        return NextResponse.json({
            success: true,
            confirmationEmail: confirmationResult,
            notificationEmail: notificationResult
        });
    } catch (error) {
        console.error("Error testing email:", error);
        return NextResponse.json(
            { error: "Failed to test email", details: error },
            { status: 500 }
        );
    }
} 