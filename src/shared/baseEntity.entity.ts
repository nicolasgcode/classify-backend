import { PrimaryKey } from '@mikro-orm/core';
//import {DateTimeType,Property} from '@mikro-orm/core';
export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;
}
