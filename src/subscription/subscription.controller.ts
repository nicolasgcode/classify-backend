import { Request, Response, NextFunction } from 'express';
import { SubscriptionRepository } from './subscription.repository.js';
import { Subscription } from './subscription.entity.js';
//import {findOne as findOnePriceSubscription} from './priceSubscription.controller.js'
import { PriceSubscriptionRepository } from './priceSubscription.repository.js';
import { PriceSubscription } from './priceSubscription.entity.js';
const repository = new SubscriptionRepository();
const priceSubscriptionRepository = new PriceSubscriptionRepository();
/*
function sanitizeSubscriptionInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    dateStart: new Date(req.body.dateStart),
    price : findOnePriceSubscription(req.body.price, res),
  };   // Middleware
  //more checks here (content, type)

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  }); // Remove undefined
  next();
}
*/
function sanitizeSubscriptionInput(req: Request, res: Response, next: NextFunction) {
  const { id, dateStart, priceValue } = req.body;

  // Validación básica
  if (!id || !dateStart || !priceValue) {
    return res.status(400).send({ message: 'Invalid input data' });
  }

  // Manejo de posibles errores en findOnePriceSubscription
  const today = new Date();
  const price = new PriceSubscription('1', today, priceValue);
  const prices : PriceSubscription[]= [price];
  /*
  if (!priceValue) {
    return res.status(400).send({ message: 'Invalid price ID' });
  }
    */
  req.body.sanitizedInput = {
    id,
    dateStart: new Date(dateStart),
    prices: prices,
  };

  // Eliminación de propiedades undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}
function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const subscription = repository.findOne({ id });
  if (!subscription) {
    return res.status(404).send({ message: 'Subscription not found' });
  }
  res.json({ data: subscription });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const subscriptionInput = new Subscription(
    input.id,
    input.dateStart,
    input.price,
  );
  const subscription = repository.add(subscriptionInput);
  return res.status(201).send({ message: 'Subscription created', data: subscription });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const subscription = repository.update(req.body.sanitizedInput);

  if (!subscription) {
    return res.status(404).send({ message: 'Subscription not found' });
  }

  res.status(200).send({ message: 'Subscription edited successfully!', data: subscription });
}


function remove(req: Request, res: Response) {
  const id = req.params.id;
  const subscription = repository.delete({ id });

  if (!subscription) {
    return res.status(404).send({ message: 'Subscription not found' });
  }
  return res.status(200).send({ message: 'Subscription deleted successfully' });
}

export { sanitizeSubscriptionInput, findAll, findOne, add, update, remove };
