import { Rel, Entity, ManyToOne, Property, DateTimeType } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { User } from '../user/user.entity.js'

@Entity()
export class Withdrawal extends BaseEntity
{
    @Property({ nullable: false })
    amount!: number

    @Property({ nullable: false })
    dateTime!: DateTimeType

    @ManyToOne(() => User, { nullable: false })
      user !: Rel<User>
}