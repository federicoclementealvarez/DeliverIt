import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  constructor(private orderService: OrderService) { }
  items = []
  subTotal: number
  shippingPrice: number
  total: number

  ngOnInit() {
    this.getItems()
    this.getSubTotal()
    this.getShippingPrice()
    this.total = this.subTotal + this.shippingPrice
  }

  // Devuelvo un Array con los Productos y sus cantidades
  getItems() {
    this.items = this.orderService.getOrder().products
  }

  getSubTotal() {
    this.subTotal = this.orderService.getSubTotal()
  }

  getShippingPrice() {
    this.shippingPrice = 300
  }
}
