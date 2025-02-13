import { Request, Response } from 'express';
import Stripe from 'stripe';

import { handlePurchase } from '../utils/handlePurchase.js'; // Importa la función handlePurchase

const webhookSecret = process.env.STRIPE_WH_SECRET;

async function stripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    // Verifica el evento con la firma de Stripe
    event = Stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret as string
    );
  } catch (err) {
    console.log(`Error verifying webhook signature: ${(err as Error).message}`);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object; // Esto es el objeto de la sesión de pago

      const { userId, data } = session.metadata || {}; // Recuperamos los datos de la compra, defaulting to an empty object if metadata is null

      // Ejecuta la lógica de negocio para manejar la compra
      try {
        await handlePurchase({
          userId: Number(userId), // Asegúrate de convertir a un número si es necesario
          data: JSON.parse(data), // Asegúrate de convertir los datos si es un JSON
        });
        console.log('Payment completed');
        res.status(200).json({ received: true });
      } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({ error: 'Error processing purchase' });
      }
      break;
    default:
      // Maneja otros tipos de eventos si es necesario
      console.log(`Unhandled event type: ${event.type}`);
      res.status(200).json({ received: true });
  }
}

export { stripeWebhook };
