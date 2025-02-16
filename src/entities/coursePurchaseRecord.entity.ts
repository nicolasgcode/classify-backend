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
import { BaseEntity } from '../shared/baseEntity.entity.js';

@Entity()
export class CoursePurchaseRecord extends BaseEntity {
  @Property()
  totalAmount!: number;

  @ManyToOne(() => User, {
    nullable: false,
  })
  user!: Rel<User>;

  @ManyToMany(() => Course, (course) => course.coursePurchaseRecords)
  courses = new Collection<Course>(this);

  @Property({ type: DateTimeType, nullable: true })
  purchaseAt? = new Date();
}
