import { Request, Response } from 'express';
import Stripe from 'stripe';

import { handlePurchase } from '../utils/handlePurchase.js';

const webhookSecret = process.env.STRIPE_WH_SECRET;

async function stripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    // Verify signature
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
      const session = event.data.object;

      const { userId, data } = session.metadata || {}; // Purchase data

      // Call Handle purchase
      try {
        await handlePurchase({
          userId: Number(userId),
          data: JSON.parse(data),
        });
        console.log('Payment completed');
        res.status(200).json({ received: true });
      } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({ error: 'Error processing purchase' });
      }
      break;
    default:
      // Handle other event types
      console.log(`Unhandled event type: ${event.type}`);
      res.status(200).json({ received: true });
  }
}

export { stripeWebhook };
