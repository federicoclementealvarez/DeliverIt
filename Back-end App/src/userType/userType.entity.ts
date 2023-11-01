import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { User } from '../user/user.entity.js'

@Entity()
export class UserType extends BaseEntity
{
  @Property({ nullable: false })
    description!: string

    @OneToMany(() => User, (user) => user.userType, {
        cascade: [Cascade.ALL],
      })
      user = new Collection<User>(this)
}
