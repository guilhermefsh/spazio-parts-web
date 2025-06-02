import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Informações',
    description: 'Informações sobre a Spazio Parts, sua parceira em peças automotivas premium. Qualidade, confiança e excelência em cada produto.',
    keywords: ['Informações Spazio Parts', 'pagamento Spazio Parts', 'reembolso Spazio Parts', 'peças automotivas', 'qualidade premium', 'automotivo'],
    openGraph: {
        title: 'Informações',
        description: 'Informações sobre a Spazio Parts, sua parceira em peças automotivas premium. Qualidade, confiança e excelência em cada produto.',
        images: [
            {
                url: '/logo.jpg',
                width: 800,
                height: 600,
                alt: 'Spazio Parts Logo'
            }
        ]
    }
}

export default function InformationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}

