import { Rel, Entity, ManyToOne, Property, Cascade, Collection, OneToMany, OneToOne, TimeType, Filter} from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { ProductVariation } from '../productVariation/productVariation.entity.js'
import { ShopType } from '../shopType/shopType.entity.js'
import { User } from '../user/user.entity.js'
import { Product } from '../product/product.entity.js'
import { Review } from '../review/review.entity.js'

@Entity()
@Filter({ name: 'name', cond:  args =>({ name: { $regex: args.par } }) }) //the regular expression is sent complete in the 'args' parameter
@Filter({ name: 'shoptype', cond:  args =>({ shopType: {id: args.par} }) }) //the shopType id is sent as the 'args' parameter
@Filter({ name: 'getByIds', cond:  args =>({ id: {$in: args} }) })
export class Shop extends BaseEntity
{
  @Property({ nullable: false })
    name!: string
    
    @Property({ nullable: false })
    phoneNumber!: string

    @Property({ nullable: false })
    email!: string

    @Property({ nullable: false })
    logoPath!: string

    // @Property({ persist:false })
    // logo!: File

    @Property({ nullable: true })
    bannerPath?: string

    // @Property({ persist:false })
    // banner?: File
    
    @Property({ nullable: false })
    openingTime!: TimeType

    @Property({ nullable: false })
    closingTime!: TimeType
    
    @Property({ nullable: false })
    shippingPrice!: number

    @Property({ nullable: false })
    stars: number = 0
    
    @Property({ nullable: false })
    street!: string
    
    @Property({ nullable: false })
    streetNumber!: string
    
    @Property({ nullable: true })
    apartment?: string
    
    @Property({ nullable: true })
    additionalInfo?: string
    
    @ManyToOne(() => ShopType, { nullable: false })
    shopType !: Rel<ShopType>

    @OneToMany(() => ProductVariation, (order) => order.shop, {
        cascade: [Cascade.ALL],
    })
    productVariations = new Collection<ProductVariation>(this)

    // User ships orders
    @OneToMany(() => Product, (product) => product.shop, {
        cascade: [Cascade.ALL],
    })
    products = new Collection<Product>(this)

    @OneToMany(() => Review, (review) => review.shop, {
        cascade: [Cascade.ALL],
    })
    reviews = new Collection<Review>(this)

    @OneToOne(() => User, { nullable: false })
    user!: Rel<User>;
}