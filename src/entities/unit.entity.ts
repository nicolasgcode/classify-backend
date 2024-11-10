import {
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Collection,
  Rel,
  PrimaryKey,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Level } from './level.entity.js';
import { File } from './file.entity.js';
import { nullable } from 'zod';

@Entity()
export class Unit extends BaseEntity {
  @Property({ nullable: false })
  title!: string;

  @Property({ nullable: false })
  description!: string;

  @Property({ nullable: false })
  content!: string;

  @ManyToOne(() => Level, { nullable: true })
  level?: Rel<Level>;

  @OneToMany(() => File, (file) => file.unit)
  files = new Collection<File>(this);
}
