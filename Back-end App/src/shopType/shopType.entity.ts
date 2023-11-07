import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'

@Entity()
export class ShopType extends BaseEntity {
  @Property({ nullable: false })
  description!: string

  // Se guarda solo el nombre del icono porque ya eso es necesario 
  // para obtener el icono con Google Icons 
  @Property({ nullable: false })
  iconDescription!: string

  @OneToMany(() => Shop, (shop) => shop.shopType, {
    cascade: [Cascade.ALL],
  })
  shops = new Collection<Shop>(this)
}