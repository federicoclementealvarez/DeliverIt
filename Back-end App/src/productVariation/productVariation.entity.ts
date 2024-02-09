import { Rel, Entity, ManyToOne, Property, ManyToMany, Cascade, Collection, Filter} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'
import { ProductVariationArray } from '../lineItem/lineItem.entity.js'

@Entity()
@Filter({ name: 'shopId', cond:  args =>({ shop: args.shopId }) }) 
export class ProductVariation extends BaseEntity
{
  @Property({ nullable: false })
    name!: string

    @Property({ nullable: false })
    description!: string

    @Property({ nullable: false })
    isDisabled: boolean = false


    @ManyToOne(() => Shop, { nullable: false })
      shop !: Rel<Shop>
}