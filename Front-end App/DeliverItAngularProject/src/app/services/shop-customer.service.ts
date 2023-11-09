import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ShopCustomerService {
  private products: Product[]

  // shippingPrice hay que recuperarlo de nuevo cuando se obtienen todos los productos del local
  private shippingPrice: number
  
  constructor() { 
    this.shippingPrice = 300
  }

  getProducts() {
    this.products = []
    /*this.products.push({id: '1', name: 'Pizza con Pepperonni', description: '8 porciones', price: 4500}) 
    this.products.push({id: '2', name: 'Pizza con Cantimpalo', description: '8 porciones', price: 5000})
    this.products.push({id: '3', name: 'Pizza Cuatro Quesos', description: '8 porciones', price: 4200}) 
    this.products.push({id: '4', name: 'Pizza Veggie', description: '8 porciones', price: 5300}) */
    return this.products
  }  

  getOne(productId: string) {
    return this.products.find((p) => p.id === productId)
  }

  getShippingPrice() {
    return this.shippingPrice
  }
}
