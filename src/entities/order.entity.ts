import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from './user.entity.js';
import { OrderLine } from './orderLine.entity.js';

@Entity()
export class Order extends BaseEntity {
  @Property()
  orderDate = new Date();

  @Property()
  status!: string;

  @Property()
  total!: number;

  @ManyToOne(() => User)
  user!: Rel<User>;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order, {
    cascade: [Cascade.ALL],
  })
  orderLines = new Collection<OrderLine>(this);
}
