import { Rel, Entity, ManyToOne, Property} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'

@Entity()
export class ProductVariation extends BaseEntity
{
  @Property({ nullable: false })
    name!: string

    @Property({ nullable: false })
    description!: string

    @ManyToOne(() => Shop, { nullable: false })
      shop !: Rel<Shop>
}