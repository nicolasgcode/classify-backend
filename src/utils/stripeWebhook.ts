import { Request, Response } from 'express';
import Stripe from 'stripe';
import { orm } from '../shared/orm.js';
import { Order } from '../entities/order.entity.js';

const em = orm.em;

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
    case 'payment_intent.succeeded':
      const session = event.data.object;

      const orderId = session.metadata || {};

      console.log(session.metadata);

      const order = await em.findOneOrFail(Order, { id: orderId });

      console.log(order);

      order.status = 'paid';

      await em.persistAndFlush(order);

      break;
    default:
      // Handle other event types
      console.log(`Unhandled event type: ${event.type}`);
      res.status(200).json({ received: true });
  }
}

export { stripeWebhook };
