import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';
import { ShopCustomerService } from '../services/shop-customer.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  constructor(private addProductCustomerService: AddProductCustomerService, private shopCustomerService: ShopCustomerService) {}

  // Devuelvo un Array con los Productos y sus cantidades
  getItems() {
    return this.addProductCustomerService.getOrder().products
  }

  getTotal() {
    return this.addProductCustomerService.getTotal()
  }

  getShippingPrice() {
    return this.shopCustomerService.getShippingPrice()
  }
}
