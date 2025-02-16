import { Entity, ManyToMany, Property, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Course } from './course.entity.js';

@Entity()
export class Topic extends BaseEntity {
  @Property({ nullable: false, unique: true })
  description!: string;

  @ManyToMany(() => Course)
  courses = new Collection<Course>(this);
}
