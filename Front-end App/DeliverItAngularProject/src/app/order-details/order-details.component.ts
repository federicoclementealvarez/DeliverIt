import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  constructor(private orderService: OrderService) { }

  // Devuelvo un Array con los Productos y sus cantidades
  getItems() {
    return this.orderService.getOrder().products
  }

  getTotal() {
    return this.orderService.getTotal()
  }

  getShippingPrice() {
    return 300
  }
}
