import { BaseEntity } from '../shared/baseEntity.entity.js';

import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Order } from './order.entity.js';

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

  @OneToMany(() => Order, (order) => order.user, {
    cascade: [Cascade.ALL],
  })
  orders = new Collection<Order>(this);
}
