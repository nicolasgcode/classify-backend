import { Cascade, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';

@Entity()
export class Topic extends BaseEntity {
    @Property({nullable: false, unique: true})
    description!: string
}