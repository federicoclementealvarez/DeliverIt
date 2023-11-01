import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'

@Entity()
export class ProductCategory extends BaseEntity
{
  @Property({ nullable: false })
    description!: string

    @OneToMany(() => Product, (product) => product.productCategory, {
        cascade: [Cascade.ALL],
      })
      products = new Collection<Product>(this)
}