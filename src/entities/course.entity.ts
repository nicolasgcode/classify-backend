import {
  Cascade,
  Entity,
  OneToMany,
  Property,
  Collection,
  DateTimeType,
  ManyToMany,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Topic } from './topic.entity.js';
import { Unit } from './unit.entity.js';
import { OrderLine } from './orderLine.entity.js';

@Entity()
export class Course extends BaseEntity {
  @Property({ nullable: false })
  isActive!: boolean;

  @Property({ nullable: false, unique: true })
  title!: string;

  @Property({ type: DateTimeType, nullable: false })
  createdAt = new Date();

  @Property({ nullable: false })
  price!: number;

  @Property({ nullable: false })
  level!: string;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.course, {
    cascade: [Cascade.ALL],
  })
  orderLines = new Collection<OrderLine>(this);

  @ManyToMany(() => Topic, (topic) => topic.courses, {
    cascade: [Cascade.ALL],
    owner: true,
  })
  topics = new Collection<Topic>(this);

  @OneToMany(() => Unit, (unit) => unit.course, {
    cascade: [Cascade.ALL],
    nullable: true,
  })
  units? = new Collection<Unit>(this);
}
