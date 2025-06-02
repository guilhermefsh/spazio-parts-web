import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Peça automotiva',
    description: 'Produto da Spazio Parts',
    keywords: [
        'peças para fiat uno',
        'peças para carro antigo',
        'aerofólio fiat uno',
        'parachoque uno',
        'parachoque spazio',
        'saias laterais fiat',
        'loja de peças automotivas',
        'peças antigas automotivas',
        'spazio parts',
        'aerofólio esportivo',
        'parachoque dianteiro e traseiro'
    ],
    openGraph: {
        title: 'Peça automotiva',
        description: 'Produto da Spazio Parts',
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
export default function ProductIdLayout({
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

