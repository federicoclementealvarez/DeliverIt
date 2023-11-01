import { Rel, DateType, Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Product } from '../product/product.entity.js'

@Entity()
export class Price extends BaseEntity
{
  @Property({ nullable: false })
    amount!: number

    @Property({ nullable: false })
    validSince!: DateType

    @ManyToOne(() => Product, { nullable: false })
      product !: Rel<Product>
}