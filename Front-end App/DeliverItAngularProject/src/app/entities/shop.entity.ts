export class Shop {
  public id: number
  public name: string
  public phoneNumber: string
  public email: string
  public logoPath: string
  public bannerPath: string
  public openingTime: string
  public closingTime: number
  public shippingPrice: number
  public stars: number  
  /* La direccion la pongo con este atributo en vez de crear la Clase Address
     seria un concat entre nombre y altura */ 
  public address: string

  constructor(_id: number, _name: string, _shippingPrice: number, _stars: number, _address: string) {
    this.id = _id
    this.name = _name
    this.shippingPrice = _shippingPrice
    this.stars = _stars
    this.address = _address
  }
}