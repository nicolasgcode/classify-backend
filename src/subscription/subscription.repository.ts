import { Repository } from '../shared/repository.js';
import { Subscription } from './subscription.entity.js';
import { PriceSubscription } from './priceSubscription.entity.js';

const date = new Date(2024, 5, 17);
const price = new PriceSubscription('1', date, 100);
const subscriptions = [new Subscription('1', date, [price])];

export class SubscriptionRepository implements Repository<Subscription> {
  public findAll(): Subscription[] | undefined {
    return subscriptions;
  }
  public findOne(item: { id: string }): Subscription | undefined {
    return subscriptions.find((subscription) => subscription.id === item.id);
  }

  public add(item: Subscription): Subscription | undefined {
    subscriptions.push(item);
    return item;
  }

  public update(item: Subscription): Subscription | undefined {
    const subscriptionIdx = subscriptions.findIndex((subscription) => subscription.id === item.id);

    if (subscriptionIdx !== -1) {
      subscriptions[subscriptionIdx] = { ...subscriptions[subscriptionIdx], ...item };
    }
    return subscriptions[subscriptionIdx];
  }

  public delete(item: { id: string }): Subscription | undefined {
    const subscriptionIdx = subscriptions.findIndex((subscription) => subscription.id === item.id);
    if (subscriptionIdx !== -1) {
      const deletedsubscriptions = subscriptions[subscriptionIdx];
      subscriptions.splice(subscriptionIdx, 1);
      return deletedsubscriptions;
    }
  }
}
