import { Product } from "./product.entity";
import { Shop } from "./shop.entity";

export class Order {
  public id: number
  public products: {
    product: Product
    quantity: number
  } []

  constructor() {
  }
}