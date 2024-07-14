import { Cascade, Entity, ManyToMany, Property, DateTimeType, Collection, ManyToOne} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';
import { Subscription } from '../subscription/subscription.entity.js';
//import { User } from '../user/user.entity.js';
@Entity()
export class PurchaseRecord extends BaseEntity {

    @Property({unique: true})
    montoTotal!: number

    @Property({type: DateTimeType})
    purchaseAt = new Date()

    /*
    @Property({
        type: DateTimeType,
        onUpdate: () => new Date()
    })
    updatedAt = new Date()
    */
   
    @ManyToMany(() => Subscription, (subscription) => subscription.purchaseRecords, {
       nullable: true, 
    })
    subscriptions!: Subscription[]
    /*
    @ManyToOne(() => User, {cascade: [Cascade.ALL]})
    user!: User
    */
   
}