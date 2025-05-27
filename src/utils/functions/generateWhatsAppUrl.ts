interface WhatsAppMessageParams {
    productName: string
    price: number
    quantity: number
    totalPrice: number
}

export const generateWhatsAppUrl = ({ productName, price, quantity, totalPrice }: WhatsAppMessageParams): string => {
    const message = `Olá! Tenho interesse no produto: ${productName} - R$ ${price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
    
    Quantidade: ${quantity}
    Total: R$ ${totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}

    Gostaria de mais informações!`

    return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
} 