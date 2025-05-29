import { CheckoutFormData } from '@/types/checkout';
import { Button } from '../ui/button';

interface ReviewFormProps {
    formData: CheckoutFormData;
    onBack: () => void;
    onSubmit: () => void;
}

export function ReviewForm({ formData, onBack, onSubmit }: ReviewFormProps) {
    return (
        <div className="max-w-md mx-auto">
            <div className="bg-zinc-900 shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Revise seus dados</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-white">Informações Pessoais</h3>
                        <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Nome:</span> {formData.name}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">CPF:</span> {formData.cpf}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Email:</span> {formData.email}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Telefone:</span> {formData.phone}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-white">Endereço de Entrega</h3>
                        <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">CEP:</span> {formData.address.cep}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Endereço:</span> {formData.address.street},{' '}
                                {formData.address.number}
                                {formData.address.complement && `, ${formData.address.complement}`}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Bairro:</span> {formData.address.neighborhood}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Cidade/Estado:</span> {formData.address.city}/
                                {formData.address.state}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-white">Produtos</h3>
                        <div className="mt-2 space-y-2">
                            {formData.products.map((product) => (
                                <div key={product.id} className="flex justify-between text-sm">
                                    <span>
                                        {product.name} x {product.quantity}
                                    </span>
                                    <span className="font-medium">
                                        R$ {(product.price * product.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-white">Frete</h3>
                        <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Tipo:</span> {formData.shipping.name}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Prazo estimado:</span>{' '}
                                {formData.shipping.estimatedDays} dias
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Valor:</span> R${' '}
                                {formData.shipping.price.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-medium">
                            <span>Total</span>
                            <span>R$ {formData.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    <Button
                        type="button"
                        onClick={onBack}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Voltar
                    </Button>
                    <Button
                        type="button"
                        onClick={onSubmit}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Finalizar Compra
                    </Button>
                </div>
            </div>
        </div>
    );
} 