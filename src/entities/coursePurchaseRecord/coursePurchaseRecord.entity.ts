import {
  Entity,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { PurchaseRecord } from '../../shared/purchaseRecord.entity.js';
import { Course } from './../course/course.entity.js';
import { Member } from './../user/member/member.entity.js';

@Entity()
export class CoursePurchaseRecord extends PurchaseRecord {
  @ManyToOne(() => Course, {
    nullable: false,
  })
  course!: Rel<Course>;
  @ManyToOne(() => Member, {
    nullable: false,
  })
  member!: Rel<Member>;
}