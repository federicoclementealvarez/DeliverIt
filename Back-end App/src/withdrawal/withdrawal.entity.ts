import {
  Rel,
  Entity,
  ManyToOne,
  Property,
  DateTimeType,
  Filter,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from '../user/user.entity.js';

@Entity()
@Filter({ name: 'delivery', cond: (args) => ({ user: { _id: args.par } }) })
export class Withdrawal extends BaseEntity {
  @Property({ nullable: false })
  amount!: number;

  @Property({ nullable: false })
  amountBefore!: number;

  @Property({ nullable: false })
  amountAfter!: number;

  @Property({ nullable: false })
  dateTime!: DateTimeType;

  @ManyToOne(() => User, { nullable: false })
  user!: Rel<User>;
}
