import type { Metadata } from 'next'

export const homeMetadata: Metadata = {
    title: 'Peças para Carros Antigos | Fiat Uno, Spazio e Mais | Spazio Parts',
    description: 'Encontre parachoques, aerofólios, saias laterais e outras peças automotivas para Fiat Uno, Spazio e carros antigos com qualidade premium. Spazio Parts é referência em peças exclusivas.',
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
        title: 'Peças para Carros Antigos | Spazio Parts',
        description: 'Compre peças automotivas como parachoques, aerofólios e saias laterais para carros antigos. Qualidade premium com envio rápido para todo o Brasil.',
        images: [
            {
                url: '/logo.jpg',
                width: 800,
                height: 600,
                alt: 'Spazio Parts Logo',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Peças para Carros Antigos | Spazio Parts',
        description: 'As melhores peças automotivas para Fiat Uno, Spazio e outros modelos clássicos. Confira agora!',
        images: ['/logo.jpg']
    }
} 