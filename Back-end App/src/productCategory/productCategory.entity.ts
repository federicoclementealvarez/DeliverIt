import { Cascade, Collection, Entity, Filter, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Product } from '../product/product.entity.js'

@Entity()
@Filter({ name: 'description', cond:  args =>({ description: { $regex: args.par } }) })
export class ProductCategory extends BaseEntity
{
  @Property({ nullable: false })
    description!: string

    /*@OneToMany(() => Product, (product) => product.productCategory, {
        cascade: [Cascade.ALL],
      })
      products = new Collection<Product>(this)*/
}