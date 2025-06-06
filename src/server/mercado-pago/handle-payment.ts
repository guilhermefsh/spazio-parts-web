import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { sendOrderConfirmationEmail, sendOwnerNotificationEmail } from "@/lib/email";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Shipping {
  name: string;
  price: number;
  estimatedDays?: number;
}

interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  try {
    const metadata = paymentData.metadata;
    if (!metadata) {
      throw new Error("No metadata found in payment data");
    }

    const email = metadata.email;
    const name = metadata.name;
    const phone = metadata.phone;
    const cpf = metadata.cpf;
    const address = JSON.parse(metadata.address || "{}") as Address;
    const products = JSON.parse(metadata.products || "[]") as Product[];
    const shipping = JSON.parse(metadata.shipping || "{}") as Shipping;
    const total = parseFloat(metadata.total || "0");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(email);
      throw new Error("Invalid email format received from metadata");
    }

    const processedProducts = products.map(product => ({
      ...product,
      price: Number(product.price)
    }));

    const processedShipping = {
      ...shipping,
      price: Number(shipping.price)
    };

    const orderDetails = {
      name,
      email,
      phone,
      cpf,
      products: processedProducts.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price
      })),
      shipping: {
        name: processedShipping.name,
        price: processedShipping.price
      },
      total,
      address: {
        street: address.street || "",
        number: address.number || "",
        neighborhood: address.neighborhood || "",
        city: address.city || "",
        state: address.state || "",
        cep: address.cep || ""
      }
    };

    await sendOrderConfirmationEmail(orderDetails);
    await sendOwnerNotificationEmail(orderDetails);

    return { success: true };
  } catch (error) {
    console.error("Error handling payment:", error);
    throw error;
  }
}
