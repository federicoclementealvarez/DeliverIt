import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';


@Injectable({
  providedIn: 'root'
})

export class OrderService {
  order: Order
  readonly url = `${this.baseUrl.getBaseUrl()}order`

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) {
    this.order = new Order()
    this.order.lineItems = []
  }

  // This variables send the total quantity of items when it changes
  private totalQuantity = new BehaviorSubject<number>(0);
  totalQty$ = this.totalQuantity.asObservable();

  private sendLastTotalQty = new BehaviorSubject<any[]>([]);
  lastTotalQty = this.sendLastTotalQty.asObservable();

  private editClicked = new BehaviorSubject<{ id: string, clicked: boolean }>({ id: '', clicked: false });
  editHasBeenClicked = this.editClicked.asObservable();

  addProduct(product: Product) {
    let productInList = this.order.lineItems.find((p) => p.product.id === product.id)

    if (!productInList) {
      this.order.lineItems.push({ product: product, quantity: 1 })

      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    }
    else {
      let index: number = this.order.lineItems.findIndex((p) =>
        p.product.id == productInList.product.id)

      this.order.lineItems[index].quantity++;

      let currentValue = this.totalQuantity.value
      let newValue = currentValue + 1
      this.totalQuantity.next(newValue)
    }
  }

  removeProduct(product: Product) {
    const index = this.order.lineItems.findIndex((item) => item.product.id == product.id)

    if (index !== -1) {
      this.order.lineItems[index].quantity--;

      let currentValue = this.totalQuantity.value
      let newValue = currentValue - 1
      this.totalQuantity.next(newValue)

      if (this.order.lineItems[index].quantity === 0) {
        this.order.lineItems.splice(index, 1)
      }
    }
  }

  create(paymentTypeId: string): Observable<Order> {
    const lineItems = this.order.lineItems.map(({ product, quantity }) => {
      const lineItem: any = { }
      lineItem.product = product.id
      lineItem.quantity = quantity
      return lineItem
    })
    const body = {
      "dateTimeOrder": JSON.stringify(new Date()),
      "paymentType": paymentTypeId,
      "lineItems": lineItems,
      "client": '654c059cda8e9efaeeae024d'
    }
    return this.http.post<Order>(this.url, body)
      .pipe(
        map((response: any) => response.body)
      );
  }


  resetProducts() {
    this.order = new Order()
    this.order.lineItems = []
    this.totalQuantity.next(0)
  }

  getOrder() {
    return this.order
  }

  getSubTotal() {
    let sum: number = 0
    this.order.lineItems.forEach((item) => sum += Number(item.product.prices[0].amount) * item.quantity)
    return sum
  }

  clickOnEdit(productId: string) {
    this.editClicked.next({ id: productId, clicked: true });
  }
}
