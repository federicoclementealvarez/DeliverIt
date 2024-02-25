import { Rel, Entity, ManyToOne, Property, OneToMany, Cascade, DateTimeType, Collection, Filter} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { User } from '../user/user.entity.js'
import { PaymentType } from '../paymentType/paymentType.entity.js'
import { LineItem } from '../lineItem/lineItem.entity.js'

@Entity()
@Filter({ name: 'deliveryUndefined', cond: { delivery: { $eq: undefined } } })
@Filter({ name: 'dateTimeArrival', cond: { dateTimeArrival: { $eq: undefined } } })
@Filter({ name: 'dateTimeArrivalSet', cond: { dateTimeArrival: { $ne: undefined } } })
@Filter({ name: 'delivery', cond:  args =>({ delivery: {_id: args.par} }) })
@Filter({ name: 'client', cond:  args =>({ client: {_id: args.par} }) })
@Filter({ name: 'thisMonth', cond:  args =>({ dateTimeOrder: {$gte: args.monthFirstDate, $lt: args.monthLastDate} }) })

export class Order extends BaseEntity
{
    @Property({ nullable: false, type: DateTimeType})
    dateTimeOrder!: Date

    @Property({ nullable: false })
    priceToPay!: number

    @Property({ nullable: false })
    commissionForDelivery!: number
    
    @Property({ nullable: true, type: DateTimeType })
    dateTimeArrival?: Date

    @Property({ nullable: true })
    totalAmount!: number

    @ManyToOne(() => User, { nullable: false })
    client !: Rel<User>

    @ManyToOne(() => User, { nullable: true })
    delivery?: Rel<User>

    @ManyToOne(() => PaymentType, { nullable: false })
    paymentType !: Rel<PaymentType>

    @OneToMany(() => LineItem, (lineItem) => lineItem.order, {
        eager: true, cascade: [Cascade.ALL]
    })
    lineItems = new Collection<LineItem>(this)
}