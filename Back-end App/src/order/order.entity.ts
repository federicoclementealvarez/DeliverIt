import { Rel, Entity, ManyToOne, Property, OneToMany, Cascade, DateTimeType, Collection} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { User } from '../user/user.entity.js'
import { PaymentType } from '../paymentType/paymentType.entity.js'
import { LineItem } from '../lineItem/lineItem.entity.js'

@Entity()
export class Order extends BaseEntity
{
    @Property({ nullable: false })
    dateTimeOrder!: DateTimeType
    
    @Property({ nullable: true })
    dateTimeArrival?: DateTimeType

    @ManyToOne(() => User, { nullable: false })
    client !: Rel<User>

    @ManyToOne(() => User, { nullable: false })
    delivery !: Rel<User>

    @ManyToOne(() => PaymentType, { nullable: false })
    paymentType !: Rel<PaymentType>

    @OneToMany(() => LineItem, (lineItem) => lineItem.product, {
        cascade: [Cascade.ALL]
    })
    lineItems = new Collection<LineItem>(this)
}