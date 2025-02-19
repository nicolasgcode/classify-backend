import { BaseEntity } from '../shared/baseEntity.entity.js';

import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { CoursePurchaseRecord } from './coursePurchaseRecord.entity.js';
import { SubsPurchaseRecord } from './subsPurchaseRecord.entity.js';


@Entity()
export class User extends BaseEntity {
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
    (coursePurchaseRecord) => coursePurchaseRecord.user
  )
  coursePurchaseRecords = new Collection<CoursePurchaseRecord>(this);

  @OneToMany(
    () => SubsPurchaseRecord,
    (subsPurchaseRecord) => subsPurchaseRecord.user
  )
  subsPurchaseRecords = new Collection<SubsPurchaseRecord>(this);
}
