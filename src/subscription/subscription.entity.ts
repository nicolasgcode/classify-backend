import { PriceSubscription } from './priceSubscription.entity';
export class Subscription {
  constructor(
    public id: string,
    public dateStart: Date,
    public prices: [PriceSubscription],
  ) {}
}
