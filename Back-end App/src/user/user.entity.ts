import { Rel, Entity, ManyToOne, Property, Cascade, Collection, OneToMany, OneToOne} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { UserType } from '../userType/userType.entity.js'
import { Withdrawal } from '../withdrawal/withdrawal.entity.js'
import { Shop } from '../shop/shop.entity.js'
import { Review } from '../review/review.entity.js'
import { Order } from '../order/order.entity.js'

@Entity()
export class User extends BaseEntity
{
  @Property({ nullable: false })
    name!: string
    
    @Property({ nullable: false })
    surname!: string
    
    @Property({ nullable: false })
    phoneNumber!: string

    @Property({ nullable: false })
    email!: string

    @Property({ nullable: false })
    password!: string

    @Property({ nullable: false })
    creditBalance: number = 0

    @Property({ nullable: false })
    street!: string
    
    @Property({ nullable: false })
    streetNumber!: string
    
    @Property({ nullable: true })
    apartment?: string
    
    @Property({ nullable: true })
    additionalInfo?: string
    
    @ManyToOne(() => UserType, { nullable: false })
    userType !: Rel<UserType>

    @OneToMany(() => Withdrawal, (withdrawal) => withdrawal.user, {
        cascade: [Cascade.ALL],
    })
    withdrawals = new Collection<Withdrawal>(this)

    // User makes orders
    @OneToMany(() => Order, (order) => order.client, {
        cascade: [Cascade.ALL],
    })
    clientOrders = new Collection<Order>(this)

    // User ships orders
    @OneToMany(() => Order, (order) => order.delivery, {
        cascade: [Cascade.ALL],
    })
    deliveryOrders? = new Collection<Order>(this)

    @OneToMany(() => Review, (review) => review.user, {
        cascade: [Cascade.ALL],
    })
    reviews = new Collection<Review>(this)

    @OneToOne(() => Shop, { nullable: true })
    shop?: Rel<Shop>;
}
