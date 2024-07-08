import { Request, Response, NextFunction } from 'express';
import { PriceSubscriptionRepository } from './priceSubscription.repository.js';
import { PriceSubscription } from './priceSubscription.entity.js';

const repository = new PriceSubscriptionRepository();
/*
function sanitizePriceSubscriptionInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    dateStart: new Date(req.body.dateStart),
    price : parseInt(req.body.price, 10),//
  }; // Middleware
  //more checks here (content, type)

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  }); // Remove undefined
  next();
}
  */
function sanitizePriceSubscriptionInput(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, dateStart, price } = req.body;

    // Validación básica
    
    if (!id || !price ) {
      return res.status(400).send({ message: 'Invalid input data' });
    }

    // Verificación del tipo de datos
    const parsedPrice = parseInt(price, 10);
    let parsedDateStart: Date;
    if (dateStart !== undefined) {
      parsedDateStart = new Date(dateStart);
    } else {
      parsedDateStart = new Date();
    }
    if (isNaN(parsedPrice)) {
      return res.status(400).send({ message: 'Invalid price format' });
    }

    req.body.sanitizedInput = {
      id,
      dateStart: parsedDateStart,
      price: parsedPrice,
    };

    // Eliminación de propiedades undefined
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });

    next();
  } catch (error) {
    return res.status(500).send({ message: 'Error processing input' });
  }
}
function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}


function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const priceSubscription = repository.findOne({ id });
  if (!priceSubscription) {
    return res.status(404).send({ message: 'PriceSubscription not found' });
  }
  res.json({ data: priceSubscription });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const priceSubscriptionInput = new PriceSubscription(
    input.id,
    input.dateStart,
    input.price,
  );

  const priceSubscription = repository.add(priceSubscriptionInput);
  return res.status(201).send({ message: 'PriceSubscription created', data: priceSubscription });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const priceSubscription = repository.update(req.body.sanitizedInput);

  if (!priceSubscription) {
    return res.status(404).send({ message: 'PriceSubscription not found' });
  }

  res.status(200).send({ message: 'PriceSubscription edited successfully!', data: priceSubscription });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const priceSubscription = repository.delete({ id });

  if (!priceSubscription) {
    return res.status(404).send({ message: 'PriceSubscription not found' });
  }
  return res.status(200).send({ message: 'PriceSubscription deleted successfully' });
}

export { sanitizePriceSubscriptionInput, findAll, findOne, add, update, remove };
