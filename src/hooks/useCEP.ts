import { useState, useTransition } from 'react';

interface AddressData {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
}

interface UseCEPReturn {
    fetchAddressByCEP: (cep: string) => Promise<AddressData>;
    error: string | null;
    isPending: boolean;
}

export function useCEP(): UseCEPReturn {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const fetchAddressByCEP = async (cep: string): Promise<AddressData> => {
        setError(null);

        return new Promise((resolve, reject) => {
            startTransition(async () => {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();

                    if (data.erro) {
                        throw new Error('CEP não encontrado');
                    }

                    resolve({
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf,
                    });
                } catch (error: unknown) {
                    const errorMessage = error instanceof Error ? error.message : 'CEP inválido ou não encontrado';
                    setError(errorMessage);
                    reject(new Error(errorMessage));
                }
            });
        });
    };

    return {
        fetchAddressByCEP,
        error,
        isPending,
    };
} 