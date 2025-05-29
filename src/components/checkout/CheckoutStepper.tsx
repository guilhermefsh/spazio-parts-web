import { CheckoutStep } from '@/types/checkout';

interface CheckoutStepperProps {
    steps: CheckoutStep[];
    currentStep: number;
}

export function CheckoutStepper({ steps, currentStep }: CheckoutStepperProps) {
    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center bg-background w-full sm:w-auto">
                        <div
                            className={`flex items-center justify-center min-w-[3rem] h-12 rounded-full ${currentStep >= step.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                                }`}
                        >
                            <span className="text-lg font-medium px-3">{step.id}</span>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium">{step.title}</h3>
                            <p className="text-xs text-gray-500">{step.description}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`hidden sm:block w-full h-1 mx-4 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 