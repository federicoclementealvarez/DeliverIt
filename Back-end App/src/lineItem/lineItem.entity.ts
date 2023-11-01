import { Rel, Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Product } from '../product/product.entity.js'
import { Order } from '../order/order.entity.js'

@Entity()
export class LineItem extends BaseEntity
{
    @Property({ nullable: false })
    quantity!: number

    @ManyToOne(() => Product, { nullable: false })
    product !: Rel<Product>

    @ManyToOne(() => Order, { nullable: false })
    order !: Rel<Order>
}