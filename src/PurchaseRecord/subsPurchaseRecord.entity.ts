import { Cascade, Entity, OneToMany, Property, DateTimeType, ManyToOne, Rel} from '@mikro-orm/core';
import { Subscription } from '../subscription/subscription.entity.js';
import { PurchaseRecord } from './purchaseRecord.entity.js';

@Entity()
export class SubsPurchaseRecord extends PurchaseRecord {

    @ManyToOne(() => Subscription, { 
    nullable: false })
    subscription!: Rel<Subscription> 
    
}