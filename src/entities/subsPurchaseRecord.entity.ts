import { PurchaseRecord } from './purchaseRecord.entity.js';

import { Entity, ManyToOne, Rel } from '@mikro-orm/core';
import { Subscription } from './subscription.entity.js';

@Entity()
export class SubsPurchaseRecord extends PurchaseRecord {
  @ManyToOne(() => Subscription, {
    nullable: false,
  })
  subscription!: Rel<Subscription>;
}
