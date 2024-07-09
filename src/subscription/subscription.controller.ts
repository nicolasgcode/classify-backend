import { Request, Response, NextFunction } from 'express';
import { SubscriptionRepository } from './subscription.repository.js';
import { Subscription } from './subscription.entity.js';

const repository = new SubscriptionRepository();
function sanitizeSubscriptionInput(req: Request, res: Response, next: NextFunction) {
  const { id, dateStart, price } = req.body;

  // Validación básica
  /*
  if (!id || !dateStart || !price) {
    return res.status(400).send({ message: 'Invalid input data' });
  }
*/
  // Manejo de posibles errores en findOnePriceSubscription
 
  try {
    if (req.body.price !== undefined) {
      req.body.price = parseFloat(req.body.price);
    }
  } catch (error) {
      return res.status(400).send({ message: 'Invalid price' });
  }
  try {
    if (req.body.dateStart !== undefined) {
      req.body.dateStart = new Date(req.body.dateStart);
    }
  } catch (error) { 
    return res.status(400).send({ message: 'Invalid dateStart' });
  }

  req.body.sanitizedInput = {
    id: req.body.id,
    dateStart: req.body.dateStart,
    price: req.body.price,
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
