import { PurchaseRecord } from './purchaseRecord.entity.js';

import { Course } from './course.entity.js';

import { Cascade, Collection, Entity, ManyToMany } from '@mikro-orm/core';

@Entity()
export class CoursePurchaseRecord extends PurchaseRecord {
  @ManyToMany(() => Course, (course) => course.coursePurchaseRecords, {
    cascade: [Cascade.ALL],
    owner: true,
  })
  courses = new Collection<Course>(this);
}
