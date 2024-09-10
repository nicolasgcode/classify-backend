import {
  Cascade,
  Entity,
  OneToMany,
  Property,
  DateTimeType,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { Course } from './course.entity.js';
import { PurchaseRecord } from './purchaseRecord.entity.js';
import { User } from './user.entity.js';

@Entity()
export class CoursePurchaseRecord extends PurchaseRecord {
  @ManyToOne(() => User, { nullable: false })
  @ManyToOne(() => Course, {
    nullable: false,
  })
  course!: Rel<Course>;
}
