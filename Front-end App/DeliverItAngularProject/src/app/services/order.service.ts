import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';
import { ValidatorsService } from './validators.service';
import {
  CustomerSelectedFlavour,
  ProductVariation,
} from '../entities/productVariation.entity';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: Order;
  readonly url = `${this.baseUrl.getBaseUrl()}order`;

  constructor(
    private http: HttpClient,
    private baseUrl: BaseUrlService,
    private validatorsService: ValidatorsService,
    private loginService: LoginService
  ) {
    this.order = new Order();
    this.order.lineItems = [];
  }

  // This variables send the total quantity of items when it changes
  private totalQuantity = new BehaviorSubject<number>(0);
  totalQty$ = this.totalQuantity.asObservable();

  private sendLastTotalQty = new BehaviorSubject<any[]>([]);
  lastTotalQty = this.sendLastTotalQty.asObservable();

  private editClicked = new BehaviorSubject<{ id: string; clicked: boolean }>({
    id: '',
    clicked: false,
  });
  editHasBeenClicked = this.editClicked.asObservable();

  loggedUser = this.loginService.getLoggedUser();

  addProduct(product: Product, variations?: ProductVariation[]) {
    let productInList = this.order.lineItems.find(
      (p) => p.product.id === product.id
    );

    if (!productInList) {
      this.order.lineItems.push({
        product: product,
        quantity: 1,
        productVariationArrays: [variations],
      });
      let currentValue = this.totalQuantity.value;
      let newValue = currentValue + 1;
      this.totalQuantity.next(newValue);
    } else {
      let index: number = this.order.lineItems.findIndex(
        (p) => p.product.id === productInList.product.id
      );

      this.order.lineItems[index].quantity++;
      this.order.lineItems[index].productVariationArrays.push(variations);

      let currentValue = this.totalQuantity.value;
      let newValue = currentValue + 1;
      this.totalQuantity.next(newValue);
    }
  }

  getQuantity(id: string): number {
    const li = this.order.lineItems.find((li) => li.product.id === id);

    return li ? li.quantity : 0;
  }

  removeProduct(product: Product) {
    const index = this.order.lineItems.findIndex(
      (item) => item.product.id == product.id
    );

    if (index !== -1) {
      this.order.lineItems[index].quantity--;
      this.order.lineItems[index].productVariationArrays.pop();

      let currentValue = this.totalQuantity.value;
      let newValue = currentValue - 1;
      this.totalQuantity.next(newValue);

      if (this.order.lineItems[index].quantity === 0) {
        this.order.lineItems.splice(index, 1);
      }
    }
  }

  create(paymentTypeId: string, totalAmount: number): Observable<Order> {
    const lineItems = this.order.lineItems.map(
      ({ product, quantity, productVariationArrays }) => {
        const lineItem: any = {};
        lineItem.product = product.id;
        lineItem.quantity = quantity;

        if (productVariationArrays[0] !== undefined) {
          lineItem.productVariationArrays = productVariationArrays.map(
            (pva) => {
              return { productVariations: pva.map((pv) => pv.id) };
            }
          );
        } else {
          lineItem.productVariationArrays = [];
        }

        return lineItem;
      }
    );

    const dateTime = this.validatorsService.getCurrentDateTime();
    const body = {
      dateTimeOrder: dateTime,
      paymentType: paymentTypeId,
      lineItems: lineItems,
      client: this.loginService.getLoggedUser().id,
      totalAmount: totalAmount,
    };

    return this.http
      .post<Order>(this.url, body)
      .pipe(map((response: any) => response.body));
  }

  resetProducts() {
    this.order = new Order();
    this.order.lineItems = [];
    this.totalQuantity.next(0);
  }

  getOrder() {
    return this.order;
  }

  getSubTotal(par?: Order) {
    let sum: number = 0;
    if (par) {
      par.lineItems.forEach(
        (lineItem) =>
          (sum += Number(lineItem.product.prices[0].amount) * lineItem.quantity)
      );
    } else {
      this.order.lineItems.forEach(
        (item) => (sum += Number(item.product.prices[0].amount) * item.quantity)
      );
    }
    return sum;
  }

  clickOnEdit(productId: string) {
    this.editClicked.next({ id: productId, clicked: true });
  }

  unclickOnEdit() {
    this.editClicked.next({ id: '', clicked: false });
  }

  findOrdersWithoutDelivery(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.url}/orders-without-delivery/~`)
      .pipe(map((response: any) => response.data));
  }

  findCurrentCustomerOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(
        `${this.url}/current-orders/${this.loginService.getLoggedUser().id}`
      )
      .pipe(map((response: any) => response.data));
  }

  findCurrentDeliveryOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(
        `${this.url}/current-deliveries/${this.loginService.getLoggedUser().id}`
      )
      .pipe(map((response: any) => response.data));
  }

  setDelivery(orderId: string) {
    const body = { delivery: this.loggedUser.id };
    return this.http
      .put<Order>(`${this.url}/set-delivery/${orderId}`, body)
      .pipe(map((response: any) => response.body));
  }

  setDateTimeArrival(orderId: string) {
    const dateTime = this.validatorsService.getCurrentDateTime();
    const body = { dateTimeArrival: dateTime };
    return this.http
      .put<Order>(`${this.url}/set-datetime-arrival/${orderId}`, body)
      .pipe(map((response: any) => response.body));
  }

  findAllByDelivery(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.url}/all-orders-delivered/${this.loggedUser.id}`)
      .pipe(map((response: any) => response.data));
  }

  getDescription(order: Order) {
    let description: string = '';
    {
      order.lineItems.forEach((lineItem, index: number) => {
        if (index !== order.lineItems.length - 1) {
          description +=
            lineItem.quantity + ' x ' + lineItem.product.name + ', ';
        } else {
          description += lineItem.quantity + ' x ' + lineItem.product.name;
        }
      });
    }
    return description;
  }
}
