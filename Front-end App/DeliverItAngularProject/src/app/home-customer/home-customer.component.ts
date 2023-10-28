import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent {
  constructor(private addProductCustomerService: AddProductCustomerService, private shopService: ShopService) { }

  ngOnInit() {
    this.addProductCustomerService.resetProducts();
  }

  getAll() {
    return this.shopService.getAll()
  }
}
