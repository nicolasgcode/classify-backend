import {
  Entity,
  ManyToOne,
  Property,
  Collection,
  OneToMany,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Course } from './course.entity.js';
import { Unit } from './unit.entity.js';

@Entity()
export class Level extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;
  @ManyToOne(() => Course)
  course!: Rel<Course>;
  @OneToMany(() => Unit, (unit) => unit.level)
  units? = new Collection<Unit>(this);
}
 