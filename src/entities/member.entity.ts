import {
  Cascade,
  Entity,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from './../shared/user.entity.js';
import { CoursePurchaseRecord } from './coursePurchaseRecord.entity.js';
import { SubsPurchaseRecord } from './subsPurchaseRecord.entity.js';

@Entity()
export class Member extends User {
  @OneToMany(
    () => CoursePurchaseRecord,
    (coursePurchaseRecord) => coursePurchaseRecord.member,
    {
      cascade: [Cascade.ALL],
      nullable: true,
    }
  )
  coursePurchaseRecords? = new Collection<CoursePurchaseRecord>(this);

  @OneToMany(
    () => SubsPurchaseRecord,
    (subsPurchaseRecord) => subsPurchaseRecord.member,
    {
      cascade: [Cascade.ALL],
      nullable: true,
    }
  )
  subsPurchaseRecords? = new Collection<SubsPurchaseRecord>(this);
}