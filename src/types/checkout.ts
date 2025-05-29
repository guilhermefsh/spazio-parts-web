export interface Address {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Shipping {
    name: string;
    price: number;
    estimatedDays: number;
}

export interface CheckoutFormData {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    address: Address;
    products: Product[];
    shipping: Shipping;
    total: number;
}

export interface CheckoutStep {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
} 