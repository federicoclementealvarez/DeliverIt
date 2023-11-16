import { Product } from "./product.entity";

export class Order {
  public id: string
  public products: {
    product: Product
    quantity: number
  } []

  constructor() {
  }
}