import { PaymentType } from "./paymentType.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

export class Order {
  public id?: string
  public dateTimeOrder: Date
  public dateTimeArrival?: Date
  public client: User
  public delivery?: User
  public paymentType: PaymentType
  public lineItems: {
    product: Product
    quantity: number
  } []
}