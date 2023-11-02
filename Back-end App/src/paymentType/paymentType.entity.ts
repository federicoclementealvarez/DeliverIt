import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Order } from '../order/order.entity.js'

@Entity()
export class PaymentType extends BaseEntity
{
  @Property({ nullable: false })
    description!: string

    @OneToMany(() => Order, (order) => order.paymentType, {
        cascade: [Cascade.ALL],
      })
      orders = new Collection<Order>(this)
}