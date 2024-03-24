import { Rel, Entity, ManyToOne, Property, Collection, OneToMany, Cascade, Filter, Embedded, Embeddable, DateType } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'
import { ProductCategory } from '../productCategory/productCategory.entity.js'
import { LineItem } from '../lineItem/lineItem.entity.js'

@Entity()
@Filter({ name: 'productCategory', cond:  args =>({ productCategory: {$in: args.par} }) })
@Filter({ name: 'shopId', cond:  args =>({ shop: args.shopId }) }) 
@Filter({ name: 'ids', cond:  args =>({ id: {$in: args.par} }) }) 
export class Product extends BaseEntity
{
    @Property({ nullable: false })
    name!: string

    @Property({ nullable: false })
    description!: string

    @Property({ nullable: true })
    photoPath!: string

    @Property({ nullable: true })
    photoId!: string

    @Property({ nullable: false })
    allowsVariations!: boolean

    @Property({ nullable: true })
    maxVariations?: number

    @ManyToOne(() => Shop, { nullable: false })
    shop !: Rel<Shop>

    @ManyToOne(() => ProductCategory, { nullable: false })
    productCategory !: Rel<ProductCategory>

    @Embedded(() => Price, { nullable: false, array: true })
    prices !: Price[]

    @OneToMany(() => LineItem, (lineItem) => lineItem.product, {
        cascade: [Cascade.ALL],
    })
    lineItems = new Collection<LineItem>(this)
}


@Embeddable()
export class Price {
    @Property({ nullable: false })
    amount!: number

    @Property({ nullable: false, type: DateType })
    validSince!: Date
}