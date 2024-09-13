import {
  Entity,
  Property,
  DateTimeType,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
//import { Member } from './../entities/member.entity.js';
@Entity()
export abstract class PurchaseRecord extends BaseEntity {
  @Property()
  totalAmount!: number;

  @Property({ type: DateTimeType })
  purchaseAt = new Date();


}
