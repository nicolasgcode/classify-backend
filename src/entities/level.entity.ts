import {
  Entity,
  ManyToMany,
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

  @Property({ nullable: false, type: 'text' })
  description!: string;

  @Property({ nullable: true })
  order?: number;

  @ManyToMany(() => Course, (course) => course.levels, {
    nullable: true,
  })
  courses = new Collection<Course>(this);

  @OneToMany(() => Unit, (unit) => unit.level)
  units = new Collection<Unit>(this);
}
