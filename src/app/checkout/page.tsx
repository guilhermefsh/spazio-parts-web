'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckoutFormData, CheckoutStep } from '@/types/checkout';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { PersonalInfoForm } from '@/components/checkout/PersonalInfoForm';
import { AddressForm } from '@/components/checkout/AddressForm';
import { ReviewForm } from '@/components/checkout/ReviewForm';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { removeMask } from '@/utils/masks';

const steps: CheckoutStep[] = [
    {
        id: 1,
        title: 'Informações Pessoais',
        description: 'Nome, CPF e contato',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'Endereço',
        description: 'Endereço de entrega',
        isCompleted: false,
    },
    {
        id: 3,
        title: 'Revisão',
        description: 'Confirme seus dados',
        isCompleted: false,
    },
];

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<CheckoutFormData>({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        address: {
            cep: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
        },
        products: [],
        shipping: {
            name: '',
            price: 0,
            estimatedDays: 0,
        },
        total: 0,
    });

    useEffect(() => {
        const checkoutId = searchParams.get('id');

        if (!checkoutId) {
            router.push('/produto');
            return;
        }

        const fetchCheckoutData = async () => {
            try {
                const response = await fetch(`/api/checkout/${checkoutId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch checkout data');
                }

                const data = await response.json();

                const productsTotal = data.products.reduce(
                    (acc: number, product: { price: number; quantity: number }) => acc + product.price * product.quantity,
                    0
                );
                const total = productsTotal + data.shipping.price;

                setFormData((prev) => ({
                    ...prev,
                    products: data.products,
                    shipping: data.shipping,
                    total,
                }));
            } catch (error) {
                console.error('Error fetching checkout data:', error);
                router.push('/produto');
            }
        };

        fetchCheckoutData();
    }, [searchParams, router]);

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleFormDataChange = (data: Partial<CheckoutFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PersonalInfoForm
                        formData={formData}
                        onNext={handleNext}
                        onChange={handleFormDataChange}
                    />
                );
            case 2:
                return (
                    <AddressForm
                        formData={formData}
                        onNext={handleNext}
                        onBack={handleBack}
                        onChange={handleFormDataChange}
                    />
                );
            case 3:
                return (
                    <ReviewForm
                        formData={formData}
                        onBack={handleBack}
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const cleanFormData = {
                ...formData,
                cpf: removeMask(formData.cpf),
                phone: removeMask(formData.phone)
            };

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanFormData),
            });

            if (!response.ok) {
                throw new Error('Erro ao processar checkout');
            }

            const data = await response.json();
            window.location.href = data.checkoutUrl;
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-background rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
                    <CheckoutStepper steps={steps} currentStep={currentStep} />
                    <div className="mt-8 bg-background rounded-lg p-6">
                        {renderStep()}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
} 