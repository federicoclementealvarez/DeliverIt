import { Rel, Entity, ManyToOne, Property, Embedded, Embeddable, ManyToMany, Cascade, Collection } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Product } from '../product/product.entity.js'
import { Order } from '../order/order.entity.js'
import { ProductVariation } from '../productVariation/productVariation.entity.js'

@Entity()
export class LineItem extends BaseEntity
{
    @Property({ nullable: false })
    quantity!: number

    @ManyToOne(() => Product, { nullable: false })
    product !: Rel<Product>

    @ManyToOne(() => Order, { nullable: false })
    order !: Rel<Order>

    @Embedded(() => ProductVariationArray, {nullable:true, array: true})
    productVariationArrays ?: ProductVariationArray[]
}

@Embeddable()
export class ProductVariationArray
{
    @ManyToMany({ entity: () => ProductVariation, owner: true })
        productVariations = new Collection<ProductVariation>(this);
}
/*
lineItem:{
    productVariationArrays:[
        {productVariations:[
            {

            },
            {

            }
        ]},
        {productVariations:[
            {

            },
            {

            }
        ]}
    ]
}*/