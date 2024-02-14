import { Rel, Entity, ManyToOne, Property, Embedded, Embeddable, ManyToMany, Cascade, Collection, OneToMany } from '@mikro-orm/core'
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

    @ManyToOne(() => Order, { nullable: false})
    order !: Rel<Order>

    @OneToMany(() => ProductVariationArray, (productVariationArray) => productVariationArray.lineItem, {
        cascade: [Cascade.ALL]
    })
    productVariationArrays = new Collection<ProductVariationArray>(this)
}


@Entity()
export class ProductVariationArray extends BaseEntity
{
    @ManyToOne(() => LineItem, { nullable: false})
    lineItem !: Rel<LineItem>

    @ManyToMany(() => ProductVariation, 'productVariationArrays', { owner: true })
    productVariations = new Collection<ProductVariation>(this);
}

/*
lineItem:{
    productVariationArrays:[
        {productVariations:[
            "dfsdfsdf","dfsdfsdfsd","dfsdfsd"
        ],
        {productVariations:[
            "dfsdfsdf","dfsdfsdfsd","dfsdfsd"
        ]
    ]
}*/