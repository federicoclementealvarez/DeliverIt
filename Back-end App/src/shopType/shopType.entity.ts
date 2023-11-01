import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'

@Entity()
export class ShopType extends BaseEntity
{
  @Property({ nullable: false })
    description!: string

    @OneToMany(() => Shop, (shop) => shop.shopType, {
        cascade: [Cascade.ALL],
      })
      shop = new Collection<Shop>(this)
}