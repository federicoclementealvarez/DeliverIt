import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { ShopCustomerService } from './shop-customer.service';


@Injectable({
  providedIn: 'root'
})

export class AddProductCustomerService {
  private order: Order
  constructor(private shopCustomerService: ShopCustomerService) {
    this.order = new Order()    
    this.order.products = []
  } 

  private totalQuantity = new BehaviorSubject<number>(0);
  totalQty$ = this.totalQuantity.asObservable();
  
  private sendLastTotalQty = new BehaviorSubject<any[]>([]);
  lastTotalQty = this.sendLastTotalQty.asObservable();

  private editClicked = new BehaviorSubject<boolean>(false);
  editHasBeenClicked = this.editClicked.asObservable();
  
  addProduct(id: number) {
    // Obtengo el producto del servicio
    let product: Product = this.shopCustomerService.getOne(id)
    
    // Verifico si esta en la lista
    let productInList = this.order.products.find((p) => p.product.id === product.id)

    // Si no lo esta, lo agrego a la lista con cantidad 1
    if (!productInList) {
      this.order.products.push({ product: product, quantity: 1 })
      
      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    }     
    // Si ya estaba agregado, le sumo 1 en la cantidad
    else {
      let index: number = this.order.products.findIndex((p) => p.product.id == productInList.product.id)
      this.order.products[index].quantity++;
      
      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    }
    console.log(this.order)
  }

  removeProduct(id: number) {
    // Obtengo el producto del servicio
    let product: Product = this.shopCustomerService.getOne(id)

    // Busco el indice del producto en el Array
    const index = this.order.products.findIndex((item) => item.product.id == product.id)

    // Disminuyo la cantidad
    if (index !== -1) {
      this.order.products[index].quantity--;

      let currentValue = this.totalQuantity.value
      let newValue = currentValue - 1
      this.totalQuantity.next(newValue)

      // Si el producto ya no tiene mas items, lo elimino del Array
      if (this.order.products[index].quantity === 0) {
        this.order.products.splice(index, 1)
      }
    }
    
    console.log(this.order)
  }

  resetProducts() {
    this.order = new Order()
    this.order.products = []
    this.totalQuantity.next(0)
  }

  getOrder() {
    return this.order;
  }

  getTotal() {
    let sum: number = 0
    this.order.products.forEach((item) => sum += item.product.price * item.quantity)

    sum += this.shopCustomerService.getShippingPrice()
    return sum
  }

  clickOnEdit(){
    this.editClicked.next(true);
  }
}
