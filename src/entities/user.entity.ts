import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { UserRole } from '../utils/UserRole.js';
@Entity()
export abstract class User extends BaseEntity {
  @Property({ unique: true })
  dni!: number;

  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  surname!: string;
  @Property({ nullable: true })
  role?: UserRole;

  @Property({ nullable: false })
  email!: string;
  @Property({ nullable: false })
  password!: string;
}
