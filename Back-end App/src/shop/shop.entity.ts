import { Rel, Entity, ManyToOne, Property, Cascade, Collection, OneToMany, OneToOne, TimeType, Filter } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { ProductVariation } from '../productVariation/productVariation.entity.js'
import { ShopType } from '../shopType/shopType.entity.js'
import { User } from '../user/user.entity.js'
import { Product } from '../product/product.entity.js'
import { Review } from '../review/review.entity.js'

@Entity()
@Filter({ name: 'name', cond: args => ({ name: { $regex: args.par, $options: 'i' } }) }) //the regular expression is sent complete in the 'args' parameter
@Filter({ name: 'shopType', cond: args => ({ shopType: args.par }) }) //the shopType id is sent as the 'args' parameter
@Filter({ name: 'getByIds', cond: args => ({ id: { $in: args.par } }) })
export class Shop extends BaseEntity {
    @Property({ nullable: false })
    name!: string

    @Property({ nullable: false })
    phoneNumber!: string

    @Property({ nullable: false })
    email!: string

    @Property({ nullable: false })
    logoPath!: string

    @Property({ nullable: false })
    logoId!: string

    @Property({ nullable: true })
    bannerPath?: string

    @Property({ nullable: true })
    bannerId?: string

    @Property({ nullable: false })
    openingTime!: TimeType

    @Property({ nullable: false })
    closingTime!: TimeType

    @Property({ nullable: false })
    shippingPrice!: number

    @Property({ nullable: false })
    totalReviews: number = 0

    @Property({ hidden: true, nullable: false })
    totalStars: number = 0

    @Property({ name: 'stars' })
    getStars() {
        if (this.totalReviews === 0) return 0
        else return Math.round((this.totalStars / this.totalReviews) * 10) / 10
    }

    @Property({ nullable: false })
    street!: string

    @Property({ nullable: false })
    streetNumber!: string

    @ManyToOne(() => ShopType, { nullable: false })
    shopType !: Rel<ShopType>

    @OneToMany(() => ProductVariation, (productVariation) => productVariation.shop, {
        cascade: [Cascade.ALL],
    })
    productVariations = new Collection<ProductVariation>(this)

    //User ships orders
    @OneToMany(() => Product, (product) => product.shop, {
        cascade: [Cascade.ALL],
    })
    products = new Collection<Product>(this)

    @OneToMany(() => Review, (review) => review.shop, {
        cascade: [Cascade.ALL],
    })
    reviews = new Collection<Review>(this)

    @OneToOne(() => User, { nullable: false })
    owner!: Rel<User>;
}