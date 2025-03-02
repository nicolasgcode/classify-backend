import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Course } from './course.entity.js';
import { Order } from './order.entity.js';

@Entity()
export class OrderLine extends BaseEntity {
  @Property()
  orderDate = new Date();

  @Property()
  subTotal!: number;

  @ManyToOne(() => Order)
  order!: Rel<Order>;

  @ManyToOne(() => Course)
  course!: Rel<Course>;
}
