import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Unit } from './unit.entity.js';

@Entity()
export class File extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;

  @Property({ nullable: false })
  type!: string;

  @ManyToOne(() => Unit)
  unit!: Rel<Unit>;
}
