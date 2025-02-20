import { Course } from './course.entity.js';

import {
  Cascade,
  Collection,
  DateTimeType,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { User } from './user.entity.js';
import { PurchaseRecord } from './purchaseRecord.entity.js';

@Entity()
export class CoursePurchaseRecord extends PurchaseRecord {

  @ManyToOne(() => User, {
    nullable: false,
  })
  user!: Rel<User>;

  @ManyToMany(() => Course, (course) => course.coursePurchaseRecords)
  courses = new Collection<Course>(this);

}
