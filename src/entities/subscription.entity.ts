import { Entity, ManyToMany, Property, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { SubsPurchaseRecord } from './subsPurchaseRecord.entity.js';

@Entity()
export class Subscription extends BaseEntity {
  @Property({ nullable: false })
  isActive!: boolean;

  @Property({ nullable: false, unique: true })
  description!: string;

  @Property({ nullable: false })
  duration!: number;

  @Property({ nullable: false })
  price!: number;

  @ManyToMany(() => SubsPurchaseRecord)
  subsPurchaseRecords = new Collection<SubsPurchaseRecord>(this);
}
