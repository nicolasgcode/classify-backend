import { BaseEntity } from '../shared/baseEntity.entity.js';

import {
  Entity,
  Property,
  Cascade,
  OneToMany,
  Collection,
  ManyToMany,
} from '@mikro-orm/core';
import { Course } from './course.entity.js';
import { CoursePurchaseRecord } from './coursePurchaseRecord.entity.js';

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
    (purchaseRecord) => purchaseRecord.user
  )
  coursePurchaseRecords = new Collection<CoursePurchaseRecord>(this);
}
