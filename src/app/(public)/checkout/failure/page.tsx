'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutFailurePage() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8 p-8 bg-zinc-950 rounded-lg shadow-lg">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Pagamento Não Aprovado
                    </h2>
                    <p className="mt-2 text-sm text-white">
                        Houve um problema com seu pagamento. Você será redirecionado para a página
                        inicial em alguns segundos.
                    </p>
                </div>
            </div>
        </div>
    );
} 