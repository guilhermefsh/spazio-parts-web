import { useState } from 'react';
import { CheckoutFormData } from '@/types/checkout';
import { validateCPF, validateEmail, validatePhone } from '@/utils/validation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { maskCPF, maskPhone } from '@/utils/masks';

interface PersonalInfoFormProps {
    formData: CheckoutFormData;
    onNext: () => void;
    onChange: (data: Partial<CheckoutFormData>) => void;
}

export function PersonalInfoForm({
    formData,
    onNext,
    onChange,
}: PersonalInfoFormProps) {
    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

    const validateForm = () => {
        const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!validateCPF(formData.cpf)) {
            newErrors.cpf = 'CPF inválido';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Telefone inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onNext();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-white">
                        Nome Completo
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                        className={`mt-1 bg-zinc-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <Label htmlFor="cpf" className="block text-sm font-medium text-white">
                        CPF
                    </Label>
                    <Input
                        type="text"
                        id="cpf"
                        value={maskCPF(formData.cpf)}
                        onChange={(e) => onChange({ cpf: e.target.value })}
                        className={`bg-zinc-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.cpf ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf}</p>}
                </div>

                <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-white">
                        Email
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                        className={`mt-1 bg-zinc-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-white">
                        Telefone
                    </Label>
                    <Input
                        type="tel"
                        id="phone"
                        value={maskPhone(formData.phone)}
                        onChange={(e) => onChange({ phone: e.target.value })}
                        className={`mt-1 bg-zinc-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </form>
    );
} 