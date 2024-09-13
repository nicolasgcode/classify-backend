import {
  Entity,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { Subscription } from './subscription.entity.js';
import { PurchaseRecord } from './../shared/purchaseRecord.entity.js';
import { Member } from './member.entity.js';

@Entity()
export class SubsPurchaseRecord extends PurchaseRecord {
  @ManyToOne(() => Subscription, {
    nullable: false,
  })
  subscription!: Rel<Subscription>;
  @ManyToOne(() => Member, {
    nullable: false,
  })
  member!: Rel<Member>;
}
