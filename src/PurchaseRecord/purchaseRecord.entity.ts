import { Cascade, Entity, OneToMany, Property, DateTimeType, ManyToOne, Rel} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';
import { Subscription } from '../subscription/subscription.entity.js';
import { User } from '../user/user.entity.js';
@Entity()
export class PurchaseRecord extends BaseEntity {

    @Property()
    montoTotal!: number

    @Property({type: DateTimeType})
    purchaseAt = new Date()
    
    @ManyToOne(() => Subscription, { 
    nullable: false })
    subscription!: Rel<Subscription> 
    
    @ManyToOne(() => User, {
    nullable: false })
    user!: Rel<User> 
   
}