import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class Item {
  productId: number
  quantity: number

  constructor(id: number, qty: number) {
    this.productId = id;
    this.quantity = qty;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AddProductCustomerService {
  
  constructor() { }  

  totalItems: Item[] = []

  private totalQuantity = new BehaviorSubject<number>(0);
  totalQty$ = this.totalQuantity.asObservable();
  
  private sendLastTotalQty = new BehaviorSubject<any[]>([]);
  lastTotalQty = this.sendLastTotalQty.asObservable();
  
  addProduct(id: number) {
    const item = this.totalItems.find((item) => item.productId == id)

    if (item) {
      item.quantity++

      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    } else {
      this.totalItems.push(new Item(id, 1))

      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    }

    console.log(this.totalItems)
  }

  removeProduct(id: number) {
    const index = this.totalItems.findIndex((item) => item.productId == id)

    if (index !== -1) {
      this.totalItems[index].quantity--;

      let currentValue = this.totalQuantity.value
      let newValue = currentValue - 1
      this.totalQuantity.next(newValue)

      if (this.totalItems[index].quantity === 0) {
        this.totalItems.splice(index, 1)
      }
    }
    
    console.log(this.totalItems)
  }

  resetProducts() {
    this.totalItems = []
    this.totalQuantity.next(0)
  }
}
