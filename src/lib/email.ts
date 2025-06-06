import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shipping: {
    name: string;
    price: number;
  };
  total: number;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
}

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Spazio Parts <noreply@spazioparts.com>',
      to: `${orderDetails.name} <${orderDetails.email}>`,
      subject: 'Confirmação de Pedido - Spazio Parts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Confirmação de Pedido</h1>
          <p>Olá ${orderDetails.name},</p>
          <p>Seu pedido foi recebido com sucesso! Abaixo estão os detalhes:</p>
          
          <h2 style="color: #666;">Produtos:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Produto</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Quantidade</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Preço</th>
            </tr>
            ${orderDetails.products.map(product => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${product.name}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${product.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">R$ ${product.price.toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>

          <h2 style="color: #666;">Frete:</h2>
          <p>${orderDetails.shipping.name} - R$ ${orderDetails.shipping.price.toFixed(2)}</p>

          <h2 style="color: #666;">Endereço de Entrega:</h2>
          <p>
            ${orderDetails.address.street}, ${orderDetails.address.number}<br>
            ${orderDetails.address.neighborhood}<br>
            ${orderDetails.address.city} - ${orderDetails.address.state}<br>
            CEP: ${orderDetails.address.cep}
          </p>

          <h2 style="color: #666;">Total do Pedido:</h2>
          <p style="font-size: 1.2em; font-weight: bold;">R$ ${orderDetails.total.toFixed(2)}</p>

          <p style="margin-top: 20px;">Agradecemos sua compra!</p>
          <p>Em caso de dúvidas, entre em contato conosco.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 0.9em;">
              Spazio Parts<br>
              Telefone: (11) 94159-7301<br>
              Email: alves.evel@yahoo.com.br
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export async function sendOwnerNotificationEmail(orderDetails: OrderDetails) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Spazio Parts <noreply@spazioparts.com>',
      to: 'Spazio Parts <zoiaofiat147@gmail.com>',
      subject: '🚨 Nova Venda Realizada - Spazio Parts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            🎉 Nova Venda Realizada!
          </h1>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dados do Cliente</h2>
            <p><strong>Nome:</strong> ${orderDetails.name}</p>
            <p><strong>Email:</strong> ${orderDetails.email}</p>
            <p><strong>Telefone:</strong> ${orderDetails.phone}</p>
          </div>

          <h2 style="color: #333;">Produtos Vendidos:</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Produto</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Quantidade</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Preço Unit.</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Subtotal</th>
            </tr>
            ${orderDetails.products.map(product => `
              <tr>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${product.name}</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">${product.quantity}</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">R$ ${product.price.toFixed(2)}</td>
                <td style="padding: 12px; border: 1px solid #dee2e6;">R$ ${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>

          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Detalhes do Frete</h2>
            <p><strong>Transportadora:</strong> ${orderDetails.shipping.name}</p>
            <p><strong>Valor do Frete:</strong> R$ ${orderDetails.shipping.price.toFixed(2)}</p>
          </div>

          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Endereço de Entrega</h2>
            <p>
              ${orderDetails.address.street}, ${orderDetails.address.number}<br>
              ${orderDetails.address.neighborhood}<br>
              ${orderDetails.address.city} - ${orderDetails.address.state}<br>
              CEP: ${orderDetails.address.cep}
            </p>
          </div>

          <div style="background-color: #28a745; color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Valor Total da Venda</h2>
            <p style="font-size: 1.5em; font-weight: bold; margin: 0;">
              R$ ${orderDetails.total.toFixed(2)}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #666; font-size: 0.9em;">
              Este é um email automático do sistema de vendas da Spazio Parts.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending owner notification email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send owner notification email:', error);
    throw error;
  }
} 