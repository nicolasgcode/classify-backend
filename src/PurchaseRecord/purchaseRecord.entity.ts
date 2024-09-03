import { Cascade, Entity, OneToMany, Property, DateTimeType, ManyToOne, Rel} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';
import { Member } from '../user/member.entity.js';
@Entity()
export abstract class PurchaseRecord extends BaseEntity {

    @Property()
    totalAmount!: number

    @Property({type: DateTimeType})
    purchaseAt = new Date()
    
    @ManyToOne(() => Member, {
    nullable: false })
    member!: Rel<Member> 
   
}