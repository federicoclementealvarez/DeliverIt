import { PaymentType } from "./paymentType.entity";
import { Product } from "./product.entity";
import { ProductVariation } from "./productVariation.entity";
import { User } from "./user.entity";

export class Order {
  public id?: string
  public dateTimeOrder: Date
  public dateTimeArrival?: Date
  public client: User
  public delivery?: User
  public paymentType: PaymentType
  public lineItems: LineItem[]
}

export interface LineItem {
  product: Product
  quantity: number
  productVariationArrays?: ProductVariation[][]
}

class CustomerSelectedFlavours {
  public productVariations: string[]
}