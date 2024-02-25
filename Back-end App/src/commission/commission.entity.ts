import { DateType, Entity, Filter, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'


@Entity()
@Filter({ name: 'validSinceExists', cond:  args =>({ validSince: {$eq: args.par} }) })
export class Commission extends BaseEntity
{
  @Property({ nullable: false, type: DateType })
  validSince!: Date

  @Property({ nullable: false })
  percentage!: number
}