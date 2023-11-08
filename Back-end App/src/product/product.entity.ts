import { Rel, Entity, ManyToOne, Property, Collection, OneToMany, Cascade, Filter} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'
import { ProductCategory } from '../productCategory/productCategory.entity.js'
import { Price } from '../price/price.entity.js'
import { LineItem } from '../lineItem/lineItem.entity.js'

@Entity()
@Filter({ name: 'productCategory', cond:  args =>({ productCategory: {$in: args} }) })
@Filter({ name: 'shopId', cond:  args =>({ shop: args.shopId }) })  
export class Product extends BaseEntity
{
    @Property({ nullable: false })
    name!: string
    
    @Property({ nullable: false })
    description!: string

    @Property({ nullable: true })
    photoPath?: string

    @ManyToOne(() => Shop, { nullable: false })
    shop !: Rel<Shop>

    @ManyToOne(() => ProductCategory, { nullable: false })
    productCategory !: Rel<ProductCategory>

    @OneToMany(() => Price, (price) => price.product, {
        cascade: [Cascade.ALL],
    })
    prices : Collection<Price> = new Collection<Price>(this)

    @OneToMany(() => LineItem, (lineItem) => lineItem.product, {
        cascade: [Cascade.ALL],
    })
    lineItems = new Collection<LineItem>(this)

}