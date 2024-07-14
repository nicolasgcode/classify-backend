import { Cascade, Entity, ManyToMany, Property, Collection} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';
import { PurchaseRecord } from '../purchaseRecord/purchaseRecord.entity.js';
@Entity()
export class Subscription extends BaseEntity {
    @Property({nullable: false, unique: true})
    description!: string

    @Property({nullable: false})
    duration!: number

    @Property({nullable: false})
    price!: number 

    @ManyToMany(() => PurchaseRecord, purchaseRecord => purchaseRecord.subscriptions, {
        cascade: [Cascade.ALL],
        owner: true,
        nullable: true
      })
      purchaseRecords = new Collection<PurchaseRecord>(this);
}