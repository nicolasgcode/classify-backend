import { Repository } from '../shared/repository.js';
import { PriceSubscription } from './priceSubscription.entity.js';

const date = new Date(2024, 5, 17);
const pricePriceSubscriptions = [new PriceSubscription('1', date, 100)];


export class PriceSubscriptionRepository implements Repository<PriceSubscription> {
  public findAll(): PriceSubscription[] | undefined {
    return pricePriceSubscriptions;
  }
  public findOne(item: { id: string }): PriceSubscription | undefined {
    return pricePriceSubscriptions.find((priceSubscription) => priceSubscription.id === item.id);
  }

  public add(item: PriceSubscription): PriceSubscription | undefined {
    pricePriceSubscriptions.push(item);
    return item;
  }

  public update(item: PriceSubscription): PriceSubscription | undefined {
    const priceSubscriptionIdx = pricePriceSubscriptions.findIndex((priceSubscription) => priceSubscription.id === item.id);

    if (priceSubscriptionIdx !== -1) {
      pricePriceSubscriptions[priceSubscriptionIdx] = { ...pricePriceSubscriptions[priceSubscriptionIdx], ...item };
    }
    return pricePriceSubscriptions[priceSubscriptionIdx];
  }

  public delete(item: { id: string }): PriceSubscription | undefined {
    const priceSubscriptionIdx = pricePriceSubscriptions.findIndex((priceSubscription) => priceSubscription.id === item.id);
    if (priceSubscriptionIdx !== -1) {
      const deletedpricePriceSubscriptions = pricePriceSubscriptions[priceSubscriptionIdx];
      pricePriceSubscriptions.splice(priceSubscriptionIdx, 1);
      return deletedpricePriceSubscriptions;
    }
  }
}
