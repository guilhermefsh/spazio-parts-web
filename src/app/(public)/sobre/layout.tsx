import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Sobre Nós',
    description: 'Conheça a Spazio Parts, sua parceira em peças automotivas premium. Qualidade, confiança e excelência em cada produto.',
    keywords: ['sobre Spazio Parts', 'história Spazio Parts', 'peças automotivas', 'qualidade premium', 'automotivo'],
    openGraph: {
        title: 'Sobre Nós - Spazio Parts',
        description: 'Conheça a Spazio Parts, sua parceira em peças automotivas premium. Qualidade, confiança e excelência em cada produto.',
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

export default function SobreLayout({
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

