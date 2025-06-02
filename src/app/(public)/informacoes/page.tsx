
export default function InformationsPage() {
    return (
        <>
            <main className="min-h-screen bg-background py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-8">Informações de Pagamento e Reembolso</h1>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Compra</h2>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="text-xl font-medium text-white mb-3">Processo de compra</h3>
                            <p className="text-gray-300 mb-4">
                                Após a compra, entraremos em contato para confirmar o pagamento e o envio do produto.
                            </p>
                            <p className="text-gray-300 mb-4">
                                Caso queira conversar e comprar pelo whatsapp, entre em contato no número: <span className="text-blue-500">+55 (11) 94159-7301</span>
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-white mb-4">Métodos de Pagamento</h2>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="text-xl font-medium text-white mb-3">Cartões de Crédito</h3>
                            <p className="text-gray-300 mb-4">
                                Aceitamos todas as bandeiras principais: Visa, Mastercard, American Express e Elo.
                                O pagamento é processado de forma segura através da plataforma de pagamento do <span className="text-blue-500">Mercado Pago.</span>
                            </p>

                            <h3 className="text-xl font-medium text-white mb-3">PIX</h3>
                            <p className="text-gray-300 mb-4">
                                Pagamento instantâneo e seguro através do PIX. O código será gerado automaticamente
                                após a confirmação do pedido.
                            </p>

                            <h3 className="text-xl font-medium text-white mb-3">Boleto Bancário</h3>
                            <p className="text-gray-300">
                                O boleto bancário estará disponível para pagamento em até 3 dias úteis após a confirmação
                                do pedido. O prazo de compensação é de até 3 dias úteis após o pagamento.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Política de Reembolso</h2>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="text-xl font-medium text-white mb-3">Prazo para Solicitação</h3>
                            <p className="text-gray-300 mb-4">
                                Você tem até 7 dias após o recebimento do produto para solicitar um reembolso,
                                conforme estabelecido pelo Código de Defesa do Consumidor.
                            </p>

                            <h3 className="text-xl font-medium text-white mb-3">Condições para Reembolso</h3>
                            <ul className="list-disc list-inside text-gray-300 mb-4">
                                <li>Produtos quebrados ou com defeito</li>
                                <li>Produtos não recebidos</li>
                                <li>Produtos não conformes com a descrição</li>
                            </ul>

                            <h3 className="text-xl font-medium text-white mb-3">Processo de Reembolso</h3>
                            <p className="text-gray-300 mb-4">
                                Como nossa plataforma de pagamento é o <span className="text-blue-500">Mercado Pago</span>, o processo de reembolso é feito através do Mercado Pago.
                            </p>
                            <p className="text-gray-300 mb-4">
                                Após a aprovação do reembolso, o valor será devolvido no mesmo método de pagamento
                                utilizado na compra, em até 10 dias úteis.
                            </p>

                            <h3 className="text-xl font-medium text-white mb-3">Contato</h3>
                            <p className="text-gray-300">
                                Para solicitar um reembolso ou tirar dúvidas sobre nossa política, entre em contato
                                com nosso suporte através do e-mail: <span className="text-blue-500">salves.evel@yahoo.com.br</span>
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
} 