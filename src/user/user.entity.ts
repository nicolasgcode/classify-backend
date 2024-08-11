import { Cascade, Entity, OneToMany, Property, DateTimeType, Collection, ManyToOne, Rel} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';
import { PurchaseRecord } from '../purchaseRecord/purchaseRecord.entity.js';
@Entity()
export class User extends BaseEntity {

    @Property({unique: true})
    dni!: number

    @Property({nullable: false})
    name!: string

    @Property({nullable: false})
    surname!: string

    @Property({nullable: false})
    email!: string

    @OneToMany(() => PurchaseRecord, (purchaseRecord) => purchaseRecord.user, {
      cascade: [Cascade.ALL],
      nullable: true })
      purchaseRecords?: PurchaseRecord
}
/* 
export class User {
  constructor(
    public id: string,
    public dni: string,
    public name: string,
    public surname: string,
    public email: string
  ) {}
}
 */