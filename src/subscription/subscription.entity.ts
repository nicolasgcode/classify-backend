import { Cascade, Entity, OneToMany, Property, Collection} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';
import { PurchaseRecord } from '../PurchaseRecord/purchaseRecord.entity.js';
@Entity()
export class Subscription extends BaseEntity {
    @Property({nullable: false, unique: true})
    description!: string

    @Property({nullable: false})
    duration!: number

    @Property({nullable: false})
    price!: number 

    @OneToMany(() => PurchaseRecord, (purchaseRecord) => purchaseRecord.subscription, {
        cascade: [Cascade.ALL],
        nullable: true
      })
      purchaseRecords = new Collection<PurchaseRecord>(this);
}