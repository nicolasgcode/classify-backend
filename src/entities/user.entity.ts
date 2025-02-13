import { CoursePurchaseRecord } from './coursePurchaseRecord.entity.js';
import { SubsPurchaseRecord } from './subsPurchaseRecord.entity.js';

import { BaseEntity } from '../shared/baseEntity.entity.js';

import {
  Entity,
  Property,
  Cascade,
  OneToMany,
  Collection,
} from '@mikro-orm/core';

@Entity()
export abstract class User extends BaseEntity {
  @Property({ unique: true })
  dni!: number;

  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  surname!: string;

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ nullable: false, default: false })
  admin!: boolean;

  @OneToMany(
    () => CoursePurchaseRecord,
    (coursePurchaseRecord) => coursePurchaseRecord.user,
    {
      cascade: [Cascade.ALL],
      nullable: true,
    }
  )
  CoursePurchaseRecords = new Collection<CoursePurchaseRecord>(this);

  @OneToMany(
    () => SubsPurchaseRecord,
    (subscriptionPurchaseRecord) => subscriptionPurchaseRecord.user,
    {
      cascade: [Cascade.ALL],
      nullable: true,
    }
  )
  SubsPurchaseRecords = new Collection<SubsPurchaseRecord>(this);
}
