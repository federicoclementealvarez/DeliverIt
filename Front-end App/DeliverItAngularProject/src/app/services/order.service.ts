import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { ProductService } from './product.service';
import { ShopListProductComponent } from '../shop-list-product/shop-list-product.component';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  order: Order

  constructor() { }

  // This variables send the total quantity of items when it changes
  private totalQuantity = new BehaviorSubject<number>(0);
  totalQty$ = this.totalQuantity.asObservable();

  private sendLastTotalQty = new BehaviorSubject<any[]>([]);
  lastTotalQty = this.sendLastTotalQty.asObservable();

  private editClicked = new BehaviorSubject<{ id: string, clicked: boolean }>({ id: '', clicked: false });
  editHasBeenClicked = this.editClicked.asObservable();

  create() {
    this.order = new Order()
    this.order.products = []
  }

  addProduct(product: Product) {
    let productInList = this.order.products.find((p) => p.product.id === product.id)

    if (!productInList) {
      this.order.products.push({ product: product, quantity: 1 })

      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    }
    else {
      let index: number = this.order.products.findIndex((p) =>
        p.product.id == productInList.product.id)

      this.order.products[index].quantity++;

      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    }
  }

  removeProduct(product: Product) {
    const index = this.order.products.findIndex((item) => item.product.id == product.id)

    if (index !== -1) {
      this.order.products[index].quantity--;

      let currentValue = this.totalQuantity.value
      let newValue = currentValue - 1
      this.totalQuantity.next(newValue)

      if (this.order.products[index].quantity === 0) {
        this.order.products.splice(index, 1)
      }
    }
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
    this.order.products.forEach((item) => sum += Number(item.product.price) * item.quantity)

    sum += 300
    return sum
  }

  clickOnEdit(productId: string) {
    this.editClicked.next({ id: productId, clicked: true });
  }
}
