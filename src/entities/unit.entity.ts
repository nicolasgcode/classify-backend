import {
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Collection,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Course } from './course.entity.js';
import { File } from './file.entity.js';

@Entity()
export class Unit extends BaseEntity {
  @Property({ nullable: false })
  title!: string;

  @Property({ nullable: false })
  description!: string;

  @Property({ nullable: false })
  content!: string;

  @ManyToOne(() => Course, { nullable: false })
  course!: Rel<Course>;

  @OneToMany(() => File, (file) => file.unit)
  files = new Collection<File>(this);
}
