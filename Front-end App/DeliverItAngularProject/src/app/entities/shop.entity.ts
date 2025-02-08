import { ProductVariation } from "./productVariation.entity"
import { ShopType } from "./shopType.entity"

export class Shop {
  public id: string
  public name: string
  public phoneNumber: string
  public shippingPrice: number
  public stars: number
  public totalReviews: number
  public email: string
  public logoPath: string
  public bannerPath?: string
  public openingTime: string
  public closingTime: string
  public street: string
  public streetNumber: string
  public owner: string
  public shopType: ShopType
  public productVariations?: ProductVariation[]

  /*constructor(_id: number, _name: string, _shippingPrice: number, _stars: number, _address: string) {
    this.id = _id
    this.name = _name
    this.shippingPrice = _shippingPrice
    this.stars = _stars
    this.address = _address
  }*/
}