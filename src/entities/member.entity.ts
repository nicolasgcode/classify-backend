import { Cascade, Entity, OneToMany, Rel } from '@mikro-orm/core';
import { User } from './user.entity.js';
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
  coursePurchaseRecord?: CoursePurchaseRecord;

  @OneToMany(
    () => SubsPurchaseRecord,
    (subsPurchaseRecord) => subsPurchaseRecord.member,
    {
      cascade: [Cascade.ALL],
      nullable: true,
    }
  )
  subsPurchaseRecord?: Rel<SubsPurchaseRecord>;
}
