import { Subscription } from './subscription.entity.js';

import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { User } from './user.entity.js';
import { PurchaseRecord } from './purchaseRecord.entity.js';

@Entity()
export class SubsPurchaseRecord extends PurchaseRecord {
  @ManyToOne(() => User, {
    nullable: false,
  })
  user!: Rel<User>;

  @ManyToOne(() => Subscription, { nullable: false })
  subscription!: Rel<Subscription>;
}
