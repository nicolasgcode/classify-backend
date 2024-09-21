import {
  Cascade,
  Entity,
  OneToMany,
  Property,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/baseEntity.entity.js';
import { SubsPurchaseRecord } from '../subsPurchaseRecord/subsPurchaseRecord.entity.js';
@Entity()
export class Subscription extends BaseEntity {
  @Property({ nullable: false, unique: true })
  description!: string;

  @Property({ nullable: false })
  duration!: number;

  @Property({ nullable: false })
  price!: number;

  @OneToMany(
    () => SubsPurchaseRecord,
    (subsPurchaseRecord) => subsPurchaseRecord.subscription,
    {
      cascade: [Cascade.ALL],
      nullable: true,
    }
  )
  subsPurchaseRecords = new Collection<SubsPurchaseRecord>(this);
}
