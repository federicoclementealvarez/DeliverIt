import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';

@Component({
  selector: 'app-shop-customer',
  templateUrl: './shop-customer.component.html',
  styleUrls: ['./shop-customer.component.scss']
})
export class ShopCustomerComponent {

  constructor(private addProductCustomerService: AddProductCustomerService) {}
  
  totalQty: number;

  ngOnInit() {
    this.addProductCustomerService.totalQty$.subscribe((_totalQty) => {
      this.totalQty = _totalQty
    });
  }
}
