import { Entity, ManyToOne, OneToMany, Property, Collection, Rel, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Level } from './level.entity.js';
import { File } from './file.entity.js';

@Entity()
export class Unit extends BaseEntity {

  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  number!: number;

  @ManyToOne( () => Level, {nullable: false })
  level!: Rel<Level>;


  @OneToMany( () => File,
  (file) => file.unit,
  {
    cascade: [Cascade.ALL],
    nullable: true,
  }
)
  files = new Collection<File>(this); 
}