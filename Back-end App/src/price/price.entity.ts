import { Rel, DateType, Entity, ManyToOne, Property, Filter } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Product } from '../product/product.entity.js'

@Entity()
@Filter({ name: 'lastDate', cond:  args =>({ product: args.id , validSince: {$lte: args.todayDate}}) }) 
export class Price extends BaseEntity
{
  @Property({ nullable: false })
    amount!: number

    @Property({ nullable: false , type: DateType})
    validSince!: Date

    @ManyToOne(() => Product, { nullable: false , onDelete: 'cascade'})
    product !: Rel<Product>
}