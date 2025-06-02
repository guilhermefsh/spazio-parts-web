'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center px-4">
                    <h1 className="text-9xl font-bold text-white">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-600 mt-4">
                        Página não encontrada
                    </h2>
                    <p className="text-gray-500 mt-2 mb-8">
                        Desculpe, a página que você está procurando não existe.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Voltar para a página inicial
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
} 