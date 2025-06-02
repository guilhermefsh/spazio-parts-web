import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { sendOrderConfirmationEmail, sendOwnerNotificationEmail } from "@/lib/email";

interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface MercadoPagoAddress {
  street_name?: string;
  street_number?: string;
  neighborhood?: string;
  city?: string;
  federal_unit?: string;
  zip_code?: string;
}

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  try {
    const metadata = paymentData.metadata;
    if (!metadata) {
      throw new Error("No metadata found in payment data");
    }

    // Parse the products and shipping data from metadata
    const products = JSON.parse(metadata.products || "[]") as Product[];
    const shipping = JSON.parse(metadata.shipping || "{}");
    const total = parseFloat(metadata.total || "0");

    // Get payer information from payment data
    const payer = paymentData.payer;
    if (!payer || !payer.email) {
      throw new Error("No payer information found in payment data");
    }

    const address = payer.address as MercadoPagoAddress;

    // Prepare order details for email
    const orderDetails = {
      name: payer.first_name + " " + (payer.last_name || ""),
      email: payer.email,
      phone: payer.phone?.number || "",
      products: products.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price
      })),
      shipping: {
        name: shipping.name,
        price: shipping.price
      },
      total: total,
      address: {
        street: address?.street_name || "",
        number: address?.street_number || "",
        neighborhood: address?.neighborhood || "",
        city: address?.city || "",
        state: address?.federal_unit || "",
        cep: address?.zip_code || ""
      }
    };

    // Send confirmation email to customer
    await sendOrderConfirmationEmail(orderDetails);

    // Send notification email to owner
    await sendOwnerNotificationEmail(orderDetails);

    return { success: true };
  } catch (error) {
    console.error("Error handling payment:", error);
    throw error;
  }
}
