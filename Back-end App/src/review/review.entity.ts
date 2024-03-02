import { Rel, Entity, ManyToOne, Property, DateTimeType, Filter } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'
import { User } from '../user/user.entity.js'

@Entity()
@Filter({ name: 'customer', cond: args => ({ user: args.id }) })
@Filter({ name: 'shop', cond: args => ({ shop: args.id }) })

export class Review extends BaseEntity {
  @Property({ nullable: false })
  comment!: string

  @Property({ nullable: false })
  stars!: number

  @Property({ nullable: false })
  dateTime!: DateTimeType

  @ManyToOne(() => Shop, { nullable: false })
  shop !: Rel<Shop>

  @ManyToOne(() => User, { nullable: false })
  user !: Rel<User>
}