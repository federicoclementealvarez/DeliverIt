import { Rel, Entity, ManyToOne, Property, Collection, OneToMany, Cascade} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Shop } from '../shop/shop.entity.js'
import { ProductCategory } from '../productCategory/productCategory.entity.js'
import { Price } from '../price/price.entity.js'
import { LineItem } from '../lineItem/lineItem.entity.js'

@Entity()
export class Product extends BaseEntity
{
    @Property({ nullable: false })
    name!: string
    
    @Property({ nullable: false })
    description!: string

    @Property({ nullable: false })
    photoPath!: string

    @Property({ persist: false })
    photo!: File

    @ManyToOne(() => Shop, { nullable: false })
    shop !: Rel<Shop>

    @ManyToOne(() => ProductCategory, { nullable: false })
    productCategory !: Rel<ProductCategory>

    @OneToMany(() => Price, (price) => price.product, {
        cascade: [Cascade.ALL],
    })
    prices = new Collection<Price>(this)

    @OneToMany(() => LineItem, (lineItem) => lineItem.product, {
        cascade: [Cascade.ALL],
    })
    lineItems = new Collection<LineItem>(this)

}