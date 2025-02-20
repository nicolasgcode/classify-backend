import { Entity, Property, DateTimeType } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';

@Entity()
export abstract class PurchaseRecord extends BaseEntity {
  @Property()
  totalAmount!: number;

  @Property({ type: DateTimeType, nullable: true })
  purchaseAt? = new Date();
}
