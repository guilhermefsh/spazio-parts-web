interface ProductParams {
    width: number;
    height: number;
    length: number;
    weight: number;
    insurance_value: number;
    quantity?: number;
}

export async function quoteShipping(cepDestino: string, product: ProductParams) {
    const token = process.env.MELHOR_ENVIO_TOKEN;
    const cepOrigin = process.env.NEXT_PUBLIC_STORE_POSTAL_CODE;
    const userAgent = process.env.NEXT_PUBLIC_USER_AGENT;
    const melhorEnvioUrl = process.env.NEXT_PUBLIC_MELHOR_ENVIO_URL
    const response = await fetch(`${melhorEnvioUrl}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
                "User-Agent": `${userAgent}`
            },
            body: JSON.stringify({
                from: { postal_code: cepOrigin },
                to: { postal_code: cepDestino },
                products: [
                    {
                        id: "x",
                        width: product.width,
                        height: product.height,
                        length: product.length,
                        weight: product.weight,
                        insurance_value: product.insurance_value,
                        quantity: product.quantity || 1
                    },
                ],
                services: '3',
            }),
        }
    );

    if (!response.ok) {
        throw new Error('Erro ao calcular frete');
    }

    const data = await response.json();
    return data;
}
