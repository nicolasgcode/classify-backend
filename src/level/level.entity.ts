import { Cascade, Entity, ManyToOne, ManyToMany, OneToMany, PrimaryKey, Property, Collection} from '@mikro-orm/core';
import {BaseEntity} from '../shared/baseEntity.entity.js';
import {Course} from '../course/course.entity.js';

@Entity()
export class Level extends BaseEntity {
    @Property({nullable: false, unique: true})
    name!: string

    @ManyToOne(() => Course, { entity: () => Course })
    courses = new Collection<Course>(this);
}