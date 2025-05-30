import { quoteShipping } from "@/lib/melhor-envio";
import { NextRequest, NextResponse } from "next/server";

interface ShippingRequest {
    cep: string;
    product: {
        width: number;
        height: number;
        length: number;
        weight: number;
        insurance_value: number;
        quantity?: number;
    };
}

export async function POST(req: NextRequest) {
    const { cep, product } = await req.json() as ShippingRequest;

    if (!cep) {
        return NextResponse.json({ error: "CEP é obrigatório" }, { status: 400 });
    }

    if (!product) {
        return NextResponse.json({ error: "Parâmetros do produto são obrigatórios" }, { status: 400 });
    }

    try {
        const result = await quoteShipping(cep, product);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro na cotação" }, { status: 500 });
    }
}
