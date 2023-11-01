import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'

@Entity()
export class Commission extends BaseEntity
{
  @Property({ nullable: false })
    validSince!: Date

  @Property({ nullable: false })
  percentage!: number
}