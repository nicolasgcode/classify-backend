import 'dotenv/config';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { generateOrder } from '../utils/generateOrder.js';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function checkout(req: Request, res: Response) {
  try {
    const { data, userId } = req.body;

    const order = await generateOrder(data, userId, res);

    if (!order) {
      throw new Error('Error creating order');
    }

    const orderId = order.id;

    const line_items = data.map((item: { name: string; price: number }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/store`,
      metadata: { id: orderId },
    });

    res.status(201).json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
