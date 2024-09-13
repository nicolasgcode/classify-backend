import {
  Cascade,
  Entity,
  OneToMany,
  Property,
  DateTimeType,
  Collection,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';

import { User } from './../shared/user.entity.js';

@Entity()
export class Admin extends User {}
