import { Price } from "./price.entity"

export class Product {
  public id?: string
  public name: string
  public description: string
  public price?: number|string
  public prices?: Price[]
  public validSince?: Date
  public shop?: string
  public productCategory?: string
  public photoPath?: string
  public photo?: File 
}