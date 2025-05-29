import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutFormData } from '@/types/checkout';
import { addressSchema, type AddressFormData } from '@/lib/validations';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { maskCEP } from '@/utils/masks';
import { useCEP } from '@/hooks/useCEP';
import React from 'react';

interface AddressFormProps {
    formData: CheckoutFormData;
    onNext: () => void;
    onBack: () => void;
    onChange: (data: Partial<CheckoutFormData>) => void;
}

export function AddressForm({
    formData,
    onNext,
    onBack,
    onChange,
}: AddressFormProps) {
    const { fetchAddressByCEP, isPending } = useCEP();
    const [cepError, setCepError] = React.useState<string | null>(null);
    const form = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            cep: formData.address.cep || '',
            street: formData.address.street || '',
            number: formData.address.number || '',
            complement: formData.address.complement || '',
            neighborhood: formData.address.neighborhood || '',
            city: formData.address.city || '',
            state: formData.address.state || '',
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        setError,
    } = form;

    const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        setCepError(null);
        if (cep.length <= 8) {
            form.setValue('cep', cep);
            onChange({
                address: {
                    ...formData.address,
                    cep,
                },
            });

            if (cep.length === 8) {
                try {
                    const addressData = await fetchAddressByCEP(cep);
                    form.setValue('street', addressData.street);
                    form.setValue('neighborhood', addressData.neighborhood);
                    form.setValue('city', addressData.city);
                    form.setValue('state', addressData.state);

                    onChange({
                        address: {
                            ...formData.address,
                            street: addressData.street,
                            neighborhood: addressData.neighborhood,
                            city: addressData.city,
                            state: addressData.state,
                        },
                    });
                } catch (error: unknown) {
                    console.error('Erro ao buscar CEP:', error);
                    setError('cep', { message: 'CEP inválido ou não encontrado' });
                    setCepError('Erro ao buscar CEP, tente novamente ou digite manualmente');
                }
            }
        }
    };

    const onSubmit = (data: AddressFormData) => {
        onChange({
            address: {
                ...formData.address,
                ...data,
            },
        });
        onNext();
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-zinc-900"
                                        value={maskCEP(field.value)}
                                        onChange={handleCEPChange}
                                    />
                                </FormControl>
                                {isPending && (
                                    <p className="text-sm text-blue-500 mt-1">Buscando CEP...</p>
                                )}
                                {cepError && (
                                    <p className="text-sm text-red-500 mt-1">{cepError}</p>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rua</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-zinc-900"
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-zinc-900"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="complement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complemento</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-zinc-900"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bairro</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-zinc-900"
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-zinc-900"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-zinc-900"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="pt-4 flex space-x-4">
                        <Button
                            type="button"
                            onClick={onBack}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Voltar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            disabled={isSubmitting}
                        >
                            Próximo
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
} 